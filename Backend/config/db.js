const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    console.log("🔌 Intentando conectar a MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB conectado correctamente");
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error.message);
    process.exit(1); // Salir del proceso si no puede conectar
  }
};

module.exports = conectarDB;

