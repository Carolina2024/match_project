import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { FaSignOutAlt, FaChevronDown, FaUser } from "react-icons/fa";
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

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        console.log("Usuario:", data);

        setUserName(data.fullname || data.email);
      } catch (error) {
        console.error("Error obteniendo nombre:", error.message);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    setOpen(false);

    Swal.fire({
      title: "¡Hasta pronto!",
      text: "Has cerrado sesión exitosamente.",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      logout();
      navigate("/");
    });
  };

  return (
    <div
      className={`bg-[#F7F7F7] fixed top-0 z-0 px-4 py-1 border-b md:border-b border-b-0 border-gray-200 transition-all duration-300
      ${
        isSidebarVisible ? "left-[180px] w-[calc(100%-180px)]" : "left-0 w-full"
      }
      h-auto`}
    >

      <div className="flex justify-between items-center h-[70px]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarVisible(true)}
            className={`md:hidden w-12 h-12 bg-white rounded-full shadow flex justify-center items-center hover:bg-gray-100 transition mr-auto ${
              isSidebarVisible ? "left-[-1000%]" : ""
            }`}
          >
            <div className="flex flex-col items-center justify-between h-6 w-6">
              <span className="w-5 h-[2px] bg-orange-500 rounded-sm"></span>
              <span className="w-5 h-[2px] bg-orange-500 rounded-sm"></span>
              <span className="w-5 h-[2px] bg-orange-500 rounded-sm"></span>
            </div>
          </button>
        </div>

        <div className="">
          <button
            onClick={() => setOpen(!open)}
            className="bg-white border px-4 rounded-full shadow-sm text-sm font-medium hover:bg-gray-50 flex items-center"
          >
            <div className="flex flex-col items-start leading-tight">
              <span className="text-sm text-gray-800 font-bold">
                {userName}
              </span>
              <span className="text-xs text-gray-500">{userRole}</span>
            </div>
            <FaChevronDown
              className={`text-sm text-gray-500 ml-2 transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg border-gray-200 rounded z-50 text-xs">
              <button
                className="flex items-center w-full text-left px-2 py-1 text-sm hover:bg-gray-100"
                onClick={() => {
                  setOpen(false);
                  navigate("/Admin");
                }}
              >
                <FaUser className="mr-1 text-gray-500 text-sm" />
                <span>Mi perfil</span>
              </button>
              <button
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-1 text-sm" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>

      </div>

      <h2
        className={`text-lg font-semibold text-gray-700 ${
          isSidebarVisible ? "hidden md:block" : ""
        } sm-ml-0  md:ml-20
    mt-[10px] md:mt-[-70px] md:py-5
          `}
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
