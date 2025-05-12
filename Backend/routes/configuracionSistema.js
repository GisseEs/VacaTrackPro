const express = require("express");
const router = express.Router();

// Importamos los controladores de configuración del sistema
const {
  crearNuevaConfiguracion,
  listarConfiguraciones,
  verConfiguracion,
  modificarConfiguracion,
  borrarConfiguracion // Esta ruta ahora activará el borrado lógico
} = require("../controllers/configuracionSistemaController");

router.get("/configuraciones", listarConfiguraciones);
router.get("/configuraciones/:id", verConfiguracion);
router.post("/configuraciones", crearNuevaConfiguracion);
router.put("/configuraciones/:id", modificarConfiguracion);
router.delete("/configuraciones/:id", borrarConfiguracion); // Usamos la misma ruta DELETE

module.exports = router;