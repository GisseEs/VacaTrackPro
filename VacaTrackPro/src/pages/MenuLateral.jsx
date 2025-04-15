import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserGroupIcon, // Mejor para Empleados
  BuildingOfficeIcon, // Mejor para Sucursales
  DocumentIcon, // Genérico para Documentos/Notas
  ShieldCheckIcon,
  CalendarDaysIcon, // Más específico para Calendario
  ClipboardDocumentIcon, // Más específico para Planillas
  CheckBadgeIcon, // Más visual para Aprobación
  ClockIcon,
  ChartBarIcon,
  UserCircleIcon, // Mejor para Inicio de Sesión
  DocumentPlusIcon, // Para Solicitud
  UserIcon, // Para Estado Permiso
  DocumentMagnifyingGlassIcon, // Para Gestión Pendientes
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const MenuLateral = ({ isOpen, toggleMenu }) => {
  return (
      <div className={`bg-gray-480 text-black h-screen p-4 transition-all ${isOpen ? "w-64" : "w-16"}`}>
          <button onClick={toggleMenu} className="text-black h-12 w-12 flex items-center justify-center">
              {isOpen ? <XMarkIcon className="h-12 w-12" /> : <Bars3Icon className="h-12 w-12" />}
          </button>
          <ul>
              <MenuItem to="/" icon={<HomeIcon className="h-6 w-6" />} label="Inicio" isOpen={isOpen} />
              <MenuItem to="/iniciosesion" icon={<UserCircleIcon className="h-6 w-6" />} label="Inicio Sesión" isOpen={isOpen} />
              <MenuItem to="/vacaciones" icon={<CalendarDaysIcon className="h-6 w-6" />} label="Panel de Vacaciones" isOpen={isOpen} />
              <MenuItem to="/planillavacaciones" icon={<ClipboardDocumentIcon className="h-6 w-6" />} label="Planilla Vacaciones" isOpen={isOpen} />
              <MenuItem to="/aprobacionvacaciones" icon={<CheckBadgeIcon className="h-6 w-6" />} label="Aprobación Vacaciones" isOpen={isOpen} />
              <MenuItem to="/notavacaciones" icon={<DocumentIcon className="h-6 w-6" />} label="Nota de Vacaciones" isOpen={isOpen} />
              <MenuItem to="/solicitudpermiso" icon={<DocumentPlusIcon className="h-6 w-6" />} label="Solicud de Permiso" isOpen={isOpen} />
              <MenuItem to="/estadopermiso" icon={<UserIcon className="h-6 w-6" />} label="Estado Permiso Funcionario" isOpen={isOpen} />
              <MenuItem to="/reportes" icon={<ChartBarIcon className="h-6 w-6" />} label="Reportes" isOpen={isOpen} />
              <MenuItem to="/gestion-empleados" icon={<UserGroupIcon className="h-6 w-6" />} label="Gestión de Empleados" isOpen={isOpen} />
              <MenuItem to="/gestion-sucursales" icon={<BuildingOfficeIcon className="h-6 w-6" />} label="Gestión de Sucursales" isOpen={isOpen} />
              <MenuItem to="/gestion-pendientes" icon={<DocumentMagnifyingGlassIcon className="h-6 w-6" />} label="Gestión Pendientes" isOpen={isOpen} />
              <MenuItem to="/gestion-seguridad" icon={<ShieldCheckIcon className="h-6 w-6" />} label="Gestión de Seguridad" isOpen={isOpen} />
          </ul>
      </div>
  );
};

const MenuItem = ({ to, icon, label, isOpen }) => (
  <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
      <Link to={to} className="flex items-center w-full">
          {icon}
          {isOpen && <span className="ml-4">{label}</span>}
      </Link>
  </li>
);

export default MenuLateral;