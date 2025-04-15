export default function detalleVacacionesFila({ detalle }) {
    return (
      <tr className="border-b">
        <td className="p-2">{detalle.inicio}</td>
        <td className="p-2">{detalle.fin}</td>
        <td className="p-2">{detalle.dias}</td>
        <td className="p-2">{detalle.estado}</td>
        <td className="p-2 flex gap-2">
          <button className="btn btn-xs btn-success">Aprobar</button>
          <button className="btn btn-xs btn-error">Rechazar</button>
        </td>
      </tr>
    )
  }
  