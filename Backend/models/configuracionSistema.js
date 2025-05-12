const mongoose = require("mongoose");
const { Schema } = mongoose;

const configuracionSistemaSchema = new Schema({
  tabla_antiguedad_vacaciones: { type: Object, required: true },
  desde_periodo_corte: { type: Date, required: true },
  hasta_periodo_corte: { type: Date, required: true },
  tope_salida_vacaciones: { type: String },
  eliminado: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  updatedAt: { type: Date },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

const ConfiguracionSistema = mongoose.model("ConfiguracionSistema", configuracionSistemaSchema);

module.exports = ConfiguracionSistema;