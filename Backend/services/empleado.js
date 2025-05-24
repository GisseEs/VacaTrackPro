// services/empleado.js
const Empleado = require("../models/empleado"); // Usamos require para importar el modelo

// Crear un nuevo empleado
const crearEmpleado = async (datos) => {
  const empleado = new Empleado(datos);
  return await empleado.save();
};

// Obtener todos los empleados
const obtenerEmpleados = async () => {
  return await Empleado.find({ eliminado: { $ne: true } });
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
  return await Empleado.findByIdAndUpdate(
    id,
    { eliminado: true, updatedAt: new Date() },  
    { new: true }  
  );
};
// Exportamos todas las funciones
module.exports = {
  crearEmpleado,
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  actualizarEmpleado,
  eliminarEmpleado
};
