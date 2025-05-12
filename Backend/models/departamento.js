const mongoose = require("mongoose");
const { Schema } = mongoose;

const departamentoSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, primary: true, auto: true }, // Mongoose genera automáticamente el _id
  nombre_departamento: { type: String, required: true },
  eliminado: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Usuario' }, // Referencia al modelo de Usuario
  updatedAt: { type: Date },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Usuario' } // Referencia al modelo de Usuario
});

const Departamento = mongoose.model("Departamento", departamentoSchema);

module.exports = Departamento;