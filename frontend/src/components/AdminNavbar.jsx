import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


const AdminNavbar = ({
  sectionTitle = "Panel de administración",
  userRole = "Admin",
}) => {
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

        const res = await fetch(
          `https://match-project.onrender.com/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        console.log("Usuario:", data);

        setUserName(data.fullname || data.email); // Ajusta según lo que te devuelva
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
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  return (
    <div className="bg-[#F7F7F7] w-full py-3 px-6 flex justify-between items-center border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700">{sectionTitle}</h2>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="bg-white border px-6 py-2 rounded-full shadow-sm text-sm font-medium hover:bg-gray-50 flex items-center"
        >
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm text-gray-800 font-bold">{userName}</span>
            <span className="text-xs text-gray-500">{userRole}</span>
          </div>
          <FaChevronDown
            className={`text-sm text-gray-500 ml-2 transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
            <button
              className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                navigate("/Admin");
              }}
            >
              <FaUser className="mr-2 text-gray-500" />
              <span>Mi perfil</span>
            </button>
            <button
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

AdminNavbar.propTypes = {
  sectionTitle: PropTypes.string,
  userRole: PropTypes.string,
};

export default AdminNavbar;