// 1- Importamos dependencias
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const conectarDB = require("./config/db");

// 2- Conectar a la base de datos
conectarDB();  

// 3- Creamos la app
const app = express();

// 4- Configuración de middlewares
app.use(express.json()); // Middleware para leer JSON desde req.body
app.use(cors()); // Activar política CORS

// 5- Importación de rutas
const empleadoRoutes = require("./routes/empleado");  
const userRoutes = require("./routes/usuarios");
const departamentoRoutes = require("./routes/departamento");
const configRoutes = require("./routes/configuracionSistema");

// 6- Definición de rutas
app.get("/", (_req, res) => {
    res.send("¡Bienvenido a la API de VacaTrackPro!");
});

// Rutas de la API
app.use("/api", userRoutes); // Rutas de usuarios 
app.use("/api", empleadoRoutes); // Rutas de empleados  
app.use("/api", departamentoRoutes); // Rutas de empleados  
app.use("/api", configRoutes);

// 7- Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send("Ruta no disponible.");
});

// 8- Configuración del servidor
const PORT = process.env.PORT || 3001;
if (!process.env.MONGO_URI) {
    console.error("❌ Error: MONGO_URI no está definido en el archivo .env");
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`✅ El servidor está corriendo en http://localhost:${PORT}`);
});