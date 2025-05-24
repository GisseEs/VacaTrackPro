import React, { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { mostrarError } from "../utils/alertas";
import { API_URL } from "@/api/api";

const permisosSimulados = [
  {
    id: 1,
    fechaSolicitud: "2025-03-20",
    tipo: "Particular",
    motivo: "Trámite personal",
    desde: "2025-03-22",
    hasta: "2025-03-23",
    estadoJefatura: "Aprobado",
    estadoRRHH: "Pendiente",
  },
  {
    id: 2,
    fechaSolicitud: "2025-04-01",
    tipo: "Consulta médica",
    motivo: "Control de salud",
    desde: "2025-04-02",
    hasta: "2025-04-02",
    estadoJefatura: "Aprobado",
    estadoRRHH: "Aprobado",
  },
  {
    id: 3,
    fechaSolicitud: "2025-04-10",
    tipo: "Reposo",
    motivo: "Reposo por enfermedad",
    desde: "2025-04-10",
    hasta: "2025-04-12",
    estadoJefatura: "Pendiente",
    estadoRRHH: "Pendiente",
  },
];

const EstadoPermisoFuncionario = () => {
  const [permisos, setPermisos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  useEffect(() => {
    aplicarFiltro();
  }, [filtroEstado, filtroTipo]);

  const aplicarFiltro = () => {
    try {
      let filtrados = permisosSimulados;

      if (filtroEstado !== "Todos") {
        filtrados = filtrados.filter(
          (p) => p.estadoJefatura === filtroEstado && p.estadoRRHH === filtroEstado
        );
      }

      if (filtroTipo !== "Todos") {
        filtrados = filtrados.filter((p) => p.tipo === filtroTipo);
      }

      setPermisos(filtrados);
    } catch (e) {
      mostrarError("Error al aplicar el filtro");
    }
  };

  const getRowColor = (jefatura, rrhh) => {
    if (jefatura === "Aprobado" && rrhh === "Aprobado") return "bg-green-100";
    if (jefatura === "Pendiente" && rrhh === "Pendiente") return "bg-red-100";
    return "bg-yellow-100";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">Estado de Solicitudes de Permiso</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Empleado:</strong> Liz Florentin</p>
        <p><strong>Departamento:</strong> Informática</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <label className="font-semibold">Filtrar por estado:</label>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendientes</option>
          <option value="Aprobado">Aprobados</option>
        </select>

        <label className="font-semibold">Filtrar por tipo:</label>
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Todos">Todos</option>
          <option value="Particular">Particular</option>
          <option value="Consulta médica">Consulta médica</option>
          <option value="Reposo">Reposo</option>
        </select>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Fecha Solicitud</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Motivo</th>
            <th className="p-2">Desde</th>
            <th className="p-2">Hasta</th>
            <th className="p-2">Días desde solicitud</th>
            <th className="p-2">Jefatura</th>
            <th className="p-2">RRHH</th>
          </tr>
        </thead>
        <tbody>
          {permisos.map((permiso) => (
            <tr
              key={permiso.id}
              className={`border-t ${getRowColor(permiso.estadoJefatura, permiso.estadoRRHH)}`}
            >
              <td className="p-2">{format(parseISO(permiso.fechaSolicitud), "dd/MM/yyyy")}</td>
              <td className="p-2">{permiso.tipo}</td>
              <td className="p-2">{permiso.motivo}</td>
              <td className="p-2">{format(parseISO(permiso.desde), "dd/MM/yyyy")}</td>
              <td className="p-2">{format(parseISO(permiso.hasta), "dd/MM/yyyy")}</td>
              <td className="p-2">
                {formatDistanceToNow(parseISO(permiso.fechaSolicitud), {
                  addSuffix: false,
                  locale: es,
                })}
              </td>
              <td className="p-2">{permiso.estadoJefatura}</td>
              <td className="p-2">{permiso.estadoRRHH}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstadoPermisoFuncionario;
