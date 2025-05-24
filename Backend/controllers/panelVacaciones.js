

const { calcularInformacionVacaciones, calcularInformacionVacacionesPorDepartamento,calcularInformacionVacacionesPorEmpleado } = require("../services/panelVacaciones");

const obtenerEmpleadosConVacaciones = async (req, res) => {
  try {
    const empleadosConVacaciones = await calcularInformacionVacaciones();
    res.json(empleadosConVacaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la información de vacaciones de los empleados", details: error.message });
  }
};

const obtenerEmpleadosConVacacionesPorDepartamento = async (req, res) => {
  const { departamentoId } = req.params;
  try {
    const empleadosConVacaciones = await calcularInformacionVacacionesPorDepartamento(departamentoId);
    res.json(empleadosConVacaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la información de vacaciones por departamento", details: error.message });
  }
};

const obtenerEmpleadoConVacaciones = async (req, res) => {
  const { empleadoId } = req.params;
  try {
    const empleadosConVacaciones = await calcularInformacionVacacionesPorEmpleado(empleadoId);
    res.json(empleadosConVacaciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la información de vacaciones por empleado", details: error.message });
  }
};

module.exports = {
  obtenerEmpleadosConVacaciones,
  obtenerEmpleadosConVacacionesPorDepartamento,
  obtenerEmpleadoConVacaciones
};