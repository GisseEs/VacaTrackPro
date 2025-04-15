// src/components/filtroVacaciones.jsx
import React from "react";

export default function FiltroVacaciones({
  estado,
  setEstado,
  fechaDesde,
  setFechaDesde,
  fechaHasta,
  setFechaHasta,
  aplicarFiltro,
}) {
  return (
    <div className="bg-white rounded-md shadow p-4 mb-6">
      <h3 className="font-semibold mb-3">Filtrar por:</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium">Desde</label>
          <input
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Hasta</label>
          <input
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="input input-bordered w-full"
          >
            <option>Pendientes</option>
            <option>Aprobada</option>
            <option>Todas</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={aplicarFiltro}
            className="btn btn-primary w-full"
          >
            Aplicar Filtro
          </button>
        </div>
      </div>
    </div>
  );
}
