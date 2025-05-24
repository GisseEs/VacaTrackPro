import React, { useState } from 'react'
import { mostrarExito, mostrarAdvertencia } from '../utils/alertas'
import { API_URL } from "@/api/api";

export default function SolicitudPermiso() {
  const empleado = {
    id: 2,
    nombre: "Liz",
    apellido: "Florentin",
    cedula: "2345678",
    fechaIngreso: "2007-02-20",
    sucursal: "TACPY - 01 - CASA MATRIZ",
    departamento: "Administración",
    estado: "Activo"
  }

  // Simulación de permisos usados por tipo ( traer esto del backend)
  const permisosUsados = {
    particular: 1,       // en días
    consulta: 4,         // en horas
    reposo: 5,           // en días
    vacaciones: 12       // en días
  }

  const [tipoPermiso, setTipoPermiso] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [unidad, setUnidad] = useState("hora")
  const [motivo, setMotivo] = useState("")
  const [descontar, setDescontar] = useState("sí")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

  const limpiarFormulario = () => {
    setTipoPermiso("")
    setCantidad("")
    setUnidad("hora")
    setMotivo("")
    setDescontar("sí")
    setFechaInicio("")
    setFechaFin("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!fechaInicio || !fechaFin) {
      mostrarAdvertencia("Debes seleccionar fecha de inicio y fin.")
      return
    }

    const datosPermiso = {
      empleado,
      tipoPermiso,
      cantidad,
      unidad,
      motivo,
      descontar,
      fechaInicio,
      fechaFin,
    }

    console.log("Solicitud enviada:", datosPermiso)
    mostrarExito("Solicitud de permiso enviada correctamente.")
    limpiarFormulario()
  }

  const permisoYaUsado = tipoPermiso ? permisosUsados[tipoPermiso] || 0 : null

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Solicitud de Permiso</h2>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><strong>Empleado:</strong> {empleado.nombre} {empleado.apellido}</p>
        <p><strong>Cédula:</strong> {empleado.cedula}</p>
        <p><strong>Fecha de ingreso:</strong> {empleado.fechaIngreso}</p>
        <p><strong>Sucursal:</strong> {empleado.sucursal}</p>
        <p><strong>Departamento:</strong> {empleado.departamento}</p>
        <p><strong>Estado:</strong> {empleado.estado}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tipo de Permiso</label>
          <select
            className="input input-bordered w-full"
            value={tipoPermiso}
            onChange={(e) => setTipoPermiso(e.target.value)}
            required
          >
            <option value="">Seleccione...</option>
            <option value="particular">Particular</option>
            <option value="consulta">Consulta médica</option>
            <option value="reposo">Reposo</option>
            <option value="vacaciones">Vacaciones</option>
          </select>
          {permisoYaUsado !== null && (
            <p className="text-xs text-gray-600 mt-1">
              Ya usaste: <strong>{permisoYaUsado}</strong> {unidad === 'hora' ? 'horas' : 'días'} en este tipo de permiso
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Cantidad</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              min="0"
              step="0.5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Unidad</label>
            <select
              className="input input-bordered w-full"
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
            >
              <option value="hora">Horas</option>
              <option value="día">Días</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">¿Se descuenta?</label>
          <select
            className="input input-bordered w-full"
            value={descontar}
            onChange={(e) => setDescontar(e.target.value)}
          >
            <option value="sí">Sí</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Motivo</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Describa el motivo del permiso"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Fecha Inicio</label>
            <input
              type="datetime-local"
              className="input input-bordered w-full"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              placeholder="08:00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Fecha Fin</label>
            <input
              type="datetime-local"
              className="input input-bordered w-full"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              placeholder="17:00"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Enviar Solicitud
          </button>
          <button
            type="button"
            onClick={limpiarFormulario}
            className="btn btn-outline w-full"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
