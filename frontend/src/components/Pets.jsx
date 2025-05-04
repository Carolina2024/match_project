import { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { createPet, getAllPets } from "../api/petService";



const initialFormState = {
  name: "",
  size: "",
  birthDate: "",
  sex: "",
  age: "",
  species: "",
  energy: "",
  breed: "",
  kg: "",
  isVaccinated: false,
  isSterilized: false,
  isDewormed: false,
  hasMicrochip: false,
  story: "",
  traits: [],
  admissionDate: "",
  photo: [""],
  status: "",
  isActive: true,
};

const enumOptions = {
  size: ["Pequeño", "Mediano", "Grande"],
  sex: ["Macho", "Hembra"],
  age: ["Cachorro", "Joven", "Adulto", "Adulto Mayor"],
  species: ["Perro", "Gato"],
  energy: ["Tranquilo", "Moderado", "Muy Activo"],
  traits: [
    "Cariñoso",
    "Independiente",
    "Juguetón",
    "Protector",
    "Amigable con niños",
    "Amigable con otras mascotas",
    "Me gusta pasear",
    "Me gustan los espacios abiertos",
  ],
  status: ["Disponible", "Adoptada", "En Proceso"],
};

const Pets = ({ setActiveView, setPets, editingPet, addPet }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialFormState });

  const traits = watch("traits");
  const photos = watch("photo");

  useEffect(() => {
    if (editingPet) {
      reset({
        ...editingPet,
        traits: editingPet.traits || [],
        photo: editingPet.photo || [""],
      });
    } else {
      reset(initialFormState);
    }
  }, [editingPet, reset]);

  const addPhoto = () => {
    setValue("photo", [...photos, ""]);
  };

  const removePhoto = (index) => {
    const updated = [...photos];
    updated.splice(index, 1);
    setValue("photo", updated);
  };

  const handleTraitToggle = (trait) => {
    const updated = traits.includes(trait)
      ? traits.filter((t) => t !== trait)
      : [...traits, trait];
    setValue("traits", updated);
  };

 

  const onSubmit = async (data) => {
    try {
      if (editingPet) {
        console.warn("Edición aún no implementada.");
      } else {
        await createPet(data); // crea en backend
        const updatedList = await getAllPets(); // vuelve a traer la lista
        setPets(updatedList.items); // actualiza el estado
      }
  
      setActiveView("MASCOTAS");
    } catch (error) {
      console.error("Error al guardar mascota:", error.message);
      alert("Ocurrió un error al guardar la mascota.");
    }
  };
  
  
  
    // if (editingPet) {
    //   setPets((prev) =>
    //     prev.map((p) => (p.id === editingPet.id ? newPet : p))
    //   );
    // } else {
    //   addPet(newPet); // importante para que aparezca en AdminPanel
    // }



  return (
    <div>
      <h2 className="text-3xl font-bold text-orange-400 mb-8">
        {editingPet ? "Editar Mascota" : "Crear Mascota"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: "El nombre es requerido" })} placeholder="Nombre" className="input" />
        {errors.name && <span>{errors.name.message}</span>}

        <select {...register("size", { required: true })} className="input">
          <option value="">Tamaño</option>
          {enumOptions.size.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <input type="date" {...register("birthDate", { required: true })} className="input" />
        <select {...register("sex", { required: true })} className="input">
          <option value="">Sexo</option>
          {enumOptions.sex.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select {...register("age", { required: true })} className="input">
          <option value="">Edad</option>
          {enumOptions.age.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select {...register("species", { required: true })} className="input">
          <option value="">Especie</option>
          {enumOptions.species.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select {...register("energy", { required: true })} className="input">
          <option value="">Nivel de energía</option>
          {enumOptions.energy.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <input {...register("breed")} placeholder="Raza" className="input" />
        <input type="number" step="0.1" {...register("kg", { required: true })} placeholder="Peso (kg)" className="input" />

        <label><input type="checkbox" {...register("isVaccinated")} /> Vacunado</label>
        <label><input type="checkbox" {...register("isSterilized")} /> Esterilizado</label>
        <label><input type="checkbox" {...register("isDewormed")} /> Desparasitado</label>
        <label><input type="checkbox" {...register("hasMicrochip")} /> Microchip</label>

        <textarea {...register("story")} placeholder="Historia" className="input" />
        <div>
          <p>Características:</p>
          {enumOptions.traits.map((trait) => (
            <label key={trait}>
              <input type="checkbox" checked={traits.includes(trait)} onChange={() => handleTraitToggle(trait)} />
              {trait}
            </label>
          ))}
        </div>

        <input type="date" {...register("admissionDate", { required: true })} className="input" />

        <div>
          <p>Fotos:</p>
          {photos.map((url, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input value={url} onChange={(e) => {
                const updated = [...photos];
                updated[i] = e.target.value;
                setValue("photo", updated);
              }} className="input" placeholder="URL de la foto" />
              <button type="button" onClick={() => removePhoto(i)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={addPhoto}>Agregar Foto</button>
        </div>

        <select {...register("status", { required: true })} className="input">
          <option value="">Estado</option>
          {enumOptions.status.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <label><input type="checkbox" {...register("isActive")} /> ¿Está activa?</label>

        <div className="flex justify-center space-x-4 pt-6">
          <button type="submit" className="bg-orange-400 text-white px-6 py-3 rounded hover:bg-orange-500 cursor-pointer">
            {editingPet ? "Guardar Cambios" : "Crear Mascota"}
          </button>
          <button type="button" className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400 cursor-pointer" onClick={() => setActiveView("MASCOTAS")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

Pets.propTypes = {
  setActiveView: PropTypes.func.isRequired,
  setPets: PropTypes.func.isRequired,
  editingPet: PropTypes.object,
  addPet: PropTypes.func.isRequired,
};

export default Pets;
