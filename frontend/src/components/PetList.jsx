import PropTypes from "prop-types";
import { FaPen, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getAllPets } from "../api/petService";
import PetDetailsModal from "./modals/PetDetailsModal";
import PetModalDelete from "./modals/PetModalDelete";
import { deletePet } from "../api/deletePet";

const PetList = ({ setActiveView, setEditingPet }) => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("Todos");
  const [filterSize, setFilterSize] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const [modalOpenn, setModalOpenn] = useState(false);
  const [selectedPett, setSelectedPett] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [deletedPetName, setDeletedPetName] = useState("");

  const handleEdit = (pet) => {
    console.log({pet})
    setEditingPet(pet);
    setActiveView("editPet");
  };

  const handleViewPet = (pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getAllPets(currentPage);
        console.log("Mascotas recibidas:", response.items);
        setPets(response.items || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {

        console.error("Error al cargar mascotas:", error.message);
      }
    };

    fetchPets();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = `${pet.name} ${pet.breed}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEspecie =
      filterSpecies === "Todos" || pet.species === filterSpecies;
    const matchesTamanio =
      filterSize === "Todos" || pet.size === filterSize;
    const matchesEstado =
      filterStatus === "Todos" || pet.status === filterStatus;
    return matchesSearch && matchesEspecie && matchesTamanio && matchesEstado;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      Disponible: "bg-green-500 text-white",
      "En Proceso": "bg-orange-500 text-white",
      Adoptada: "bg-[#b26b3f] text-white",
    };
    return (
      <span className={`px-2 py-1 rounded text-sm font-medium ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>{status}</span>
    );
  };

//PARA DELETE USER
  const handleOpenModal = (pet) => {
    setSelectedPett(pet);
    setModalOpenn(true);
  };

  const handleCloseModal = () => {
    setSelectedPett(null);
    setModalOpenn(false);
  };

  const handleDeletePet = async () => {
    if (!selectedPett) return;
    try {
      await deletePet(selectedPett.id);
      setPets((prev) =>
        prev.map((u) =>
          u.id === selectedPett.id
            ? { ...u, isActive: false, estado: "Inactivo" }
            : u
        )
      );
      setDeletedPetName(selectedPett.name); // Actualiza el nombre del usuario eliminado
      setShowMessage(true); // ✅ Mostrar el mensaje
    } catch (error) {
      console.error("Error al eliminar la mascota:", error.message);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        {/* Buscador */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <button
          onClick={() => setActiveView("createPet")}
          className="bg-[#f4a470] text-white px-4 py-2 rounded hover:bg-[#e78b52] transition-colors duration-300 cursor-pointer"
        >
          + Nueva mascota
        </button>
      </div>

      <div className="flex gap-4 mb-7">
        <span className="font-raleway text-[16px]">Filtrar por:</span>
        {/* Filtro 1 */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          value={filterSpecies}
          onChange={(e) => setFilterSpecies(e.target.value)}
        >
          <option value="Todos">Especie</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
        </select>

        {/* Filtro 2 */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          value={filterSize}
          onChange={(e) => setFilterSize(e.target.value)}
        >
          <option value="Todos">Tamaño</option>
          <option value="Pequeño">Pequeño</option>
          <option value="Mediano">Mediano</option>
          <option value="Grande">Grande</option>
        </select>

        {/* Filtro 3 */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Todos">Estado</option>
          <option value="Disponible">Disponible</option>
          <option value="Adoptado">Adoptado</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-white text-gray-700 text-sm">
              <th className="px-4 py-3 text-left">Mascota</th>
              <th className="px-4 py-3 text-left">Fecha Ingreso</th>
              <th className="px-4 py-3 text-left">Especie</th>
              <th className="px-4 py-3 text-left">Raza</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Sexo</th>
              <th className="px-4 py-3 text-left">Tamaño</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => (
              <tr key={pet.id || pet._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  <span className="font-medium text-gray-700">{pet.name}</span>
                </td>
                <td className="px-4 py-2">{pet.admissionDate}</td>
                <td className="px-4 py-2">{pet.species}</td>
                <td className="px-4 py-2">{pet.breed}</td>
                <td className="px-4 py-2">{getStatusBadge(pet.status)}</td>
                <td className="px-4 py-2">{pet.sex}</td>
                <td className="px-4 py-2">{pet.size}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 text-gray-600 text-lg">
                    <button
                      onClick={() => handleViewPet(pet)}
                      title="Visualizar"
                      className="hover:text-green-600"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(pet)}
                      title="Editar"
                      className="text-green-600 hover:text-blue-600"
                    >
                      <FaPen />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleOpenModal(pet)} // Aquí pasamos el usuario seleccionado
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

      {selectedPet && (
        <PetDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          pet={selectedPet}
        />
      )}

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Mostrando {pets.length} de {pets.length} mascotas
        </div>

        <div className="flex items-center gap-2">
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
            className="px-3 py-2 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* ✅ MENSAJE DE ELIMINACIÓN */}
      {showMessage && (
        <div className="fixed bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-1/4 absolute right-0 top-190">
          <span className="block font-bold">Mascota eliminada</span>
          <span>{deletedPetName} ha sido eliminado del registro.</span>
          <button
            onClick={() => setShowMessage(false)}
            className="absolute top-0 right-0 px-2 py-1 text-red-700 hover:text-red-900 text-lg"
          >
            &times;
          </button>
        </div>
      )}

      {/* Modal de eliminación */}
      <PetModalDelete
        isOpen={modalOpenn}
        onClose={handleCloseModal}
        onConfirm={handleDeletePet}
        pet={selectedPett}
      />
    </div>
  );
};

PetList.propTypes = {
  setActiveView: PropTypes.func.isRequired,
  setEditingPet: PropTypes.func.isRequired,
  handleSavePet: PropTypes.func.isRequired,
  handleDeletePet: PropTypes.func.isRequired,
};

export default PetList;
