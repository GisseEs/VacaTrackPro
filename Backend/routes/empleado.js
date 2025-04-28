// routes/empleado.js
const express = require("express");
const router = express.Router();

// Importamos los controladores (con CommonJS)
const {
  crearNuevoEmpleado,
  listarEmpleados,
  verEmpleado,
  modificarEmpleado,
  borrarEmpleado
} = require("../controllers/empleadoController");

router.post("/empleados", crearNuevoEmpleado);   
router.get("/empleados", listarEmpleados);     
router.get("/empleados/:id", verEmpleado);     
router.put("/empleados/:id", modificarEmpleado);  
router.delete("/empleados/:id", borrarEmpleado);  

module.exports = router;
