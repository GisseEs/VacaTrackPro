import {
  Bars3Icon, XMarkIcon, HomeIcon, BriefcaseIcon,
  DocumentTextIcon, ShieldCheckIcon, CalendarIcon,
  ClipboardDocumentListIcon, CheckCircleIcon, ClockIcon,
  ChartBarIcon,UserIcon
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom"; // Importa Link

const MenuLateral = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`bg-gray-480 text-black h-screen p-4 transition-all ${isOpen ? "w-64" : "w-16"}`}>
      <button onClick={toggleMenu} className="text-black h-12 w-12 flex items-center justify-center">
        {isOpen ? <XMarkIcon className="h-12 w-12" /> : <Bars3Icon className="h-12 w-12" />}
      </button>
      <ul>
        <MenuItem to="/" icon={<HomeIcon className="h-6 w-6" />} label="Inicio" isOpen={isOpen} />
        <MenuItem to="/iniciosesion" icon={<UserIcon className="h-6 w-6" />} label="Inicio Sesión" isOpen={isOpen} />
        <MenuItem to="/vacaciones" icon={<CalendarIcon className="h-6 w-6" />} label="Panel de Vacaciones" isOpen={isOpen} />
        <MenuItem to="/planillavacaciones" icon={<ClipboardDocumentListIcon className="h-6 w-6" />} label="Planilla Vacaciones" isOpen={isOpen} />
        <MenuItem to="/aprobacion-vacaciones" icon={<CheckCircleIcon className="h-6 w-6" />} label="Aprobación Vacaciones" isOpen={isOpen} />
        <MenuItem to="/reportes" icon={<ChartBarIcon className="h-6 w-6" />} label="Reportes" isOpen={isOpen} />
        <MenuItem to="/gestion-empleados" icon={<BriefcaseIcon className="h-6 w-6" />} label="Gestión de Empleados" isOpen={isOpen} />
        <MenuItem to="/gestion-sucursales" icon={<DocumentTextIcon className="h-6 w-6" />} label="Gestión de Sucursales" isOpen={isOpen} />
        <MenuItem to="/gestion-pendientes" icon={<ClockIcon className="h-6 w-6" />} label="Gestión Pendientes" isOpen={isOpen} />
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