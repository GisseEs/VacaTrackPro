const Departamento = require("../models/departamento"); // Asegúrate de que el modelo se llame "Departamento"

// Crear un nuevo departamento
const crearDepartamento = async (datos) => {
  const departamento = new Departamento(datos);
  return await departamento.save();
};

// Obtener todos los departamentos
const obtenerDepartamentos = async () => {
  return await Departamento.find({ eliminado: { $ne: true } }).populate('createdBy updatedBy', 'nombre'); // Ejemplo incluyendo populate si tus modelos de Usuario tienen un campo 'nombre'
};

// Obtener un departamento por ID
const obtenerDepartamentoPorId = async (id) => {
  return await Departamento.findById(id).populate('createdBy updatedBy', 'nombre'); // Ejemplo incluyendo populate
};

// Actualizar un departamento por ID
const actualizarDepartamento = async (id, datos) => {
  return await Departamento.findByIdAndUpdate(id, datos, { new: true }).populate('createdBy updatedBy', 'nombre'); // Ejemplo incluyendo populate
};

// Eliminar un departamento por ID (marcado como eliminado)
const eliminarDepartamento = async (id) => {
  return await Departamento.findByIdAndUpdate(id, { eliminado: true, updatedAt: new Date() });
};

// Exportamos todas las funciones
module.exports = {
  crearDepartamento,
  obtenerDepartamentos,
  obtenerDepartamentoPorId,
  actualizarDepartamento,
  eliminarDepartamento
};