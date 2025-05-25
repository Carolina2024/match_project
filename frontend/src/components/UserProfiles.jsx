import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { PiTrashBold } from "react-icons/pi";
import { fetchUsersget } from "../api/adopterApi";
import UserModalDelete from "./modals/UserModalDelete";
import { deleteUser } from "../api/deleteUser";
import AdopterModalDetail from "./modals/AdopterModalDetail";
import { getUserById } from "../api/adopterDetail";
import { RiSearchLine } from "react-icons/ri";

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
        const response = await fetchUsersget(currentPage, 10, searchTerm);
        setUsers(response.items || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Error al cargar usuarios:", error.message);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
      const response = await fetchUsersget(currentPage);
      setUsers(response.items || []);
      setDeletedUserName(selectedUser.fullname);
      setShowMessage(true);
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
    } finally {
      handleCloseModal();
    }
  };

  const handleOpenDetail = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const fullUser = await getUserById(user.id, token);
      setSelectedUserDetail(fullUser);
      setIsDetailOpen(true);
    } catch (error) {
      console.error("Error al obtener los detalles del usuario:", error);
    }
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedUserDetail(null);
  };

  return (
    <div className="shadow-[0px_0px_10px_rgba(0,0,0,0.2)] md:rounded-[20px] border-transparent  p-4 md:p-8 bg-white sm:border sm:border-gray-300 overflow-x-auto mt-8 sm:p-5">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[410px] placeholder:font-medium placeholder:text-[14px] text-[#767575] border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
            style={{
              borderWidth: "1px",
              borderColor: "rgba(118,117,117,0.8)",
            }}
          />
          <RiSearchLine
            className="absolute left-3 top-3 text-gray-400"
            size={24}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="font-secundary font-semibold text-[16px] text-tertiary bg-white border-b border-[#76757599]">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Documento</th>
              <th className="px-4 py-2 text-left">Dirección y comuna</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="font-raleway font-normal text-[16px] text-tertiary border-b border-[#76757599] bg-white"
              >
                <td className="font-raleway font-normal text-[16px] text-tertiary px-4 py-3">
                  {user.fullname}
                </td>
                <td className="font-raleway font-normal text-[16px] text-tertiary px-4 py-3">
                  {user.email}
                </td>
                <td className="font-raleway font-normal text-[16px] text-tertiary px-4 py-3">
                  {user.identityDocument}
                </td>
                <td className="font-raleway font-normal text-[16px] text-tertiary px-4 py-3 whitespace-nowrap">
                  {user.address}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      className="text-tertiary hover:text-black cursor-pointer"
                      onClick={() => handleOpenDetail(user)}
                    >
                      <FiEye className="text-[20px]" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleOpenModal(user)}
                    >
                      <PiTrashBold className="text-[20px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <div className="font-raleway font-normal text-[16px] text-[#767575] text-sm">
          Mostrando {users.length} de {users.length} usuarios
        </div>

        <div className="px-4 sm:px-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-[36px] p-[10px] cursor-pointer sm:px-3 sm:py-2 flex items-center justify-center font-raleway font-medium text-[16px] text-[#767575] px-3 py-2 bg-white rounded-[10px] border border-[#767575cc] hover:bg-gray-100 disabled:opacity-50"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded border cursor-pointer text-sm font-medium ${
                    currentPage === page
                      ? "bg-tertiary text-white border-tertiary rounded-[10px]"
                      : "bg-white text-[#b26b3f] border-gray-400 hover:bg-gray-100 rounded-[10px]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-[36px] p-[10px] cursor-pointer sm:px-3 sm:py-2 flex items-center justify-center font-raleway font-medium text-[16px] text-[#767575] px-3 py-2 bg-white rounded-[10px] border border-tertiary hover:bg-gray-200 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      {showMessage && (
        <div className="fixed bg-[#FFE2E2] border border-[rgba(255,77,77,0.25)] text-red-700 px-4 py-2 rounded mb-4 w-1/4 right-10 bottom-10 z-50">
          <span className="block text-[#FF4D4D] text-[16px] font-semibold font-['Inter']">
            Adoptante eliminado
          </span>
          <span className="text-[14px] font-normal text-[#767575cc] font-['Inter']">
            {deletedUserName} ha sido eliminado del registro.
          </span>
          <button
            onClick={() => setShowMessage(false)}
            className="absolute top-0 right-0 px-2 py-1 text-[rgba(89,81,70,0.5)] hover:text-[rgba(89,81,70,0.8)] text-2xl"
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
