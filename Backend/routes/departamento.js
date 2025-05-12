const express = require("express");
const router = express.Router();

const {
  crearNuevoDepartamento,
  listarDepartamentos,
  verDepartamento,
  modificarDepartamento,
  borrarDepartamento
} = require("../controllers/departamentoController");

router.get("/departamentos", listarDepartamentos);
router.get("/departamentos/:id", verDepartamento);
router.post("/departamentos", crearNuevoDepartamento);
router.put("/departamentos/:id", modificarDepartamento);
router.delete("/departamentos/:id", borrarDepartamento);

module.exports = router;