// Importamos las funciones desde el servicio de departamento
const {
    crearDepartamento,
    obtenerDepartamentos,
    obtenerDepartamentoPorId,
    actualizarDepartamento,
    eliminarDepartamento
  } = require("../services/departamento");
  
  // Controlador para crear un nuevo departamento
  const crearNuevoDepartamento = async (req, res) => {
    try {
      const nuevoDepartamento = await crearDepartamento(req.body);
      res.status(201).json(nuevoDepartamento);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el departamento" });
    }
  };
  
  // Controlador para listar todos los departamentos
  const listarDepartamentos = async (req, res) => {
    try {
      const departamentos = await obtenerDepartamentos();
      res.json(departamentos);
    } catch (error) {
      res.status(500).json({ error: "Error al listar departamentos" });
    }
  };
  
  // Controlador para ver un departamento específico por ID
  const verDepartamento = async (req, res) => {
    try {
      const departamento = await obtenerDepartamentoPorId(req.params.id);
      if (!departamento) return res.status(404).json({ error: "Departamento no encontrado" });
      res.json(departamento);
    } catch (error) {
      res.status(500).json({ error: "Error al buscar departamento" });
    }
  };
  
  // Controlador para modificar un departamento por ID
  const modificarDepartamento = async (req, res) => {
    try {
      const departamento = await actualizarDepartamento(req.params.id, req.body);
      res.json(departamento);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar departamento" });
    }
  };
  
  // Controlador para eliminar un departamento por ID
  const borrarDepartamento = async (req, res) => {
    try {
      await eliminarDepartamento(req.params.id);
      res.json({ mensaje: "Departamento eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar departamento" });
    }
  };
  
  // Exportamos los controladores para ser usados en las rutas
  module.exports = {
    crearNuevoDepartamento,
    listarDepartamentos,
    verDepartamento,
    modificarDepartamento,
    borrarDepartamento
  };