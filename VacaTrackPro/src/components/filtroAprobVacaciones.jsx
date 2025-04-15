export default function FiltroAprobVacaciones() {
    return (
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm">Desde</label>
          <input type="date" className="input input-bordered" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Hasta</label>
          <input type="date" className="input input-bordered" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Estado</label>
          <select className="input input-bordered">
            <option>Pendientes</option>
            <option>Aprobados</option>
            <option>Todos</option>
          </select>
        </div>
        <button className="btn btn-primary">Aplicar Filtros</button>
      </div>
    )
  }
  