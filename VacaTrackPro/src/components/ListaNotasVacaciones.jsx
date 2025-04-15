import React from "react";

export default function ListaNotasVacaciones({ notas, onGenerarNota, onNotificar, onDeclararMtess }) {
  return (
    <div className="overflow-x-auto bg-white rounded-md shadow-md">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            {[
              "Empleado",
              "Departamento",
              "Fecha Solicitud",
              "Inicio Vacaciones",
              "Fin Vacaciones",
              "Estado",
              "Acciones",
            ].map((header) => (
              <th key={header} className="px-4 py-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {notas.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No hay registros para mostrar
              </td>
            </tr>
          ) : (
            notas.map((n) => (
              <tr key={n.id} className="border-t">
                <td className="px-4 py-2">{n.empleado}</td>
                <td className="px-4 py-2">{n.departamento}</td>
                <td className="px-4 py-2">{n.fechaSolicitud}</td>
                <td className="px-4 py-2">{n.inicioVacaciones}</td>
                <td className="px-4 py-2">{n.finVacaciones}</td>
                <td className="px-4 py-2">{n.estado}</td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => onGenerarNota(n.id)}
                    className="btn btn-sm bg-blue-500 text-white"
                  >
                    Generar Nota
                  </button>
                  <button
                    onClick={() => onNotificar(n.id)}
                    className="btn btn-sm bg-yellow-500 text-white"
                  >
                    Notificar
                  </button>
                  <button
                    onClick={() => onDeclararMtess(n.id)}
                    className="btn btn-sm bg-green-600 text-white"
                  >
                    Declarar MTESS
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
