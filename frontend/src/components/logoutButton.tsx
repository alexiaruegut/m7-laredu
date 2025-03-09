import { FaSignOutAlt } from "react-icons/fa";

interface LogoutButtonProps {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <div className="mt-auto mb-6 group relative">
      <button
        onClick={onLogout}
        className="text-white p-4 rounded-xl hover:bg-red-500 hover:bg-opacity-50"
      >
        <FaSignOutAlt size={22} />
      </button>
      <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        Cerrar sesión
      </span>
    </div>
  );
}
