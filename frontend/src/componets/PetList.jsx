import { FaRegSave, FaPen } from "react-icons/fa";
import PropTypes from "prop-types";

// OPCIÓN DE MASCOTAS PERFIL ADMINISTRADOR
const PetList = ({ pets, setActiveView, setEditingPet, handleDeletePet, handleSavePet }) => {
  const handleEdit = (pet) => {
    setEditingPet(pet);
    setActiveView("editPet");
  };

  return (
    <div className="ms-5">
      <div className="flex justify-between w-full mt-10">
        <h2 className="text-xl font-bold text-black-400 mb-2 ">Mascotas</h2>

        <div className="mb-6">
          <button
            onClick={() => {
              console.log("Botón clickeado"); // Esta es la función flecha
              setActiveView("createPet");
            }}
            className="bg-white text-black border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            + Nueva Mascota
          </button>
        </div>
      </div>

      <div className="flex items-center gap-8 mb-5">
        <p className="font-bold">Filtrar mascotas por estado:</p>
        <button className="flex items-center gap-1 bg-white text-black border border-gray-400 px-8 py-2 rounded hover:bg-gray-100 transition cursor-pointer ">
          Publicadas
          <p className="text-xs">&#9660;</p>
        </button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-white-400 text-black border border-gray-400 bg-white-100">
            <th className="px-4 py-2 ">Foto</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Edad</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id} className="text-center">
              <td className="px-4 py-2">
                <img
                  src={pet.fotoUrl}
                  alt={pet.nombre}
                  className="w-16 h-16 object-cover rounded-full mx-auto"
                />
              </td>
              <td className="px-4 py-2">{pet.nombre}</td>
              <td className="px-4 py-2">{pet.edad}</td>
              <td className="px-4 py-2">{pet.estado}</td>
              <td className="px-4 py-2">
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
PetList.propTypes = {
  pets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      edad: PropTypes.string.isRequired,
      estado: PropTypes.string.isRequired,
      fotoUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  setActiveView: PropTypes.func.isRequired,
  setEditingPet: PropTypes.func.isRequired,
  handleDeletePet: PropTypes.func.isRequired,
};

export default PetList;
