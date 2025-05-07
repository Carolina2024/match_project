import PropTypes from "prop-types";
import { FaPen, FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


const PetList = ({ pets, setActiveView, setEditingPet, handleSavePet, handleDeletePet }) => {
  const handleEdit = (pet) => {
    setEditingPet(pet);
    setActiveView("editPet");
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      "Disponible": "bg-green-100 text-green-700",
      "En proceso": "bg-yellow-100 text-yellow-700",
      "Adoptada": "bg-gray-100 text-gray-700",
    };
    return <span className={`px-2 py-1 rounded text-sm font-medium ${statusStyles[status] || "bg-gray-100 text-gray-600"}`}>{status}</span>;
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
            <tr className="bg-gray-100 text-gray-700 text-sm">
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
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={pet.photoUrls?.[0] || "https://via.placeholder.com/64"}
                    alt={pet.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
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
                      onClick={() => handleSavePet(pet.id || pet._id)}
                      title="Visualizar"
                      className="hover:text-green-600"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(pet)}
                      title="Editar"
                      className="hover:text-blue-600"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDeletePet(pet.id || pet._id)}
                      title="Eliminar"
                      className="hover:text-red-600"
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
    </div>
  );
};

PetList.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      age: PropTypes.string,
      sex: PropTypes.string,
      species: PropTypes.string,
      breed: PropTypes.string,
      size: PropTypes.string,
      energy: PropTypes.string,
      status: PropTypes.string,
      admissionDate: PropTypes.string,
      kg: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      traits: PropTypes.arrayOf(PropTypes.string),
      delivery: PropTypes.arrayOf(PropTypes.string),
      story: PropTypes.string,
      photoUrls: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  setActiveView: PropTypes.func.isRequired,
  setEditingPet: PropTypes.func.isRequired,
  handleSavePet: PropTypes.func.isRequired,
  handleDeletePet: PropTypes.func.isRequired,
};

export default PetList;
