import { useState, useEffect } from "react";

const Pets = ({ setActiveView, setPets, editingPet }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    estado: "",
    fotoUrl: "", 
  });
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, fotoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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
        id: Date.now(),
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
        
        <div className="mb-4">
  <label className="block mb-2 font-medium">Foto de la mascota</label>

  <div className="relative w-fit">
    <input
      id="foto"
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
    <label
      htmlFor="foto"
      className="cursor-pointer bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition"
    >
      Seleccionar archivo
    </label>
  </div>

  {formData.fotoUrl && (
    <img
      src={formData.fotoUrl}
      alt="Vista previa"
      className="mt-4 w-32 h-32 object-cover rounded border"
    />
  )}
</div>



        
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
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
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Selecciona estado</option>
          <option value="Disponible">Disponible</option>
          <option value="Perdido">Perdido</option>
          <option value="Adoptado">Adoptado</option>
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
            onClick={() => setActiveView(null)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pets;
