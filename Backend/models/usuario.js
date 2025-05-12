const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  id_empleado: { type: mongoose.Schema.Types.ObjectId, ref: "Empleado", required: true },
  ultimo_login: Date,
  activo: { type: Boolean, default: true },
  eliminado: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  updatedAt: Date,
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
