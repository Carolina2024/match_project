import PropTypes from "prop-types";
import { FiUsers } from "react-icons/fi";
import { LuFileCheck } from "react-icons/lu";

import { PiPawPrint } from "react-icons/pi";

import logo from "../assets/logo.png";

const Sidebar = ({ onSelect, activeView, isVisible, setIsVisible }) => {
  const items = [

    { label: "Mascotas", icon: <PiPawPrint />},
    { label: "Solicitudes", icon: <LuFileCheck />},
    { label: "Adoptantes", icon: <FiUsers />},
  ];

  const sidebarStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "230px",
    backgroundColor: "var(--color-fourth)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
    transform: isVisible ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease",
    zIndex: 20,
  };

  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(2px)",
    zIndex: 10,
  };

  const closeButtonStyles = {
    position: "absolute",
    top: "16px",
    right: "16px",
    fontSize: "24px",
    cursor: "pointer",
    color: "orange",
  };

  return (
    <>
      {/* Overlay modal solo visible en móvil cuando sidebar está activo */}
      {isVisible && (
        <div
          onClick={() => setIsVisible(false)} // Oculta el sidebar al hacer clic en el overlay
          style={overlayStyles}
          className="md:hidden"
        ></div>
      )}
      <div style={sidebarStyles}>
        <button
          onClick={() => setIsVisible(false)}
          style={closeButtonStyles}
          className="block md:hidden"
        >
          x
        </button>

        <div className="flex items-center gap-3 mb-6">
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="w-[70px] h-[70px] rounded-full "
          />
          <div className="flex items-center gap-2 text-gray-700">
            <div className="leading-tight text-left font-secundary">
              <p className="text-xl font-bold text-gray-700">Patas</p>
              <p className="text-xl font-bold text-gray-700">Pirque</p>
            </div>
          </div>
        </div>

        <nav className="space-y-4">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => onSelect(item.label)}
              className={`flex items-center gap-3 px-5 py-2 rounded-lg w-full text-left font-medium transition-colors duration-200
              ${
                activeView === item.label
                  ? "bg-[#FAAA75] text-gray-700 border-t border-l border-r border-[#595146] border-b-[3px] border-b-[#595146]"
                  : "text-gray-700 hover:bg-orange-100"
              }`}
            >
              <span className="text-gray-600">{item.icon}</span>
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
  activeView: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};
