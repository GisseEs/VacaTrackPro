// routes/usuarios.js

const express = require("express");
const router = express.Router();

const { 
  obtenerUsuarios, 
  obtenerUsuarioPorId, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario, 
  login, 
  obtenerPerfil 
} = require("../controllers/usuarioController");

const verificarToken = require("../middleware/auth");

// Rutas protegidas y públicas
router.get("/usuarios", obtenerUsuarios);
router.get("/usuarios/:id", verificarToken, obtenerUsuarioPorId);
router.post("/usuarios", crearUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

// Autenticación
router.post("/login", login);
router.get("/perfil", verificarToken, obtenerPerfil);

module.exports = router;
