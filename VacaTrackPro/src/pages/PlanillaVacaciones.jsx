import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { differenceInBusinessDays, parseISO } from "date-fns";
import { API_URL } from "@/api/api";

import FormPlanillaVacaciones from "../pages/formPlanillaVacaciones";
import formEnvioCorreo from "../features/email/formEnvioCorreo";
import {
  mostrarExito,
  mostrarError,
  mostrarConfirmacion,
  mostrarAdvertencia,
} from "../utils/alertas";

const funcionario = {
  nombre: "Liz Florentin",
  departamento: "Informática",
  diasDisponibles: 30,
};

const PlanillaVacaciones = () => {
  const [vacaciones, setVacaciones] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mostrarFormularioCorreo, setMostrarFormularioCorreo] = useState(false);
  const [correoDestinatarios, setCorreoDestinatarios] = useState("");

  const calcularDiasHabiles = (inicio, fin) =>
    differenceInBusinessDays(parseISO(fin), parseISO(inicio)) + 1;

  const validarFechas = (inicio, fin) => {
    const inicioDate = parseISO(inicio);
    const finDate = parseISO(fin);
    const diasTomados = calcularDiasHabiles(inicio, fin);

    if (finDate < inicioDate) {
      mostrarError("La fecha fin no puede ser anterior a la fecha inicio.");
      return false;
    }

    if ([inicioDate.getDay(), finDate.getDay()].includes(0)) {
      mostrarError("Las fechas no pueden ser en domingo.");
      return false;
    }

    if (diasTomados < 6) {
      mostrarAdvertencia("El período de vacaciones debe ser al menos de 6 días hábiles.");
      return false;
    }

    if (diasTomados > funcionario.diasDisponibles) {
      mostrarAdvertencia("Los días tomados superan los días disponibles.");
      return false;
    }

    return true;
  };

  const manejarVacaciones = (nuevaVacacion) => {
    const inicioNueva = parseISO(nuevaVacacion.fechaInicio);
    const finNueva = parseISO(nuevaVacacion.fechaFin);
  
    // Validar la fecha actual
    if (!validarFechas(nuevaVacacion.fechaInicio, nuevaVacacion.fechaFin)) return;
  
    // Validar contra las vacaciones existentes
    for (const vacacionExistente of vacaciones) {
      const finExistente = parseISO(vacacionExistente.fechaFin);
      // Si la nueva fecha de inicio es menor o igual a la fecha fin de una entrada existente
      if (inicioNueva <= finExistente && nuevaVacacion.id !== vacacionExistente.id) {
        mostrarError(`La fecha de inicio no puede ser menor o igual a la fecha fin (${vacacionExistente.fechaFin}) de una solicitud anterior.`);
        return;
      }
    }
  
    const diasTomadosNuevos = calcularDiasHabiles(nuevaVacacion.fechaInicio, nuevaVacacion.fechaFin);
    const totalDiasPrevios = vacaciones.reduce((acc, v) => acc + v.diasTomados, 0);
    const totalConNuevo = editando
      ? totalDiasPrevios - editando.diasTomados + diasTomadosNuevos
      : totalDiasPrevios + diasTomadosNuevos;
  
    if (totalConNuevo > funcionario.diasDisponibles) {
      mostrarAdvertencia("La suma total de días tomados supera los días disponibles.");
      return;
    }
    const diasRestantes = funcionario.diasDisponibles - totalConNuevo;
    const nuevaEntrada = {
      id: editando ? editando.id : Date.now(),
      diasTomados: diasTomadosNuevos,
      diasRestantes,
      ...nuevaVacacion,
    };
    setVacaciones((prev) =>
      editando ? prev.map((v) => (v.id === editando.id ? nuevaEntrada : v)) : [...prev, nuevaEntrada]
    );
    setEditando(null);
  };

  const recalcularVacaciones = (lista) => {
    let acumulado = 0;
    return lista.map((v) => {
      acumulado += v.diasTomados;
      return {
        ...v,
        diasRestantes: funcionario.diasDisponibles - acumulado,
      };
    });
  };

  const handleGuardarPlanilla = async () => {
    const confirmado = await mostrarConfirmacion({
      text: "¿Querés guardar la planilla de vacaciones?",
    });

    if (confirmado) {
      console.log("Planilla de vacaciones a guardar:", vacaciones);
      mostrarExito("La planilla de vacaciones ha sido guardada.");
      // setVacaciones([]); //   limpiar después de guardar
    } else {
      mostrarAdvertencia("No se ha guardado la planilla de vacaciones.");
    }
  };

  const handleCancelar = async () => {
    const confirmarCancelacion = await mostrarConfirmacion({
      title: "¿Confirmar cancelación?",
      text: "Si continúas, se borrarán todos los datos ingresados en la planilla. ¿Estás seguro?",
      icon: "warning",
      confirmButtonText: "Sí, borrar todo",
      cancelButtonText: "No, cancelar",
    });

    if (confirmarCancelacion) {
      setVacaciones([]);
      setEditando(null);
      mostrarExito("La planilla ha sido borrada.");
    }
  };

  const handleEnviarCorreo = () => {
    setCorreoDestinatarios("destinatario@example.com");
    setMostrarFormularioCorreo(true);
  };

  const handleCerrarFormularioCorreo = () => {
    setMostrarFormularioCorreo(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 bg-gray-100 rounded-lg">
      <FormPlanillaVacaciones
        onSubmit={manejarVacaciones}
        funcionario={funcionario}
        initialData={editando || {}}
      />

      {vacaciones.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr className="text-left">
                {[
                  "Empleado",
                  "Departamento",
                  "Días Disponibles",
                  "Fecha Inicio",
                  "Fecha Fin",
                  "Días Tomados",
                  "Días Restantes",
                  "Aprobado Por",
                  "Observación",
                  "Acciones",
                ].map((header) => (
                  <th key={header} className="px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vacaciones.map((v) => (
                <tr key={v.id} className="border-t">
                  {[
                    funcionario.nombre,
                    funcionario.departamento,
                    `${funcionario.diasDisponibles} días`,
                    v.fechaInicio,
                    v.fechaFin,
                    v.diasTomados,
                    v.diasRestantes,
                    v.aprobadoPor || "Pendiente",
                    v.observacion || "N/A",
                  ].map((data, i) => (
                    <td key={i} className="px-4 py-2">
                      {data}
                    </td>
                  ))}
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => setEditando(v)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    >
                      <PencilIcon className="inline-block w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        const listaNueva = vacaciones.filter((vac) => vac.id !== v.id);
                        setVacaciones(recalcularVacaciones(listaNueva));
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      <TrashIcon className="inline-block w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <button
              onClick={handleGuardarPlanilla}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            >
              Guardar Planilla
            </button>
            <button
              onClick={handleCancelar}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {mostrarFormularioCorreo && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Enviar Planilla por Correo</h2>
            <formEnvioCorreo
              destinatarios={correoDestinatarios}
              asunto="Planilla de calendario de vacaciones"
              onClose={handleCerrarFormularioCorreo}
              datos={vacaciones}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanillaVacaciones;
