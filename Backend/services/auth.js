// services/auth.service.js
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
const login = async (req, res) => {
  const {email} = req.body
  const user = await Usuario.findOne({ email });
  if (!user) throw new Error('Usuario no encontrado');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Contraseña incorrecta');
  const token = jwt.sign({ userId: user._id }, 'SECRETO_JWT', { expiresIn: '1h' });
  return { token, userId: user._id };
};
module.exports = { login };  