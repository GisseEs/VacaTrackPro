const express = require("express");
const router = express.Router();
const { obtenerEmpleadoConVacaciones, obtenerEmpleadosConVacaciones, obtenerEmpleadosConVacacionesPorDepartamento }  = require("../controllers/panelVacaciones");

 
router.get("/empleados-con-vacaciones", obtenerEmpleadosConVacaciones);
router.get("/empleados-con-vacaciones/departamento/:departamentoId", obtenerEmpleadosConVacacionesPorDepartamento);  
router.get("/empleados-con-vacaciones/empleado/:empleadoId", obtenerEmpleadoConVacaciones);

module.exports = router;