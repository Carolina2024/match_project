import { useState, useEffect } from "react";

const Pets = ({ setActiveView, setPets, editingPet }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    raza: "",
    edad: "",
    especie: "",
    tamano: "",
  });

  useEffect(() => {
    if (editingPet) {
      setFormData(editingPet);
    }
  }, [editingPet]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingPet) {
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === editingPet.id ? { ...editingPet, ...formData } : pet
        )
      );
    } else {
      const newPet = {
        id: Date.now(), // id falso
        ...formData,
      };
      setPets((prev) => [...prev, newPet]);
    }

    setActiveView("listPets");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-orange-400 mb-8">
        {editingPet ? "Editar Mascota" : "Crear Mascota"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          name="raza"
          placeholder="Raza"
          value={formData.raza}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Selecciona edad</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Adulto">Adulto</option>
          <option value="Senior">Senior</option>
        </select>
        <select
          name="especie"
          value={formData.especie}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Selecciona especie</option>
          <option value="Perro">Perro</option>
          <option value="Gato">Gato</option>
          <option value="Otro">Otro</option>
        </select>
        <select
          name="tamano"
          value={formData.tamano}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Selecciona tamaño</option>
          <option value="Pequeño">Pequeño</option>
          <option value="Mediano">Mediano</option>
          <option value="Grande">Grande</option>
        </select>
        <div className="flex justify-center space-x-4 pt-6">
          <button
            type="submit"
            className="bg-orange-400 text-white px-6 py-3 rounded hover:bg-orange-500 cursor-pointer"
          >
            {editingPet ? "Guardar Cambios" : "Crear Mascota"}
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => setActiveView(null)} // <-- esto oculta todo
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pets;
