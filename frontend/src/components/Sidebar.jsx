import {
  FaFileAlt,
  FaUserFriends,
  FaUserEdit,
  FaThLarge,
  FaPaw,
} from "react-icons/fa";

const Sidebar = ({ onSelect, activeView }) => {
  const items = [
    { label: "INICIO", icon: <FaThLarge /> },
    { label: "MASCOTAS", icon: <FaPaw /> },
    { label: "SOLICITUDES DE ADOPCIÓN", icon: <FaFileAlt /> },
    { label: "USUARIOS", icon: <FaUserFriends /> },
    { label: "ACTUALIZAR PERFIL", icon: <FaUserEdit /> },
  ];

  return (
    <div className="w-64 h-full bg-[#f5f5f5] p-6 border-r border-gray-300">
      {/* LOGO Y NOMBRE */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src="src/assets/logo.png"
          alt="Logo"
          className="w-[60px] h-[60px] rounded-full"
        />
        <div className="leading-tight text-left">
          <p className="text-md font-bold text-gray-700">Patas</p>
          <p className="text-sm font-bold text-gray-700">Pirque</p>
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
