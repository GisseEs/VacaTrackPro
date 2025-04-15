import { useState } from 'react'
import VacationDetailModal from './modalDetalleVacaciones'

export default function ListaVacaciones() {
  const [selectedPlanilla, setSelectedPlanilla] = useState(null)

  const planillas = [
    { id: 1, empleado: "Liz Florentín", depto: "Informática", fecha: "2025-04-07", estado: "Pendiente" },
    // ...
  ]

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Empleado</th>
            <th className="p-3">Departamento</th>
            <th className="p-3">Fecha Generación</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {planillas.map(p => (
            <tr key={p.id} className="border-b">
              <td className="p-3">{p.empleado}</td>
              <td className="p-3">{p.depto}</td>
              <td className="p-3">{p.fecha}</td>
              <td className="p-3">{p.estado}</td>
              <td className="p-3">
                <button className="btn btn-outline btn-sm" onClick={() => setSelectedPlanilla(p)}>
                  Ver Detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPlanilla && (
        <VacationDetailModal planilla={selectedPlanilla} onClose={() => setSelectedPlanilla(null)} />
      )}
    </div>
  )
}
