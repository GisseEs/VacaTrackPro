import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";  
import { API_URL } from "@/api/api";

const FormPlanillaVacaciones = ({ onSubmit, funcionario, initialData }) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [aprobadoPor, setAprobadoPor] = useState("");
  const [observacion, setObservacion] = useState("");

  useEffect(() => {
    if (initialData) {
      setFechaInicio(initialData.fechaInicio || "");
      setFechaFin(initialData.fechaFin || "");
      setAprobadoPor(initialData.aprobadoPor || "");
      setObservacion(initialData.observacion || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fechaInicio, fechaFin, aprobadoPor, observacion });
    // Limpiar formulario si querés
    setFechaInicio("");
    setFechaFin("");
    setAprobadoPor("");
    setObservacion("");
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md space-y-4">
      <h2 className="text-lg font-bold text-center">
        {initialData?.id ? "Editar Planilla de Vacaciones" : "Nueva Planilla de Vacaciones"}
      </h2>

      <div className="p-3 bg-gray-100 rounded-md">
        <p><strong>Empleado:</strong> {funcionario?.nombre || "N/A"}</p>
        <p><strong>Departamento:</strong> {funcionario?.departamento || "N/A"}</p>
        <p><strong>Días Disponibles:</strong> {funcionario?.diasDisponibles ?? "No disponible"} días</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex space-x-4">
          {/* Fecha Inicio */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
            <div className="relative mt-1">
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="p-2 border rounded w-full"
                required
              />
              <CalendarDays className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Fecha Fin */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
            <div className="relative mt-1">
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="p-2 border rounded w-full"
                required
              />
              <CalendarDays className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Observación */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Observación</label>
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value.toUpperCase())}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          {initialData?.id ? "Actualizar" : "Agregar"}
        </button>
      </form>
    </div>
  );
};

export default FormPlanillaVacaciones;
