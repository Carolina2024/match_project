const PetList = ({ pets, setActiveView, setEditingPet }) => {
  const handleEdit = (pet) => {
    setEditingPet(pet);
    setActiveView("editPet");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-orange-400 mb-8">
        Listado de Mascotas
      </h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-orange-400 text-white">
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Raza</th>
            <th className="border px-4 py-2">Edad</th>
            <th className="border px-4 py-2">Especie</th>
            <th className="border px-4 py-2">Tamaño</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id} className="text-center">
              <td className="border px-4 py-2">{pet.nombre}</td>
              <td className="border px-4 py-2">{pet.raza}</td>
              <td className="border px-4 py-2">{pet.edad}</td>
              <td className="border px-4 py-2">{pet.especie}</td>
              <td className="border px-4 py-2">{pet.tamano}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(pet)}
                  className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetList;
