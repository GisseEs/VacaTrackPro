// Importamos las funciones desde el servicio de configuración del sistema
const {
  crearConfiguracion,
  obtenerConfiguraciones,
  obtenerConfiguracionPorId,
  actualizarConfiguracion,
  eliminarConfiguracionLogico // Nueva función para el borrado lógico
} = require("../services/configuracionSistema");

// Controlador para crear una nueva configuración
const crearNuevaConfiguracion = async (req, res) => {
  try {
    const nuevaConfiguracion = await crearConfiguracion(req.body);
    res.status(201).json(nuevaConfiguracion);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la configuración del sistema" });
  }
};

// Controlador para listar todas las configuraciones no eliminadas
const listarConfiguraciones = async (req, res) => {
  try {
    const configuraciones = await obtenerConfiguraciones();
    res.json(configuraciones);
  } catch (error) {
    res.status(500).json({ error: "Error al listar las configuraciones del sistema" });
  }
};

// Controlador para ver una configuración específica por ID
const verConfiguracion = async (req, res) => {
  try {
    const configuracion = await obtenerConfiguracionPorId(req.params.id);
    if (!configuracion) return res.status(404).json({ error: "Configuración del sistema no encontrada" });
    res.json(configuracion);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar la configuración del sistema" });
  }
};

// Controlador para modificar una configuración por ID
const modificarConfiguracion = async (req, res) => {
  try {
    const configuracion = await actualizarConfiguracion(req.params.id, req.body);
    res.json(configuracion);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la configuración del sistema" });
  }
};

// Controlador para eliminar (lógicamente) una configuración por ID
const borrarConfiguracion = async (req, res) => {
  try {
    const configuracionEliminada = await eliminarConfiguracionLogico(req.params.id);
    if (!configuracionEliminada) {
      return res.status(404).json({ mensaje: "Configuración del sistema no encontrada" });
    }
    res.json({ mensaje: "Configuración del sistema marcada como eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al marcar la configuración del sistema como eliminada", error: error.message });
  }
};

// Exportamos los controladores para ser usados en las rutas
module.exports = {
  crearNuevaConfiguracion,
  listarConfiguraciones,
  verConfiguracion,
  modificarConfiguracion,
  borrarConfiguracion
};