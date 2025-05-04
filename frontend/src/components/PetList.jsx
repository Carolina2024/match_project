import PropTypes from "prop-types";
import { FaPen, FaRegSave, FaTrash } from "react-icons/fa";
import PetFormModal from "./PetFormModal";
import { useState } from "react";

const PetList = ({ pets, setActiveView, setEditingPet, handleSavePet, handleDeletePet }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setActiveView("editPet");
  };

  return (
    <div className="ms-5">
      <div className="flex justify-between w-full mt-10">
        <h2 className="text-xl font-bold text-black mb-2">Mascotas</h2>
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            + Nueva Mascota
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 mb-5">
        <p className="font-bold">Filtrar por estado:</p>
        <button className="bg-white text-black border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition">
          Publicadas
        </button>
      </div>
      <div className="overflow-x-auto">
  <table className="w-full table-auto border-collapse">
    <thead>
      <tr className="bg-gray-100 text-black border border-gray-300">
        <th className="px-3 py-2">Foto</th>
        <th className="px-3 py-2">Nombre</th>
        <th className="px-3 py-2">Edad</th>
        <th className="px-3 py-2">Sexo</th>
        <th className="px-3 py-2">Especie</th>
        <th className="px-3 py-2">Raza</th>
        <th className="px-3 py-2">Tamaño</th>
        <th className="px-3 py-2">Nivel Energía</th>
        <th className="px-3 py-2">Estado</th>
        <th className="px-3 py-2">Fecha Ingreso</th>
        <th className="px-3 py-2">Peso</th>
        <th className="px-3 py-2">Rasgos</th>
        <th className="px-3 py-2">Entrega</th>
        <th className="px-3 py-2">Historia</th>
        <th className="px-3 py-2">Opciones</th>
      </tr>
    </thead>
    <tbody>
  {pets.map((pet) => (
    <tr key={pet._id || pet.id} className="text-center border-t border-gray-200">
      <td className="px-3 py-2">
        <img
          src={
            pet.fotos?.[0]
              ? typeof pet.fotos[0] === "string"
                ? pet.fotos[0]
                : URL.createObjectURL(pet.fotos[0])
              : "https://via.placeholder.com/64"
          }
          alt={pet.nombre}
          className="w-16 h-16 object-cover rounded-full mx-auto"
        />
      </td>
      <td className="px-3 py-2">{pet.nombre}</td>
      <td className="px-3 py-2">{pet.edad}</td>
      <td className="px-3 py-2">{pet.sexo}</td>
      <td className="px-3 py-2">{pet.especie}</td>
      <td className="px-3 py-2">{pet.raza}</td>
      <td className="px-3 py-2">{pet.tamano}</td>
      <td className="px-3 py-2">{pet.nivelActividad}</td>
      <td className="px-3 py-2">{pet.estado}</td>
      <td className="px-3 py-2">{pet.fechaIngreso}</td>
      <td className="px-3 py-2">{pet.peso} kg</td>
      <td className="px-3 py-2">{pet.rasgos?.join(", ") || "-"}</td>
      <td className="px-3 py-2">{pet.entrega?.join(", ") || "-"}</td>
      <td className="px-3 py-2">{pet.historia || "-"}</td>
      <td className="px-3 py-2">
        <div className="flex justify-center gap-4 text-xl">
          <button
            onClick={() => handleSavePet(pet._id || pet.id)}
            className="text-black hover:text-red-700"
            title="Guardar"
          >
            <FaRegSave />
          </button>
          <button
            onClick={() => handleEdit(pet)}
            className="text-black hover:text-blue-700"
            title="Editar"
          >
            <FaPen />
          </button>
          <button
            onClick={() => handleDeletePet(pet._id || pet.id)}
            className="text-black hover:text-red-600"
            title="Eliminar"
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

      {/* <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-black border border-gray-300">
              <th className="px-3 py-2">Foto</th>
              <th className="px-3 py-2">Nombre</th>
              <th className="px-3 py-2">Edad</th>
              <th className="px-3 py-2">Sexo</th>
              <th className="px-3 py-2">Especie</th>
              <th className="px-3 py-2">Raza</th>
              <th className="px-3 py-2">Tamaño</th>
              <th className="px-3 py-2">Nivel Energía</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
  {pets.map((pet) => (
    <tr key={pet.id} className="text-center border-t border-gray-200">
      <td className="px-3 py-2">
        <img
          src={pet.photo?.[0] || "https://via.placeholder.com/64"}
          alt={pet.name}
          className="w-16 h-16 object-cover rounded-full mx-auto"
        />
      </td>
      <td className="px-3 py-2">{pet.name}</td>
      <td className="px-3 py-2">{pet.age}</td>
      <td className="px-3 py-2">{pet.sex || "-"}</td>
      <td className="px-3 py-2">{pet.species || "-"}</td>
      <td className="px-3 py-2">{pet.breed || "-"}</td>
      <td className="px-3 py-2">{pet.size || "-"}</td>
      <td className="px-3 py-2">{pet.energy || "-"}</td>
      <td className="px-3 py-2">{pet.status}</td>
      <td className="px-3 py-2">
        <div className="flex justify-center gap-4 text-xl">
          <button
            onClick={() => handleSavePet(pet.id)}
            className="text-black hover:text-red-700"
            title="Guardar"
          >
            <FaRegSave />
          </button>
          <button
            onClick={() => handleEdit(pet)}
            className="text-black hover:text-blue-700"
            title="Editar"
          >
            <FaPen />
          </button>
          <button
            onClick={() => handleDeletePet(pet.id)}
            className="text-black hover:text-red-600"
            title="Eliminar"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div> */}

      <PetFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

PetList.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string, // puede ser _id o id
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nombre: PropTypes.string.isRequired,
      edad: PropTypes.string,
      sexo: PropTypes.string,
      especie: PropTypes.string,
      raza: PropTypes.string,
      tamano: PropTypes.string,
      nivelActividad: PropTypes.string,
      estado: PropTypes.string,
      fechaIngreso: PropTypes.string,
      peso: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      rasgos: PropTypes.arrayOf(PropTypes.string),
      entrega: PropTypes.arrayOf(PropTypes.string),
      historia: PropTypes.string,
      fotos: PropTypes.array,
    })
  ).isRequired,
  setActiveView: PropTypes.func.isRequired,
  setEditingPet: PropTypes.func.isRequired,
  handleSavePet: PropTypes.func.isRequired,
  handleDeletePet: PropTypes.func.isRequired,
};


export default PetList;
