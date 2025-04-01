
import FormPlanillaVacaciones from "../pages/formPlanillaVacaciones";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { differenceInBusinessDays, parseISO } from "date-fns";
import React, { useState, useEffect } from "react";

const funcionario = {
  nombre: "Liz Florentin",
  departamento: "Informática",
  diasDisponibles: 30,
};


const PlanillaVacaciones = () => {
    const [vacaciones, setVacaciones] = useState([]);
    const [editando, setEditando] = useState(null);
  
    const calcularDiasHabiles = (inicio, fin) => differenceInBusinessDays(parseISO(fin), parseISO(inicio)) + 1;
  
    const validarFechas = (inicio, fin) => {
      const inicioDate = parseISO(inicio);
      const finDate = parseISO(fin);
      const diasTomados = calcularDiasHabiles(inicio, fin);
  
      if ([inicioDate.getDay(), finDate.getDay()].includes(0)) {
        alert("Las fechas no pueden ser en domingo.");
        return false;
      }
      if (diasTomados < 6) {
        alert("El período de vacaciones debe ser al menos de 6 días hábiles.");
        return false;
      }
      if (diasTomados > funcionario.diasDisponibles) {
        alert("Los días tomados superan los días disponibles.");
        return false;
      }
      return true;
    };
  
    const manejarVacaciones = (nuevaVacacion) => {
      console.log("Datos recibidos para manejarVacaciones:", nuevaVacacion); 
      if (!validarFechas(nuevaVacacion.fechaInicio, nuevaVacacion.fechaFin)) return;
      
      const diasTomados = calcularDiasHabiles(nuevaVacacion.fechaInicio, nuevaVacacion.fechaFin);
      
      setVacaciones((prev) =>
        editando
          ? prev.map((v) => (v.id === editando.id ? { ...v, ...nuevaVacacion, diasTomados } : v))
          : [...prev, { id: Date.now(), diasTomados, diasRestantes: funcionario.diasDisponibles - diasTomados, ...nuevaVacacion }]
      );
  
      setEditando(null);
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
                  {["Empleado", "Departamento", "Días Disponibles", "Fecha Inicio", "Fecha Fin", "Días Tomados", "Días Restantes", "Aprobado Por", "Observación", "Acciones"].map((header) => (
                    <th key={header} className="px-4 py-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vacaciones.map((v) => (
                  <tr key={v.id} className="border-t">
                    {[funcionario.nombre, funcionario.departamento, `${funcionario.diasDisponibles} días`, v.fechaInicio, v.fechaFin, v.diasTomados, v.diasRestantes, v.aprobadoPor || "Pendiente", v.observacion || "N/A"].map((data, i) => (
                      <td key={i} className="px-4 py-2">{data}</td>
                    ))}
                    <td className="px-4 py-2 flex space-x-2">
                      <button 
                        onClick={() => setEditando(v)} 
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                      >
                        <PencilIcon className="inline-block w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setVacaciones(vacaciones.filter((vac) => vac.id !== v.id))} 
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        <TrashIcon className="inline-block w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
  export default PlanillaVacaciones;