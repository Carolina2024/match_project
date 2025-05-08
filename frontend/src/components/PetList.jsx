import PropTypes from "prop-types";
import { FaPen, FaTrash, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getAllPets } from "../api/petService";
import PetDetailsModal from "./modals/PetDetailsModal";

const PetList = ({ setActiveView, setEditingPet, handleDeletePet }) => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleEdit = (pet) => {
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
  }, [currentPage, pets]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setActiveView("createPet")}
          className="bg-[#f4a470] text-white px-4 py-2 rounded hover:bg-[#e78b52] transition-colors duration-300 cursor-pointer"
        >
          + Nueva mascota
        </button>
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
            {pets.map((pet) => (
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
                      onClick={() => handleDeletePet(pet.id || pet._id)}
                      title="Eliminar"
                      className="text-red-600 hover:text-red-600"
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
