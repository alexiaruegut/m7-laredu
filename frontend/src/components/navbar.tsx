import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";
import { FaHome, FaBook, FaClipboardList, FaTasks, FaInbox, FaUpload } from "react-icons/fa";
import { JSX } from "react";

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <div className="h-screen w-20 bg-gradient-to-br from-indigo-400 to-blue-300 shadow-xl fixed left-0 top-0 flex flex-col items-center py-6">
      <nav className="mt-6 flex flex-col space-y-8">
        <NavItem to="/" icon={<FaHome size={22} />} tooltip="Inicio" />
        <NavItem to="/courses" icon={<FaBook size={22} />} tooltip="Cursos" />
        <NavItem to="/subjects" icon={<FaClipboardList size={22} />} tooltip="Asignaturas" />
        <NavItem to="/assignments" icon={<FaTasks size={22} />} tooltip="Tareas" />
        <NavItem to="/submissions" icon={<FaUpload size={22} />} tooltip="Entregas" />
        <NavItem to="/messages" icon={<FaInbox size={22} />} tooltip="Mensajes" />
      </nav>

      <div className="mt-auto mb-6">
        <LogoutButton onLogout={onLogout} />
      </div>
    </div>
  );
}

interface NavItemProps {
  to?: string;
  icon: JSX.Element;
  tooltip: string;
  onClick?: () => void;
}

function NavItem({ to, icon, tooltip, onClick }: NavItemProps) {
  return (
    <div className="relative group">
      {to ? (
        <Link to={to} className="flex items-center justify-center p-4 text-white hover:bg-white/20 rounded-xl transition-all duration-300">
          {icon}
        </Link>
      ) : (
        <button onClick={onClick} className="flex items-center justify-center p-4 text-white hover:bg-white/20 rounded-xl transition-all duration-300">
          {icon}
        </button>
      )}
      <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        {tooltip}
      </span>
    </div>
  );
}
