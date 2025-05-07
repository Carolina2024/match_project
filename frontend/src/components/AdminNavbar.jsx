import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {jwtDecode} from "jwt-decode";
import Swal from "sweetalert2";

const AdminNavbar = ({ sectionTitle = "Panel de administración", userRole = "Admin" }) => {
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

        const res = await fetch(`https://match-project.onrender.com/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
          className="bg-white border px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-gray-50"
        >
          {userName} <span className="text-gray-500 text-xs">({userRole})</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                navigate("/perfil");
              }}
            >
              Mi perfil
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Cerrar sesión
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