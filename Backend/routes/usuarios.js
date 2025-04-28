// routes/usuarios.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verificarToken = require("../middleware/auth");
const Usuario = require("../models/usuarios");
const { login } = require("../services/auth");
require("dotenv").config();

const userRouter = express.Router();

// ------------------------ ENDPOINTS USUARIOS

let usuarios = [];

// GET /usuarios
userRouter.get("/usuarios", (req, res) => {
  res.json({ mensaje: "Datos recuperados exitosamente", data: usuarios });
});

// GET /usuarios/:id
userRouter.get("/usuarios/:id", verificarToken, (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find((u) => u.id === Number(id));
  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado", data: null });
  }
  res.json({ mensaje: "Usuario encontrado", data: usuario });
});

// POST /usuarios
userRouter.post("/usuarios", (req, res) => {
  const { nombre, email } = req.body;
  const usuario = {
    id: usuarios.length + 1,
    nombre,
    email,
  };
  usuarios.push(usuario);
  res.status(201).json({ mensaje: "Usuario creado", data: usuario });
});

// PUT /usuarios/:id
userRouter.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  const usuario = usuarios.find((u) => u.id === Number(id));
  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado", data: null });
  }

  usuarios.map((u) => {
    if (u.id === Number(id)) {
      u.nombre = nombre;
      u.email = email;
    }
  });
  res.status(200).json({
    mensaje: "Usuario actualizado",
    data: usuarios.find((u) => u.id === Number(id)),
  });
});

// DELETE /usuarios/:id
userRouter.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.findIndex((u) => u.id === Number(id));
  if (usuario === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
  usuarios.splice(usuario, 1);
  res.json({ mensaje: "Usuario borrado correctamente." });
});

// POST /login
userRouter.post("/login", login);

// GET /perfil
userRouter.get("/perfil", verificarToken, (req, res) => {
  const { email } = req.body;
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
  res.json({ mensaje: "Perfil encontrado", data: usuario });
});

async function testUsuarios(req, res) {
  try {
    const newUser = new Usuario({
      nombre: "Gisse",
      email: "gissees@gmail.com",
      password: "123456",
    });
    await newUser.save();
    const usuarios = await Usuario.find();
    console.log("Usuarios en la base de datos:");
    console.log(usuarios);
    res.json(usuarios);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

userRouter.post("/register", testUsuarios);

module.exports = userRouter;
