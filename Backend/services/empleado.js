// services/empleado.js
const Empleado = require("../models/Empleado"); // Usamos require para importar el modelo

// Crear un nuevo empleado
const crearEmpleado = async (datos) => {
  const empleado = new Empleado(datos);
  return await empleado.save();
};

// Obtener todos los empleados
const obtenerEmpleados = async () => {
  return await Empleado.find();
};

// Obtener un empleado por ID
const obtenerEmpleadoPorId = async (id) => {
  return await Empleado.findById(id);
};

// Actualizar un empleado por ID
const actualizarEmpleado = async (id, datos) => {
  return await Empleado.findByIdAndUpdate(id, datos, { new: true });
};

// Eliminar un empleado por ID
const eliminarEmpleado = async (id) => {
  return await Empleado.findByIdAndDelete(id);
};

// Exportamos todas las funciones
module.exports = {
  crearEmpleado,
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  actualizarEmpleado,
  eliminarEmpleado
};
