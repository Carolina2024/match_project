import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { fetchUsersget } from "../api/adopterApi";
import UserModalDelete from "./modals/UserModalDelete";
import { deleteUser } from "../api/deleteUser";

const UserProfiles = () => {
  const [users, setUsers] = useState([]);

  /* useEffect(() => {
    fetchUsersget().then(setUsers);
  }, []); */

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [deletedUserName, setDeletedUserName] = useState(""); // Estado para el nombre del usuario eliminado

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

  // Filtrar usuarios por nombre o email (insensible a mayúsculas)
  /* const filteredUsers = users.filter((user) =>
    `${user.fullname} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  ); */

  // Filter users by name/email and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.fullname} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEstado =
      estadoFiltro === "Todos" || user.estado === estadoFiltro;

    return matchesSearch && matchesEstado;
  });

  //PARA DELETE USER
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser.id);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, isActive: false, estado: "Inactivo" }
            : u
        )
      );
      setDeletedUserName(selectedUser.fullname); // Actualiza el nombre del usuario eliminado
      setShowMessage(true); // ✅ Mostrar el mensaje
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="p-8 bg-white border border-gray-400 rounded-lg">
      {/* Buscador */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Filtro de Estado */}
      <div className="flex items-center space-x-3 mb-4">
        <span className="font-raleway text-[16px]">Filtrar por:</span>
        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-3 focus:outline-none"
        >
          <option value="Todos">Estado</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
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
          {filteredUsers.map((user) => (
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
                  {/*  <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => handleOpenModal(user)}
                  >
                    <FaEye />
                  </button> */}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleOpenModal(user)} // Aquí pasamos el usuario seleccionado
                  >
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

      {/* ✅ MENSAJE DE ELIMINACIÓN */}
      {showMessage && (
        <div className="fixed bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-1/4 absolute right-0 top-190">
          <span className="block font-bold">Adoptante eliminado</span>
          <span>{deletedUserName} ha sido eliminado del registro.</span>
          <button
            onClick={() => setShowMessage(false)}
            className="absolute top-0 right-0 px-2 py-1 text-red-700 hover:text-red-900 text-lg"
          >
            &times;
          </button>
        </div>
      )}

      {/* Modal de eliminación */}
      <UserModalDelete
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UserProfiles;
