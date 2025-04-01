import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import VacaTrackProLogo from "../assets/VACATRACKPRO.png";
const InicioSesionAnimado = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [emoji, setEmoji] = useState("😐");
  const [iniciandoSesion, setIniciandoSesion] = useState(false);

  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value);
    setEmoji(e.target.value.length > 0 ? "😊" : "😐");
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
    setEmoji(e.target.value.length > 0 ? "😴" : "😐");
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };
  const handleOlvideContrasenaClick = () => {
    setEmoji("😲");
    setTimeout(() => setEmoji(usuario.length > 0 ? "😊" : "😐"), 800);
  };

  const handleRecordarmeClick = () => {
    setRecordarme(!recordarme);
    setEmoji("😉");
    setTimeout(() => setEmoji(usuario.length > 0 ? "😊" : "😐"), 800);
  };

  const handleIniciarSesionClick = async () => {
    setIniciandoSesion(true);
    setEmoji("😎");  
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIniciandoSesion(false);
    setEmoji("😃");  
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    
       <motion.div
        className="bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl p-8 w-full max-w-md" 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div
          className="flex justify-center text-6xl mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.0, repeat: Infinity, repeatType: "reverse" }}
        >
          <img src={VacaTrackProLogo} alt="Logo VacaTrackPro" className="w-64 mx-auto mb-4" />
        </motion.div>
        
        <motion.div
          className="flex justify-center text-6xl mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          {emoji} 
        </motion.div>

        <div className="relative mb-4">
          <UserIcon className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={handleUsuarioChange}
            className="w-full pl-10 bg-transparent border-b border-blue-300 text-white text-lg py-2 focus:outline-none"
          />
        </div>

        <div className="relative mb-4">
          <LockClosedIcon className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
          <input
            type={mostrarContrasena ? "text" : "password"}
            placeholder="Contraseña"
            value={contrasena}
            onChange={handleContrasenaChange}
            className="w-full pl-10 pr-10 bg-transparent border-b border-blue-300 text-white text-lg py-2 focus:outline-none"
          />
            <button
              type="button"
              onClick={toggleMostrarContrasena}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              style={{ background: 'none', border: 'none' }}
            >
              {mostrarContrasena ? <EyeSlashIcon className="w-6 h-6 text-white" /> : <EyeIcon className="w-6 h-6 text-white" />}
            </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={recordarme}
              onChange={handleRecordarmeClick}
              className="mr-2 cursor-pointer"
            />
            Recuérdame
          </label>
          <a href="#"  onClick={handleOlvideContrasenaClick} className="text-blue-300 text-sm hover:underline focus:outline-none">
            Olvidé mi contraseña
          </a>
        </div>

        <button
          type="submit"
          onClick={handleIniciarSesionClick}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded transition duration-300"
          disabled={iniciandoSesion}
        >
          {iniciandoSesion ? (
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              Iniciando Sesión...
            </motion.span>
          ) : (
            "Iniciar Sesión"
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default InicioSesionAnimado;