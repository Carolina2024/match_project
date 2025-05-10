import PropTypes from "prop-types";
import { useState } from "react";
import {
  FaFileAlt,
  FaUserFriends,
  // FaUserEdit,
  // FaThLarge,
  FaPaw,
} from "react-icons/fa";

const Sidebar = ({ onSelect, activeView, isVisible, setIsVisible }) => {

  const items = [
    /*  { label: "Dashboard", icon: <FaThLarge /> }, */
    { label: "Mascotas", icon: <FaPaw /> },
    { label: "Solicitudes", icon: <FaFileAlt /> },
    { label: "Adoptantes", icon: <FaUserFriends /> },
    /* { label: "Actualizar perfil", icon: <FaUserEdit /> }, */
  ];

  return (
    <>
      {/* Botón para mostrar el sidebar en pantallas pequeñas */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed top-4 left-4 z-30 p-2 bg-[var(--color-fourth)] rounded-full shadow-md text-xl font-bold"
        >
          {">>"}
        </button>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-[180px] bg-[var(--color-fourth)] z-20 p-4 flex flex-col shadow-lg transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botón para ocultar el sidebar */}
        <button
          onClick={() => setIsVisible(false)}
          className="self-end mb-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          {"<<"}
        </button>

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
    </>
  );
};

export default Sidebar;


Sidebar.propTypes = {
  activeView: PropTypes.string.isRequired, // o `.string` si no es obligatoria
  onSelect: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired, // si también pasas esta función
};