import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  BellIcon // Icono para notificaciones/alertas
} from "@heroicons/react/24/solid";
import React from 'react';
import { Link } from "react-router-dom";

const MenuItemSuperior = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
      {icon}
      <span className="ml-2">{label}</span>
  </Link>
);

function MenuSuperior() {
  return (
      <header className="bg-gray-480 text-black p-4">
          <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Bienvenido a VacaTrackPro</h2>
              <nav className="flex items-center">
                  <MenuItemSuperior to="/notificaciones" icon={<BellIcon className="h-6 w-6" />} label="Notificaciones" />
                  <MenuItemSuperior to="/perfil" icon={<UserIcon className="h-6 w-6" />} label="Perfil" />
                  <Link to="/logout" className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                      <ArrowRightOnRectangleIcon className="h-6 w-6" />
                      <span className="ml-2">Cerrar Sesión</span>
                  </Link>
              </nav>
          </div>
      </header>
  );
}

export default MenuSuperior;