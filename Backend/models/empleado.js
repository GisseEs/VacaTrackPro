// models/Empleado.js
const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
  },
  id_departamento:  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Departamentos", 
    required: true 
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },
  fechaSalida: {
    type: Date,
    default: null, // Por defecto es null hasta que salga
  },
}, { timestamps: true });  

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;
