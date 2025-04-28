// Importamos las funciones desde el servicio correspondiente
const {
  crearEmpleado,
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  actualizarEmpleado,
  eliminarEmpleado
} = require("../services/empleado");

// Controlador para crear un nuevo empleado
const crearNuevoEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = await crearEmpleado(req.body);
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el empleado" });
  }
};

// Controlador para listar todos los empleados
const listarEmpleados = async (req, res) => {
  try {
    const empleados = await obtenerEmpleados();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: "Error al listar empleados" });
  }
};

// Controlador para ver un empleado específico por ID
const verEmpleado = async (req, res) => {
  try {
    const empleado = await obtenerEmpleadoPorId(req.params.id);
    if (!empleado) return res.status(404).json({ error: "Empleado no encontrado" });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar empleado" });
  }
};

// Controlador para modificar un empleado por ID
const modificarEmpleado = async (req, res) => {
  try {
    const empleado = await actualizarEmpleado(req.params.id, req.body);
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar empleado" });
  }
};

// Controlador para eliminar un empleado por ID
const borrarEmpleado = async (req, res) => {
  try {
    await eliminarEmpleado(req.params.id);
    res.json({ mensaje: "Empleado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar empleado" });
  }
};

// Exportamos los controladores para ser usados en las rutas
module.exports = {
  crearNuevoEmpleado,
  listarEmpleados,
  verEmpleado,
  modificarEmpleado,
  borrarEmpleado
};
