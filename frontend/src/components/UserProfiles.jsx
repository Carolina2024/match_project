import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { fetchUsersget } from "../api/adopterApi";

const UserProfiles = () => {
  const [users, setUsers] = useState([]);

  /* useEffect(() => {
    fetchUsersget().then(setUsers);
  }, []); */

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetchUsersget(currentPage);
          console.log("Usuarios recibidos:", response.items);
          setUsers(response.items || []);
          setTotalPages(response.totalPages || 1);
        } catch (error) {
          console.error("Error al cargar usuarios:", error.message);
        }
      };

      fetchUsers();
    }, [currentPage]); // Actualiza cuando cambie la página

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

  return (
    <div className="p-8 bg-white border border-gray-400 rounded-lg">
      {/* Buscador y Filtro */}
      <div className=" mb-6">
        {/* Buscador */}
        <div>
          {/* <div className="relative w-[410px]">
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reinicia a la primera página cuando se filtra
              }}
              className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#767575CC] rounded-[10px]
                 font-raleway font-normal text-[14px] leading-[1] focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-300 w-6 h-6" />
          </div> */}
        </div>
      </div>
      {/* FILTRO */}
      <div className="flex items-center space-x-3 mb-4">
        <span className="font-raleway text-[16px]">Filtrar por:</span>
       {/*  <select
          value={estadoFiltro}
          onChange={(e) => {
            setEstadoFiltro(e.target.value);
            setCurrentPage(1); // Reinicia paginación cuando cambia filtro
          }}
          className="w-[125px] h-[44px] border border-[#767575CC] rounded-[10px] px-2 text-sm focus:outline-none"
        >
          <option>Estado</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select> */}
      </div>

      {/* Tabla de solicitudes */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-white text-black border-b border-[#76757599]">
            <th className="px-4 py-2 text-left font-semibold text-[16px] font-['Montserrat Alternates'] w-[68px]">
              Nombre
            </th>
            <th className="px-4 py-2 text-left font-semibold text-[16px] font-['Montserrat Alternates']">
              Correo
            </th>
            <th className="px-4 py-2 text-left font-semibold text-[16px] font-['Montserrat Alternates']">
              Documento
            </th>
            <th className="px-4 py-2 text-center font-semibold text-[16px] font-['Montserrat Alternates']">
              Estado
            </th>
            <th className="px-4 py-2 text-left font-semibold text-[16px] font-['Montserrat Alternates']">
              Dirección y comuna
            </th>
            <th className="px-4 py-2 text-center font-semibold text-[16px] font-['Montserrat Alternates']">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-[#76757599] text-sm text-left bg-white"
            >
              <td className="px-4 py-3">{user.fullname}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.identityDocument}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                    user.estado === "Activo" ? "bg-[#50C878]" : "bg-gray-400"
                  }`}
                >
                  {user.estado}
                </span>
              </td>
              <td className="px-4 py-3">{user.address}</td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center items-center space-x-4">
                  <button className="text-gray-600 hover:text-black">
                    <FaEye />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Mostrando {users.length} de {users.length} usuarios
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>

          {/* Botones de página (solo si hay más de 1) */}
          <div className="flex gap-1">
            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded border text-sm font-medium ${
                      currentPage === page
                        ? "bg-[#595146] text-white border-[#595146]" // Activo: fondo café, texto blanco
                        : "bg-white text-[#b26b3f] border-gray-400 hover:bg-gray-100" // Inactivo: fondo blanco, texto café
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-white0 rounded-r-lg border border-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfiles;
