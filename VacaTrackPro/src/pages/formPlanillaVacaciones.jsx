import React, { useState } from "react";
import { format } from "date-fns";

const FormPlanillaVacaciones = ({ onSubmit, funcionario, initialData = {} }) => {
  const [fechaInicio, setFechaInicio] = useState(
    initialData?.fechaInicio ? format(new Date(initialData.fechaInicio), "yyyy-MM-dd") : ""
  );
  const [fechaFin, setFechaFin] = useState(
    initialData?.fechaFin ? format(new Date(initialData.fechaFin), "yyyy-MM-dd") : ""
  );
  const [observacion, setObservacion] = useState(initialData?.observacion || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fechaInicio, fechaFin, observacion: observacion.trim() });
    setFechaInicio("");
    setFechaFin("");
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
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Observación</label>
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value.toUpperCase())}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

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
