import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createPet, updatePet } from "../api/petService";

const enumOptions = {
  species: ["Perro", "Gato"],
  age: ["Cachorro", "Joven", "Adulto", "Adulto Mayor"],
  sex: ["Macho", "Hembra"],
  energy: ["Muy Activo", "Moderado", "Tranquilo"],
  size: ["Pequeño", "Mediano", "Grande", "Extra Grande"],
  status: ["Disponible", "En Proceso", "Adoptado"],
  traits: [
    "Cariñoso",
    "Independiente",
    "Juguetón",
    "Protector",
    "Amigable con niños",
    "Amigable con otras mascotas",
    "Me gusta pasear",
  ],
  delivery: ["Desparasitado", "Con chip", "Vacunado", "Esterilizado"],
};

const Pets = ({ setActiveView, addPet, editingPet }) => {
  const deliveryArray = [];
  if (editingPet) {
    if (editingPet.isVaccinated) deliveryArray.push("Vacunado");
    if (editingPet.isSterilized) deliveryArray.push("Esterilizado");
    if (editingPet.isDewormed) deliveryArray.push("Desparasitado");
    if (editingPet.hasMicrochip) deliveryArray.push("Con chip");
  }

  const initialFormState = {
    name: editingPet ? editingPet.name : "",
    admissionDate: editingPet ? editingPet.admissionDate : "",
    species: editingPet ? editingPet.species : "",
    breed: editingPet ? editingPet.breed : "",
    age: editingPet ? editingPet.age : "",
    sex: editingPet ? editingPet.sex : "",
    energy: editingPet ? editingPet.energy : "",
    kg: editingPet ? editingPet.kg : "",
    size: editingPet ? editingPet.size : "",
    status: editingPet ? editingPet.status : "",
    traits: editingPet ? editingPet.traits : [],
    delivery: editingPet ? deliveryArray : [],
    story: editingPet ? editingPet.story : "",
    photos: [null, null, null],
    photoUrls: editingPet ? editingPet.photoUrls : [],
  };

  console.log(editingPet);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialFormState });

  const traits = watch("traits");
  const delivery = watch("delivery");
  const photos = watch("photos");
  const photoUrls = watch("photoUrls");

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

    const previewUrls = [...photoUrls];
    previewUrls[index] = URL.createObjectURL(file);
    setValue("photoUrls", previewUrls);
  };

  const onSubmit = async (data) => {
    try {
      if (editingPet) {
        await updatePet(editingPet.id, data);
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "success",
          title: "Mascota Actualizada",
          text: `${data.name} ha sido actualizada correctamente.`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#e6f9e6",
          color: "#2e7d32",
        });
      } else {
        const newPet = await createPet(data);
        addPet(newPet);

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
      }

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

  const handleDeletePhoto = (url) => {
    const indexToRemove = photoUrls.findIndex((photo) => photo === url);
    if (indexToRemove !== -1) {
      const newPhotoUrls = [...photoUrls];
      const newPhotos = [...photos];
      newPhotoUrls[indexToRemove] = null;
      newPhotos[indexToRemove] = null;

      setValue("photoUrls", newPhotoUrls);
      setValue("photos", newPhotos);
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setActiveView("Mascotas")}
      />

      <div
        className={`relative w-full max-w-lg bg-white h-full shadow-xl z-50 p-8 overflow-y-auto rounded-xl transform transition-transform duration-700 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setActiveView("Mascotas")}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold z-50"
        >
          x
        </button>

        <h2 className="text-center text-2xl font-bold mb-4">
          {editingPet ? "Editar Mascota" : "Nueva Mascota"}
        </h2>

        <p className="text-center text-sm mb-6">
          {editingPet
            ? "Completa el formulario para actualizar los datos de esta mascota"
            : "Completa el formulario para agregar una mascota al refugio."}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Nombre</label>
              <input
                {...register("name", { required: "El nombre es obligatorio" })}
                placeholder="Nombre de la mascota"
                className="border p-2 rounded w-full placeholder-gray-400"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">
                Fecha de ingreso
              </label>
              <input
                type="date"
                {...register("admissionDate", {
                  required: "La fecha de ingreso es requerida",
                })}
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
                {...register("species", {
                  required: "La especie es obligatoria",
                })}
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
              <label htmlFor="breed" className="text-sm font-medium mb-1">
                Raza
              </label>
              <input
                {...register("breed", { required: true })}
                id="breed"
                placeholder="Raza de la mascota"
                className="border p-2 rounded w-full placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="age" className="text-sm font-medium mb-1">
                Edad
              </label>
              <select
                {...register("age", { required: true })}
                id="age"
                className="border p-2 rounded w-full text-gray-600"
              >
                <option value="">Elegir edad</option>
                {enumOptions.age.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="sex" className="text-sm font-medium mb-1">
                Sexo
              </label>
              <select
                {...register("sex", { required: true })}
                id="sex"
                className="border p-2 rounded w-full text-gray-600"
              >
                <option value="">Elegir sexo</option>
                {enumOptions.sex.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="energy" className="text-sm font-medium mb-1">
                Nivel de actividad
              </label>
              <select
                {...register("energy", { required: true })}
                id="energy"
                className="border p-2 rounded w-full text-gray-600"
              >
                <option value="">Elegir nivel</option>
                {enumOptions.energy.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="kg" className="text-sm font-medium mb-1">
                Peso
              </label>
              <input
                {...register("kg", { required: true })}
                id="kg"
                type="number"
                step="0.1"
                placeholder="Añadir peso"
                className="border p-2 rounded w-full placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="size" className="text-sm font-medium mb-1">
                Tamaño
              </label>
              <select
                {...register("size", { required: true })}
                id="size"
                className="border p-2 rounded w-full text-gray-600"
              >
                <option value="">Elegir tamaño</option>
                {enumOptions.size.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium mb-1">
                Estado
              </label>
              <select
                {...register("status", { required: true })}
                id="status"
                className="border p-2 rounded w-full text-gray-600"
              >
                <option value="">Elegir estado</option>
                {enumOptions.status.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
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
                  className={`w-full text-left px-4 py-2 rounded border ${
                    traits.includes(trait)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
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
                  className={`w-full text-left px-4 py-2 rounded border ${
                    delivery.includes(item)
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">
              Historia:
            </label>
            <textarea
              {...register("story")}
              rows="4"
              className="border p-2 rounded w-full"
              placeholder="Escribe la historia de la mascota"
            ></textarea>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Agregar 3 fotos:</p>
            <div className="grid grid-cols-3 gap-4">
              {photos.map((_, index) => (
                <label
                  key={index}
                  className="relative border border-gray-300 rounded-2xl cursor-pointer h-32 flex items-center justify-center overflow-hidden hover:bg-gray-100 transition"
                >
                  {photoUrls[index] ? (
                    <>
                      <img
                        src={photoUrls[index]}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeletePhoto(photoUrls[index]);
                        }}
                        className="absolute top-1 right-1 bg-white text-gray-700 rounded-[20px] text-sm w-6 h-6 flex items-center justify-center shadow hover:bg-gray-600 hover:text-white"
                        title="Eliminar imagen"
                      >
                        X
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400">Subir foto</span>
                  )}

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
          <div></div>

          <div className="bg-white pt-4 pb-6 mt-6 border-t border-gray-200 sticky bottom-[-30px]">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setActiveView("Mascotas")}
                className="px-6 py-2 border bg-[#EFEFEF] rounded hover:bg-gray-300 cursor-pointer font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-white rounded bg-[#f4a470] hover:bg-orange-500 transition-colors duration-300 cursor-pointer font-semibold"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Pets.propTypes = {
  setActiveView: PropTypes.func.isRequired,
  addPet: PropTypes.func.isRequired,
  editingPet: PropTypes.object.isRequired,
};

export default Pets;
