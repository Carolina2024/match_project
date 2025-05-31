import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createPet, updatePet } from "../api/petService";
import { FiCalendar } from "react-icons/fi";
import { FiX } from "react-icons/fi";

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
          icon: "null",
          title: "Mascota Actualizada",
          text: `${data.name} ha sido actualizada exitosamente en el registro.`,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 0,
          timerProgressBar: true,
          background: "#FFEADD",
          width: "500px",
          customClass: {
            popup: "toast-sm-height",
            title: "toast-title-color",
            content: "toast-text-color",
          },
        });
      } else {
        const newPet = await createPet(data);
        addPet(newPet);

        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "null",
          title: "Mascota agregada",
          text: `${data.name} ha sido agregado exitosamente en el registro.`,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 0,
          timerProgressBar: true,
          background: "#E8FFDD",
          width: "500px",
          customClass: {
            popup: "toast-sm-height",
            title: "custom-title",
            content: "custom-text",
          },
        });
      }

      setActiveView("Mascotas");
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
        className="fixed inset-0 bg-[#00000026] backdrop-blur-[3px]"
        onClick={() => setActiveView("Mascotas")}
      />

      <div
        className={`relative w-full max-w-lg bg-white h-full shadow-xl z-50 p-8 overflow-y-auto rounded-xl transform transition-transform duration-700 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setActiveView("Mascotas")}
          className="absolute top-4 right-4 cursor-pointer text-tertiary hover:text-black  font-bold z-50"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-center font-secundary text-[20px] text-tertiary font-bold mb-4">
          {editingPet ? "Editar mascota" : "Nueva mascota"}
        </h2>

        <p className="text-center mb-6 font-raleway text-[14px] text-[#767575CC]">
          {editingPet
            ? "Actualiza los datos de la mascota en el refugio"
            : "Completa el formulario para agregar una nueva mascota al refugio."}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-raleway text-[16px] text-tertiary font-medium mb-1">
                Mascota
              </label>
              <input
                {...register("name", { required: "El nombre es obligatorio" })}
                placeholder="Nombre de la mascota"
                className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="font-raleway text-[16px] text-tertiary font-medium mb-1">
                Fecha de ingreso
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  {...register("admissionDate", {
                    required: "La fecha de ingreso es requerida",
                  })}
                  className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal pr-10"
                />
                <FiCalendar
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#767575]"
                  size={20}
                />
              </div>
              {errors.admissionDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.admissionDate.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="font-raleway text-[16px] text-tertiary font-medium mb-1">
                Especie
              </label>
              <select
                {...register("species", {
                  required: "La especie es obligatoria",
                })}
                className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
              >
                <option value="">Elegir especie</option>
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
              <label
                htmlFor="breed"
                className="font-raleway text-[16px] text-tertiary font-medium mb-1"
              >
                Raza
              </label>
              <input
                {...register("breed", { required: true })}
                id="breed"
                placeholder="Raza de la mascota"
                className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="age"
                className="font-raleway text-[16px] text-tertiary font-medium mb-1"
              >
                Edad
              </label>
              <select
                {...register("age", { required: true })}
                id="age"
                className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
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
              <label
                htmlFor="sex"
                className="font-raleway text-[16px] text-tertiary font-medium mb-1"
              >
                Sexo
              </label>
              <select
                {...register("sex", { required: true })}
                id="sex"
                className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
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
              <label
                htmlFor="energy"
                className="font-raleway text-[16px] text-tertiary font-medium mb-1"
              >
                Nivel de actividad
              </label>
              <select
                {...register("energy", { required: true })}
                id="energy"
                className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
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
              <label
                htmlFor="kg"
                className="font-raleway text-[16px] text-tertiary font-medium mb-1"
              >
                Peso
              </label>
              <input
                {...register("kg", { required: true })}
                id="kg"
                type="number"
                step="0.1"
                placeholder="Añadir peso"
                className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="size"
                className="font-raleway text-[16px] text-tertiary font-medium mb-1"
              >
                Tamaño
              </label>
              <select
                {...register("size", { required: true })}
                id="size"
                className="border p-2 text-[14px] rounded-[10px] w-full font-raleway text-[#767575] font-normal"
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
              <label
                htmlFor="status"
                className=" font-raleway text-[16px] text-tertiary font-medium mb-1"
              >
                Estado
              </label>
              <select
                {...register("status", { required: true })}
                id="status"
                className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
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
            <p className="font-raleway text-[16px] text-tertiary font-medium mb-2">
              Rasgos de la mascota
              <span
                style={{ marginLeft: "8px", color: "rgba(89, 81, 70, 0.5)" }}
              >
                (Elegir varias opciones)
              </span>
            </p>

            <div className="grid grid-cols-2 gap-2">
              {enumOptions.traits.map((trait) => (
                <button
                  key={trait}
                  type="button"
                  onClick={() => toggleCheckbox("traits", trait)}
                  className={`w-full text-left px-4 py-2 rounded-[10px] border font-raleway text-[14px] text-[#767575] font-normal ${
                    traits.includes(trait)
                      ? "bg-[#FAAA75] text-[#FFFFFF]"
                      : "bg-[#FFFFFF] text-[#767575]"
                  }`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-raleway text-[16px] text-tertiary font-medium mb-2">
              Entrega de la mascota
              <span
                style={{ marginLeft: "8px", color: "rgba(89, 81, 70, 0.5)" }}
              >
                (Elegir varias opciones)
              </span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {enumOptions.delivery.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleCheckbox("delivery", item)}
                  className={`w-full text-left px-4 py-2 rounded-[10px] border font-raleway text-[14px] text-[#767575] font-normal ${
                    delivery.includes(item)
                      ? "bg-[#FAAA75] text-[#FFFFFF]"
                      : "bg-[#FFFFFF] text-[#767575]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-raleway text-[16px] text-tertiary font-medium mb-2 block">
              Historia de la mascota
            </label>
            <textarea
              {...register("story")}
              rows="4"
              className="border p-2 rounded-[10px] w-full font-raleway text-[14px] text-[#767575] font-normal"
              placeholder="Thor llegó al refugio en una tarde lluviosa, con la mirada cansada pero el corazón lleno de esperanza. Durante semanas, evitaba el contacto y se escondía en un rincón, pero poco a poco, con cariño y paciencia, fue recuperando la confianza en las personas."
            ></textarea>
          </div>

          <div>
            <p className="font-raleway text-[16px] text-tertiary font-medium mb-2">
              Agregar 3 fotos de la mascota
            </p>
            <div className="grid grid-cols-3 gap-4">
              {photos.map((_, index) => (
                <label
                  key={index}
                  className="text-[12px] relative border rounded-[10px] border-[#76757599] cursor-pointer h-24 flex items-center justify-center overflow-hidden hover:bg-gray-100 transition"
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
                        className="absolute top-1 cursor-pointer right-1 bg-[#FFFFFF] text-tertiary rounded-[20px] text-sm w-6 h-6 flex items-center justify-center shadow hover:bg-tertiary hover:text-white"
                        title="Eliminar imagen"
                      >
                        X
                      </button>
                    </>
                  ) : (
                    <span className="font-raleway text-[14px] text-[#767575] font-normal">
                      Subir foto
                    </span>
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

          <div className="bg-[#FFFFFF] pt-4 pb-6 mt-6 border-t border-gray-200 sticky bottom-[-30px]">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setActiveView("Mascotas")}
                className="font-raleway font-bold text-[16px] text-tertiary px-6 py-2 border-2 bg-[#FFFFFF] rounded-[10px] hover:bg-gray-300 cursor-pointer shadow-[0_3px_4px_0_#59514680]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="font-raleway text-[16px] shadow-lg text-[#FFFFFF] font-bold px-6 py-2 rounded-[10px] bg-[#FAAA75] hover:bg-[#e78b52]  transition-colors duration-300 cursor-pointer"
              >
                {editingPet ? "Editar" : "Guardar"}
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
  editingPet: PropTypes.object,
};

export default Pets;
