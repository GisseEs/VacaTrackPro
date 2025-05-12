const ConfiguracionSistema = require("../models/configuracionSistema");

// Crear una nueva configuración
const crearConfiguracion = async (datos) => {
  const configuracion = new ConfiguracionSistema(datos);
  return await configuracion.save();
};

// Obtener todas las configuraciones no eliminadas
const obtenerConfiguraciones = async () => {
  return await ConfiguracionSistema.find({ eliminado: { $ne: true } }).populate('createdBy updatedBy', 'usuario'); // Ejemplo con populate
};

// Obtener una configuración por ID
const obtenerConfiguracionPorId = async (id) => {
  return await ConfiguracionSistema.findById(id).populate('createdBy updatedBy', 'usuario'); // Ejemplo con populate
};

// Actualizar una configuración por ID
const actualizarConfiguracion = async (id, datos) => {
  return await ConfiguracionSistema.findByIdAndUpdate(id, datos, { new: true }).populate('createdBy updatedBy', 'usuario'); // Ejemplo con populate
};

// Eliminar (lógicamente) una configuración por ID
const eliminarConfiguracionLogico = async (id) => {
  return await ConfiguracionSistema.findByIdAndUpdate(
    id,
    { eliminado: true, updatedAt: new Date() },
    { new: true }
  );
};

// Exportamos todas las funciones
module.exports = {
  crearConfiguracion,
  obtenerConfiguraciones,
  obtenerConfiguracionPorId,
  actualizarConfiguracion,
  eliminarConfiguracionLogico
};