import PropTypes from "prop-types";
import { FiUsers } from "react-icons/fi";
import { UilFileCheckAlt } from "@iconscout/react-unicons";
import { PiPawPrint } from "react-icons/pi";
import logo from "../assets/logo.webp";

const Sidebar = ({ onSelect, activeView, isVisible, setIsVisible }) => {
  const items = [
    {
      label: "Mascotas",
      icon: <PiPawPrint size={24} style={{ height: "22px" }} />,
      labelStyled: (
        <span className="font-raleway font-semibold text-[16px] text-tertiary">
          Mascotas
        </span>
      ),
    },
    {
      label: "Solicitudes",
      icon: <UilFileCheckAlt size="24" />,
      labelStyled: (
        <span className="font-raleway font-semibold text-[16px] text-tertiary">
          Solicitudes
        </span>
      ),
    },
    {
      label: "Adoptantes",
      icon: <FiUsers size="24" />,
      labelStyled: (
        <span className="font-inter font-medium text-[16px] text-tertiary">
          Adoptantes
        </span>
      ),
    },
  ];

  const sidebarStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "237px",
    backgroundColor: "var(--color-fourth)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
    transform: isVisible ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.6s ease",
    zIndex: 30,
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
    color: "#F9A975",
  };

  return (
    <>
      {isVisible && (
        <div
          onClick={() => setIsVisible(false)}
          style={overlayStyles}
          className="md:hidden"
        ></div>
      )}
      <div style={sidebarStyles}>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            ...closeButtonStyles,
            marginTop: "2px",
            marginLeft: "7px",
            fontSize: "33px",
            zIndex: 18,
          }}
          className="block md:hidden absolute"
        >
          x
        </button>

        <div className="flex items-center gap-3 mb-6">
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="w-[50px] h-[50px] rounded-full "
          />
          <div className="flex items-center gap-2 text-gray-700">
            <div className="leading-tight text-left font-secundary">
              <p className="font-montserratAlt font-bold text-[20px] text-tertiary">
                Patas
              </p>
              <p className="font-montserratAlt font-bold text-[20px] text-tertiary">
                Pirque
              </p>
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
                  ? "bg-[#FAAA75] text-gray-700 border-t border-l border-r border-tertiary border-b-[3px] border-b-[#595146]"
                  : "text-gray-700 hover:bg-orange-100"
              }`}
            >
              <span className="border-tertiary flex items-center justify-center">
                {item.icon}
              </span>
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
