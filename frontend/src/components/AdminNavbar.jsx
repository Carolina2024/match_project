import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { FaChevronDown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminNavbar = ({
  sectionTitle = "Panel de administración",
  userRole = "Admin",
  isSidebarVisible,
  setSidebarVisible,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("Usuario");
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const res = await fetch(`${BASE_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();

        setUserName(data.fullname || data.email);
      } catch (error) {
        console.error("Error obteniendo nombre:", error.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 z-20 px-3 py-1 border-0 shadow-sm md:border-b md:border-gray-200  transition-all duration-300 sm-border-none-important
        ${
          isSidebarVisible
            ? "sm:backdrop-blur-[4px] bg-[#EFEFEF]/70 md:backdrop-blur-none md:bg-[#EFEFEF]"
            : "bg-[#EFEFEF]"
        }
        ${
          isSidebarVisible
            ? "left-[187px] w-[calc(100%-27px)]"
            : "left-0 w-full"
        }
      `}
    >
      <div className="relative w-full flex items-center justify-between h-[70px] px-4 md:px-50">
        <div className="md:hidden">
          <button
            onClick={() => setSidebarVisible(true)}
            className="w-9 h-9 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.35)] flex justify-center items-center hover:bg-gray-100 transition"
          >
            <div className="flex flex-col items-center justify-between h-3 w-6">
              <span
                className="w-5 h-[2px] rounded-sm"
                style={{ backgroundColor: "#F9A975" }}
              ></span>
              <span
                className="w-5 h-[2px] rounded-sm"
                style={{ backgroundColor: "#F9A975" }}
              ></span>
              <span
                className="w-5 h-[2px] rounded-sm"
                style={{ backgroundColor: "#F9A975" }}
              ></span>
            </div>
          </button>
        </div>

        <div className="flex-1"></div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-[135px] h-[50px] bg-white border border-tertiary rounded-[20px] px-[3px] py-[4px]
        text-sm font-medium flex items-center
        shadow-[0_3px_0_0_#595146] hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-center flex-col text-center ml-2">
              <span className="text-[16px] font-secundary font-bold text-tertiary">
                {userName}
              </span>
              <span className="text-[14px] font-raleway font-medium text-[#767575]">
                {userRole}
              </span>
            </div>
            <FaChevronDown
              className={`w-[12px] h-[12px] text-sm ml-2 text-tertiary transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute top-full right-0 mt-2 w-38 bg-white rounded-xl shadow-lg z-20 text-sm">
              <div className="px-4 py-2 text-[12px] text-[#767575] font-raleway font-medium">
                Mi cuenta
              </div>
              <div className="border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-[14px] text-[#FF2D2D] font-raleway font-medium hover:bg-red-50 cursor-pointer"
                >
                  <FiLogOut className="w-[20px] h-[20px] mr-2" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <h2
        className={`text-lg font-semibold text-tertiary ${
          isSidebarVisible ? "hidden md:block" : ""
        } sm-ml-0 md:ml-20  mt-[10px] md:mt-[-70px] md:py-5`}
      >
        {sectionTitle}
      </h2>
    </div>
  );
};

AdminNavbar.propTypes = {
  sectionTitle: PropTypes.string,
  userRole: PropTypes.string,
  isSidebarVisible: PropTypes.bool.isRequired,
  setSidebarVisible: PropTypes.func.isRequired,
};

export default AdminNavbar;
