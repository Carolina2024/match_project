import PropTypes from "prop-types";
import { FiEye } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { PiTrashBold } from "react-icons/pi";
import CustomSelect from "./CustomSelect";
import { useState, useEffect } from "react";
import { getAllPets } from "../api/petService";
import PetDetailsModal from "./modals/PetDetailsModal";
import PetModalDelete from "./modals/PetModalDelete";
import { deletePet } from "../api/deletePet";
import { RiSearchLine } from "react-icons/ri";
import { UilPlus } from "@iconscout/react-unicons";


const PetList = ({ setActiveView, setEditingPet }) => {
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("Especie");
  const [filterSize, setFilterSize] = useState("Tamaño");
  const [filterStatus, setFilterStatus] = useState("Estado");

  const [modalOpenn, setModalOpenn] = useState(false);
  const [selectedPett, setSelectedPett] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [deletedPetName, setDeletedPetName] = useState("");

  const filteredPets = pets;

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
        const response = await getAllPets(
          currentPage,
          10,
          searchTerm,
          filterSpecies || null,
          filterSize,
          filterStatus
        );
        setPets(response.items || []);
        setTotalPages(response.totalPages || 1);
      } catch (error) {
        console.error("Error al cargar mascotas:", error.message);
      }
    };

    fetchPets();
  }, [currentPage, searchTerm, filterSpecies, filterSize, filterStatus]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Disponible:
        "font-raleway font-semibold text-[16px] text-[#35a302] bg-[rgba(53,163,2,0.25)]",
      "En Proceso":
        "bg-[rgba(255,128,44,0.25)] font-raleway text-[#FF802C] font-semibold text-[16px]",
      Adoptado:
        "bg-[rgba(108,108,108,0.25)] font-raleway text-[#6C6C6C] font-semibold text-[16px]",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-sm font-medium font-primary ${
          statusStyles[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {status}
      </span>
    );
  };

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
      setPets((prev) => prev.filter((pet) => pet.id !== selectedPett.id));
      setDeletedPetName(selectedPett.name);
      setShowMessage(true);
    } catch (error) {
      console.error("Error al eliminar la mascota:", error.message);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen mt-8">
      <div className="max-w-[1200px] mx-auto overflow-x-auto bg-white md:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.35)] md:rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div className="relative w-full sm:w-[500px] md:w-[350px]">
            <input
              type="text"
              placeholder="Buscar.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[410px] border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400 font-raleway text-[14px]"
              style={{
                borderWidth: "1px",
                borderColor: "rgba(118,117,117,0.8)",
              }}
            />
            <RiSearchLine
              className="absolute left-3 top-2 text-gray-400"
              size={24}
            />
          </div>

          <button
            onClick={() => setActiveView("createPet")}
            className="cursor-pointer [box-shadow:0_2px_4px_rgba(0,10,0,0.6)] mt-4 sm:mt-0 bg-[#f4a470] text-[#FFFFFF] px-4 py-2 rounded-[10px] hover:bg-[#e78b52] transition-colors duration-300 font-raleway font-semibold text-[16px] flex items-center justify-center gap-2"
          >
            <UilPlus size={24} /> Nueva mascota
          </button>
        </div>

        <div className="mb-4">
          <div className="mb-2 flex items-center gap-4 flex-wrap">
            <span className="font-raleway text-[16px] font-medium text-[#595146]">
              Filtrar por:
            </span>

            <div className="flex flex-wrap gap-2 font-raleway text-[16px] text-[#767575]">
              <CustomSelect
                label="Especie"
                options={["Especie", "Perro", "Gato"]}
                selected={filterSpecies}
                onChange={setFilterSpecies}
              />
              <CustomSelect
                label="Tamaño"
                options={["Tamaño", "Grande", "Mediano", "Pequeño"]}
                selected={filterSize}
                onChange={setFilterSize}
              />
              <CustomSelect
                label="Estado"
                options={["Estado", "En Proceso", "Adoptado", "Disponible"]}
                selected={filterStatus}
                onChange={setFilterStatus}
              />
            </div>
          </div>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-white text-[#595146] text-sm font-secundary text-[16px]">
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
          <tbody className="font-secundary">
            {filteredPets.map((pet) => (
              <tr key={pet.id || pet._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-secundary font-medium text-[#595146] text-[16px]">
                  {pet.name}
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
                      className="hover:text-gray-500"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => handleEdit(pet)}
                      title="Editar"
                      className="hover:text-gray-500 font-bold"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleOpenModal(pet)}
                      title="Eliminar"
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      <PiTrashBold />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-6">
          <div
            className="text-sm font-raleway font-semibold text-[14px] mb-4 sm:mb-0"
            style={{ color: "rgba(118, 117, 117, 0.7)" }}
          >
            Mostrando {pets.length} de {pets.length} mascotas
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="font-raleway font-normal text-[14px] px-4 py-1 bg-white rounded-md border-1 border-[#595146]  hover:bg-gray-100 disabled:opacity-50"
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
                      className={`font-raleway font-normal text-[14px] w-8 h-8 rounded-md border-1 border-[#595146] text-sm font-medium ${
                        currentPage === page
                          ? "bg-[#595146] text-white border-4 border-[#595146] shadow-md"
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
              className="font-raleway text-[14px] font-normal px-4 py-1 bg-white rounded-md border-1 border-[#595146] hover:bg-gray-200 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>

        {showMessage && (
          <div className="fixed bg-[rgba(255,77,77,0.25)] border border-red-400 px-4 py-2 rounded w-1/4 right-4 top-[100px] shadow-md">
            <span className="block text-[#FF4D4D] text-[16px] font-semibold font-['Inter']">
              Mascota eliminada
            </span>
            <span className="text-[#767575] text-[14px] font-normal font-['Inter']">
              {deletedPetName} ha sido eliminado del registro.
            </span>
            <button
              onClick={() => setShowMessage(false)}
              className="absolute top-1 right-2 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        )}

        {selectedPet && (
          <PetDetailsModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            pet={selectedPet}
          />
        )}
        <PetModalDelete
          isOpen={modalOpenn}
          onClose={handleCloseModal}
          onConfirm={handleDeletePet}
          pet={selectedPett}
        />
      </div>
    </div>
  );
};

PetList.propTypes = {
  setActiveView: PropTypes.func.isRequired,
  setEditingPet: PropTypes.func.isRequired,
};

export default PetList;
