import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { fetchUsersget } from "../api/adopterApi";
import UserModalDelete from "./modals/UserModalDelete";
import { deleteUser } from "../api/deleteUser";
import AdopterModalDetail from "./modals/AdopterModalDetail";

const UserProfiles = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [deletedUserName, setDeletedUserName] = useState("");

  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.fullname} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
      setDeletedUserName(selectedUser.fullname);
      setShowMessage(true);
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
    } finally {
      handleCloseModal();
    }
  };

  const handleOpenDetail = (user) => {
    setSelectedUserDetail(user);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedUserDetail(null);
  };

  return (
    <div className="p-4 md:p-8 bg-white border border-gray-400 rounded-lg overflow-x-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
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
                <td className="px-4 py-3 whitespace-nowrap">{user.address}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      className="text-gray-600 hover:text-black"
                      onClick={() => handleOpenDetail(user)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleOpenModal(user)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <div className="text-sm text-gray-500">
          Mostrando {users.length} de {users.length} usuarios
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Anterior
          </button>

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
                        ? "bg-[#595146] text-white border-[#595146]"
                        : "bg-white text-[#b26b3f] border-gray-400 hover:bg-gray-100"
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

      {showMessage && (
        <div className="fixed bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-1/4 right-10 bottom-10 z-50">
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

      <UserModalDelete
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteUser}
        user={selectedUser}
      />

      <AdopterModalDetail
        open={isDetailOpen}
        onClose={handleCloseDetail}
        adopter={selectedUserDetail}
      />
    </div>
  );
};

export default UserProfiles;
