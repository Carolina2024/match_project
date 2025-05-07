import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createPet } from "../api/petService";


const initialFormState = {
  name: "",
  admissionDate: "",
  species: "",
  breed: "",
  age: "",
  sex: "",
  energy: "",
  kg: "",
  size: "",
  status: "",
  traits: [],
  delivery: [],
  story: "",
  photos: [null],// no es url
};

const enumOptions = {
  species: ["Perro", "Gato"],
  age: ["Cachorro", "Joven", "Adulto", "Adulto Mayor"],
  sex: ["Macho", "Hembra"],
  energy: ["Muy Activo", "Moderado", "Tranquilo"],
  size: ["Pequeño", "Mediano", "Grande", "Extra Grande"],
  status: ["Disponible", "En proceso", "Adoptada"],
  traits: [
    "Cariñoso", "Independiente", "Juguetón", "Protector",
    "Amigable con niños", "Amigable con otras mascotas", "Me gusta pasear"

  ],
  delivery: ["Desparasitado", "Con chip", "Vacunando", "Esterilizado"]
};

const Pets = ({ setActiveView, addPet}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    // reset,
    formState: { errors },
  } = useForm({ defaultValues: initialFormState });

  const traits = watch("traits");
  const delivery = watch("delivery");
  const photos = watch("photos");

  // useEffect(() => {
  //   reset(initialFormState);
  // }, [reset]);

  const toggleCheckbox = (field, value) => {
    const current = watch(field);
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue(field, updated);
  };

  const handleFileChange = (index, file) => {
    const updated = [...photos];
    updated[index] = file;
    setValue("photos", updated);
  };

  const onSubmit = async (data) => {
    try {
      // data.photos = data.photos;
      // const formData = new FormData();
  
      // ... tus formData.append(...) existentes
  
      const newPet = await createPet(data);
      addPet(newPet); // ⬅️ Aquí actualizas la tabla directamåente
  
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "Mascota agregada",
        text: `${data.name} ha sido registrada correctamente.`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#e6f9e6",
        color: "#2e7d32",
      });
  
      setActiveView("MASCOTAS");
    } catch (error) {
      console.error(error);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "Error al guardar",
        text: "No se pudo registrar la mascota.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#ffeaea",
        color: "#b00020",
      });
    }
  };
  




  const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  // Lanza la animación al montar el componente
  const timeout = setTimeout(() => setIsVisible(true), 50);
  return () => clearTimeout(timeout);
}, []);


  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setActiveView('MASCOTAS')} />
      <div className={`relative w-full max-w-lg bg-white h-full shadow-xl z-50 p-8 overflow-y-auto rounded-xl transform transition-transform duration-700 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
  
      <h2 className="text-center text-2xl font-bold mb-4">Nueva Mascota</h2>
      <p className="text-center text-sm mb-6">Completa el formulario para agregar una mascota al refugio.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col">
  <label className="text-sm font-semibold mb-1">Nombre</label>
  <input
    {...register("name", { required: "El nombre es obligatorio" })}
    placeholder="Nombre de la mascota"
    className="border p-2 rounded w-full placeholder-gray-400"
  />
  {errors.name && (
    <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
  )}
</div>

<div className="flex flex-col">
  <label className="text-sm font-semibold mb-1">Fecha de ingreso</label>
  <input
    type="date"
    {...register("admissionDate", { required: "La fecha de ingreso es requerida" })}
    className="border p-2 rounded w-full"
  />
  {errors.admissionDate && (
    <span className="text-red-500 text-sm mt-1">
      {errors.admissionDate.message}
    </span>
  )}
</div>

<div className="flex flex-col">
  <label className="text-sm font-semibold mb-1">Especie</label>
  <select
    {...register("species", { required: "La especie es obligatoria" })}
    className="border p-2 rounded w-full"
  >
    <option value="">Selecciona especie</option>
    <option value="Perro">Perro</option>
    <option value="Gato">Gato</option>
  </select>
  {errors.species && (
    <span className="text-red-500 text-sm mt-1">
      {errors.species.message}
    </span>
  )}
</div>


  <div className="flex flex-col">
    <label htmlFor="breed" className="text-sm font-medium mb-1">Raza</label>
    <input {...register("breed", { required: true })} id="breed" placeholder="Raza de la mascota" className="border p-2 rounded w-full placeholder:text-gray-400" />
  </div>

  <div className="flex flex-col">
    <label htmlFor="age" className="text-sm font-medium mb-1">Edad</label>
    <select {...register("age", { required: true })} id="age" className="border p-2 rounded w-full text-gray-600">
      <option value="">Elegir edad</option>
      {enumOptions.age.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>

  <div className="flex flex-col">
    <label htmlFor="sex" className="text-sm font-medium mb-1">Sexo</label>
    <select {...register("sex", { required: true })} id="sex" className="border p-2 rounded w-full text-gray-600">
      <option value="">Elegir sexo</option>
      {enumOptions.sex.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>

  <div className="flex flex-col">
    <label htmlFor="energy" className="text-sm font-medium mb-1">Nivel de actividad</label>
    <select {...register("energy", { required: true })} id="energy" className="border p-2 rounded w-full text-gray-600">
      <option value="">Elegir nivel</option>
      {enumOptions.energy.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>

  <div className="flex flex-col">
    <label htmlFor="kg" className="text-sm font-medium mb-1">Peso</label>
    <input {...register("kg", { required: true })} id="kg" type="number" step="0.1" placeholder="Añadir peso" className="border p-2 rounded w-full placeholder:text-gray-400" />
  </div>

  <div className="flex flex-col">
    <label htmlFor="size" className="text-sm font-medium mb-1">Tamaño</label>
    <select {...register("size", { required: true })} id="size" className="border p-2 rounded w-full text-gray-600">
      <option value="">Elegir tamaño</option>
      {enumOptions.size.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>

  <div className="flex flex-col">
    <label htmlFor="status" className="text-sm font-medium mb-1">Estado</label>
    <select {...register("status", { required: true })} id="status" className="border p-2 rounded w-full text-gray-600">
      <option value="">Elegir estado</option>
      {enumOptions.status.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
</div>


        <div>
          <p className="text-sm font-semibold mb-2">Rasgos:</p>
          <div className="grid grid-cols-2 gap-2">
            {enumOptions.traits.map((trait) => (
              <button
                key={trait}
                type="button"
                onClick={() => toggleCheckbox("traits", trait)}
                className={`w-full text-left px-4 py-2 rounded border ${traits.includes(trait) ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {trait}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Entrega:</p>
          <div className="grid grid-cols-2 gap-2">
            {enumOptions.delivery.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleCheckbox("delivery", item)}
                className={`w-full text-left px-4 py-2 rounded border ${delivery.includes(item) ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold mb-2 block">Historia:</label>
          <textarea {...register("story")} rows="4" className="border p-2 rounded w-full" placeholder="Escribe la historia de la mascota"></textarea>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Agregar 3 fotos:</p>
          <div className="grid grid-cols-3 gap-4">
            {photos.map((_, index) => (
              <label key={index} className="border p-4 text-center rounded cursor-pointer hover:bg-gray-100">
                Subir foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6">
          <button  type="button" onClick={() => setActiveView("MASCOTAS")}
           className="px-6 py-2 border bg-[#EFEFEF] rounded hover:bg-gray-300 cursor-pointer"
           >
            Cancelar
           </button>
           <button
            type="submit"
            className="px-6 py-2 text-white rounded bg-[#f4a470] hover:bg-orange-500 transition-colors duration-300 cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};


Pets.propTypes = {
  setActiveView: PropTypes.func.isRequired,
  addPet: PropTypes.func.isRequired,
};

export default Pets;
