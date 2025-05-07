import PropTypes from "prop-types";
import {
  FaFileAlt,
  FaUserFriends,
  FaUserEdit,
  FaThLarge,
  FaPaw,
} from "react-icons/fa";

const Sidebar = ({ onSelect, activeView }) => {
  const items = [
    { label: "Dashboard", icon: <FaThLarge /> },
    { label: "Mascotas", icon: <FaPaw /> },
    { label: "Solicitudes", icon: <FaFileAlt /> },
    { label: "Adoptantes", icon: <FaUserFriends /> },
    { label: "Actualizar perfil", icon: <FaUserEdit /> },
  ];

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-[var(--color-fourth)] z-20 p-4 flex flex-col shadow-[4px_0_12px_rgba(0,0,0,0.1)]">
      {/* contenido del sidebar */}

      {/* LOGO Y NOMBRE */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src="src/assets/logo.png"
          alt="Logo"
          className="w-[60px] h-[60px] rounded-full"
        />
        <div className="flex items-center gap-2 text-gray-700">
          <div className="leading-tight text-left">
            <p className="text-md font-bold text-gray-700">Patas</p>
            <p className="text-sm font-bold text-gray-700">Pirque</p>
          </div>
          <span className="text-xl font-bold ms-20">«</span>
        </div>
      </div>

      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="space-y-4">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelect(item.label)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left font-medium transition-colors duration-200
              ${
                activeView === item.label
                  ? "bg-[#FAAA75] text-gray-700 border-t border-l border-r border-[#595146] border-b-[3px] border-b-[#595146]"
                  : "text-gray-700 hover:bg-orange-100"
              }`}
          >
            {/* Iconos con color gris */}
            <span className="text-gray-500">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;


Sidebar.propTypes = {
  activeView: PropTypes.string.isRequired, // o `.string` si no es obligatoria
  onSelect: PropTypes.func, // si también pasas esta función
};