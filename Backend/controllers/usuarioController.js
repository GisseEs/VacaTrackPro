import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json({ mensaje: "Datos recuperados exitosamente", data: usuarios });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener usuarios", error: error.message });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Usuario encontrado", data: usuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error", error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { usuario, email, contrasena, id_empleado } = req.body;
    const hashed = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = new Usuario({ usuario,email, contrasena: hashed, id_empleado });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario creado" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear", error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ mensaje: "Actualizado", data: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { eliminado: true, updatedAt: new Date() },
      { new: true } // Para obtener el documento actualizado (opcional)
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario marcado como eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al marcar el usuario como eliminado", error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // <--- Cambiado de 'contrasena' a 'password'

    const usuarioBD = await Usuario.findOne({ email });
    if (!usuarioBD) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const valido = await bcrypt.compare(password, usuarioBD.contrasena);
    if (!valido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: usuarioBD._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, nombre: usuarioBD.nombre, email: usuarioBD.email });
  } catch (error) {
    res.status(400).json({ mensaje: "Error en login", error: error.message });
  }
};



export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.id);
    if (!usuario) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Perfil", data: usuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error", error: error.message });
  }
};
