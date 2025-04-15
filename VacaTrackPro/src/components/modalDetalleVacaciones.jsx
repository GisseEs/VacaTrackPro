import VacationDetailRow from './detalleVacacionesFila'
export default function ModalDetalleVacaciones({ planilla, onClose, onAprobarTodo, onRechazarTodo }) {
  const detalle = [
    { inicio: "2025-04-07", fin: "2025-04-12", dias: 6, estado: "Pendiente" },
    { inicio: "2025-04-14", fin: "2025-04-26", dias: 11, estado: "Pendiente" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Detalle de Planilla</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✖</button>
        </div>

        <div className="mb-4">
          <p><strong>Empleado:</strong> {planilla.empleado}</p>
          <p><strong>Departamento:</strong> {planilla.departamento || planilla.depto}</p>
          <p><strong>Fecha Generación:</strong> {planilla.fecha}</p>
        </div>

        <div className="flex gap-2 mb-4">
          <button className="btn btn-error" onClick={onRechazarTodo}>Rechazar Totalmente</button>
          <button className="btn btn-success" onClick={onAprobarTodo}>Aprobar Totalmente</button>
        </div>

        <table className="w-full text-sm mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Inicio</th>
              <th className="p-2">Fin</th>
              <th className="p-2">Días</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {detalle.map((item, i) => (
              <VacationDetailRow key={i} detalle={item} />
            ))}
          </tbody>
        </table>

        <button className="btn btn-primary w-full">Confirmar y Enviar a RRHH</button>
      </div>
    </div>
  );
}
