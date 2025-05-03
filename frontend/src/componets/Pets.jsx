import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

//AL CREAR NUEVA MASCOTA CON EL FORMULARIO CON VALIDACIONES CLIC + NUEVA MASCOTA
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

const Pets = ({ setActiveView, setPets, editingPet }) => {
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

  const onSubmit = (data) => {
    const newPet = editingPet
      ? { ...editingPet, ...data }
      : { id: Date.now(), ...data };

    setPets((prev) => {
      return editingPet
        ? prev.map((p) => (p.id === editingPet.id ? newPet : p))
        : [...prev, newPet];
    });

    setActiveView("MASCOTAS");
  };

  return (
    <div>
      <h2>formulario</h2>
      <h2 className="text-3xl font-bold text-orange-400 mb-8">
        {editingPet ? "Editar Mascota" : "Crear Mascota"}
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", {
            required: "El nombre es requerido",
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "El nombre debe contener solo letras",
            },
          })}
          placeholder="Nombre"
          className="input"
        />
        {errors.name && <span>{errors.name.message}</span>}

        <select {...register("size", { required: true })} className="input">
          <option value="">Tamaño</option>
          {enumOptions.size.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <input
          type="date"
          {...register("birthDate", {
            required: "La fecha de nacimiento es requerida",
          })}
          className="input"
        />
        {errors.birthDate && <span>{errors.birthDate.message}</span>}

        <select {...register("sex", { required: true })} className="input">
          <option value="">Sexo</option>
          {enumOptions.sex.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <select {...register("age", { required: true })} className="input">
          <option value="">Edad</option>
          {enumOptions.age.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <select {...register("species", { required: true })} className="input">
          <option value="">Especie</option>
          {enumOptions.species.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <select {...register("energy", { required: true })} className="input">
          <option value="">Energía</option>
          {enumOptions.energy.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <input
          {...register("breed", {
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: "La raza debe contener solo letras",
            },
          })}
          placeholder="Raza"
          className="input"
        />
        {errors.breed && <span>{errors.breed.message}</span>}

        <input
          type="number"
          step="0.1"
          {...register("kg", {
            required: "El peso es requerido",
            min: { value: 0, message: "El peso no puede ser negativo" },
            max: { value: 100, message: "El peso no puede ser mayor a 100 kg" },
          })}
          placeholder="Peso (kg)"
          className="input"
        />
        {errors.kg && <span>{errors.kg.message}</span>}

        <label>
          <input
            type="checkbox"
            {...register("isVaccinated", { valueAsBoolean: true })}
          />{" "}
          Vacunado
        </label>
        <label>
          <input type="checkbox" {...register("isSterilized")} /> Esterilizado
        </label>
        <label>
          <input type="checkbox" {...register("isDewormed")} /> Desparasitado
        </label>
        <label>
          <input type="checkbox" {...register("hasMicrochip")} /> Microchip
        </label>

        <textarea
          {...register("story", {
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,!?()-]+$/,
              message: "La historia contiene caracteres inválidos",
            },
          })}
          placeholder="Historia"
          className="input"
        />
        {errors.story && <span>{errors.story.message}</span>}

        <div>
          <p>Características:</p>
          {enumOptions.traits.map((trait) => (
            <label key={trait}>
              <input
                type="checkbox"
                checked={traits.includes(trait)}
                onChange={() => handleTraitToggle(trait)}
              />{" "}
              {trait}
            </label>
          ))}
        </div>

        <input
          type="date"
          {...register("admissionDate", { required: true })}
          className="input"
        />

       {/*  <div>
          <p>Fotos:</p>
          {photos.map((url, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={url}
                onChange={(e) => {
                  const updated = [...photos];
                  updated[i] = e.target.value;
                  setValue("photo", updated);
                }}
                placeholder="URL de la foto"
                className="input"
              />
              <button type="button" onClick={() => removePhoto(i)}>
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={addPhoto}>
            Agregar Foto
          </button>
        </div> */}

        <select {...register("status", { required: true })} className="input">
          <option value="">Estado</option>
          {enumOptions.status.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <label>
          <input type="checkbox" {...register("isActive")} /> ¿Está activa?
        </label>

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
            onClick={() => setActiveView("MASCOTAS")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pets;