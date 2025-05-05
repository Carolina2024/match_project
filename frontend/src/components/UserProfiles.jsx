import { useState } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
// componets/UserProfiles.jsx
const UserProfiles = () => {
  const users = [
    {
      id: 1,
      fullname: "Vanessa Montero",
      email: "vane@example.com",
      identityDocument: "20000000-0",
      estado: "Activo",
      address: "calle 1",
    },
    {
      id: 2,
      fullname: "Carlos Riquelme",
      email: "admin@example.com",
      identityDocument: "20000000-1",
      estado: "Inactivo",
      address: "calle 2",
    },
    {
      id: 3,
      fullname: "Francisca Merino",
      email: "fca@example.com",
      identityDocument: "20000000-2",
      estado: "Activo",
      address: "calle 3",
    },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentusers = users.slice(startIndex, endIndex);

  const goToPage = (page) => setCurrentPage(page);
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="p-8 bg-white border border-gray-400 rounded-lg">
      {/* Buscador y Filtro */}
      <div className=" mb-6">
        {/* Buscador */}
        <div>
          <div className="relative w-[410px]">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-2 h-[44px] border border-[#767575CC] rounded-[10px]
                 font-raleway font-normal text-[14px] leading-[1] focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-300 w-6 h-6" />
          </div>
        </div>
      </div>
      {/* FILTRO */}
      <div className="flex items-center space-x-3 mb-4">
        <span className="font-raleway text-[16px]">Filtrar por:</span>
        <select className="w-[125px] h-[44px] border border-[#767575CC] rounded-[10px] px-2 text-sm focus:outline-none">
          <option>Estado</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
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
      <div className="flex justify-between items-center mt-6 text-sm text-gray-700">
        <span>
          Mostrando {Math.min(endIndex, users.length)} de {users.length}{" "}
          mascotas
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-black border-gray-500"
            }`}
          >
            Anterior
          </button>

          {/* Números de página */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === page
                    ? "bg-[#595146] text-white border-[#595146]"
                    : "text-black border-gray-400 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-black border-gray-500"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfiles;
