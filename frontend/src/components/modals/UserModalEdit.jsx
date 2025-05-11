import { useEffect } from "react";
import { getUserById } from "../../api/editProfileApi";
import { useForm, Controller, useController } from "react-hook-form";

const initialFormState = {
  fullname: "John Doe",
  email: "john@example.com",
  password: "pass123**",
  birthDate: "1998-09-21",
  phoneNumber: "+56123456789",
  identityDocument: "12345678-9",
  address: "Calle 12, Departamento 4, Comuna San Miguel, Región Metropolitana",
  homeType: "Departamento grande",
  allowsPet: true,
  hadPets: true,
  hadPetsVaccinated: true,
  hadPetsCastrated: true,
  hoursAlone: 3,
  petDestroy: "Lo educaré para que no vuelva a repetir esa acción",
  preparedToVisitVeterinarian: true,
  allowsVisit: true,
  isResponsibleAdoption: true,
  userPreferenceEnergy: "Moderado",
  userPreferenceTraits: ["Cariñoso", "Juguetón"],
  userPreferenceDogs: true,
  userPreferenceCats: true,
  userPreferenceChildren: true,
};

function UserModalEdit() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    // reset,
    formState: { errors },
  } = useForm({ defaultValues: initialFormState });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById();

        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        console.log("Usuario:", data);

        setUserName(data.fullname || data.email); // Ajusta según lo que te devuelva
      } catch (error) {
        console.error("Error obteniendo nombre:", error.message);
      }
    };

    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data);
      alert("Perfil actualizado con éxito");
    } catch (error) {
      alert("Hubo un error al actualizar el perfil");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-md flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center text-primary mb-2">
          Mi Perfil
        </h1>
        <p className="text-center text-[16px] mb-6">
          Modifica tus datos personales para mantener tu cuenta al día
        </p>
      </div>

      <form
        className="flex flex-col gap-10 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
       <div className="flex flex-col gap-5">
         <div className="flex flex-col sm:flex-row gap-40 ">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="text-xs ml-3">Nombre y Apellido</span>
              <input
                name="fullname"
                className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                placeholder="María Alvarado"
                {...register("fullname")}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs ml-3">Correo Electrónico</span>
              <input
                className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                placeholder="maria@gmail.com"
                type="email"
                name="email"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs ml-3">Telefono</span>
              <input
                className="border rounded-full text-xs p-2 w-70 items-center border-primary outline-none"
                placeholder="ch +56 9 12345678"
                name="phoneNumber"
                {...register("phoneNumber")}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="text-xs ml-3">Fecha de nacimiento</span>
              <input
                className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                placeholder="Fecha de nacimiento"
                type="date"
                name="birthDate"
                {...register("birthDate")}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs ml-3">Contraseña</span>
              <input
                className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                placeholder="Contraseña"
                type="password"
                name="password"
                {...register("password")}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs ml-3">Documento de identidad</span>
              <input
                className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                placeholder="Documento de identidad"
                name="identityDocument"
                {...register("identityDocument")}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="left flex flex-col gap-5">
            <div className="flex flex-col">
              <span className="text-xs ml-3">Dirección y comuna</span>
              <input
                className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                placeholder="Dirección y comuna"
                name="address"
                {...register("address")}
              />
            </div>
            <div className="">
              <label className="flex flex-col font-semibold text-[14px]">
                ¿Qué espacio tienes disponible para tu compañero?
              </label>
              <input
                className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                placeholder="Departamento pequeño/mediano"
                name="homeType"
                {...register("homeType")}
              />
            </div>
            <div>
              <label className="flex flex-col font-semibold text-[14px]">
                ¿Tu condominio o edificio permite mascotas?
              </label>
              <RadioGroup
                name="allowPet"
                register={register}
                control={control}
              />
            </div>
            <div>
              <label className="flex flex-col font-semibold text-[14px]">
                ¿Están o estuvieron vacunados?
              </label>
              <RadioGroup
                name="hadPetsVaccinated"
                register={register}
                control={control}
              />
            </div>
            <div>
              <label className="flex flex-col font-semibold text-[14px]">
                ¿Cuántas horas al día estará sola la mascota?
              </label>
              <input
                name="hoursAlone"
                type="number"
                className="border border-primary rounded-full outline-none p-2 text-xs"
                {...register("hoursAlone")}
              />
            </div>

            <label className="flex flex-col font-semibold ">
            ¿Qué tipo de mascota estás buscando?
          </label>


            <div className="flex flex-col">
              <label className="flex flex-col font-semibold">Carácter</label>
              <Controller
                control={control}
                name="userPreferenceTraits"
                render={({ field }) => (
                  <TagOptions
                    options={[
                      "Con niños",
                      "Con gatos",
                      "Con perros",
                    ]}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex flex-col font-semibold">
                Compatibilidad
              </label>
              <Controller
                control={control}
                name="userPreferenceTraits"
                render={({ field }) => (
                  <TagOptions
                    options={[
                      "Cariñoso",
                      "Independiente",
                      "Protector",
                      "Juguetón",
                    ]}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex flex-col font-semibold">Energía</label>
              <Controller
                control={control}
                name="userPreferenceEnergy"
                render={({ field }) => (
                  <TagOptions
                    options={[
                      "Tranquilo",
                      "Moderado",
                      "Muy activo",
                    ]}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="right flex flex-col gap-5">
                      <div>
            <label className="flex flex-col font-semibold text-[14px]">
              ¿Has tenido mascotas antes?
            </label>
            <RadioGroup name="hadPets" register={register} control={control} />
          </div>

          <div>
            <label className="flex flex-col font-semibold text-[14px]">
              ¿Están o estuvieron castradas?
            </label>
            <RadioGroup
              name="hadPetsCastrated"
              register={register}
              control={control}
            />
          </div>

          <div className="flex flex-col">
            <label className="flex flex-col font-semibold text-[14px]">
              ¿Qué harías si la mascota adopta o tiene problemas de
              comportamiento?
            </label>
            <textarea
              className="border rounded-md text-xs p-2 w-70 border-primary outline-none text-pretty resize-none h-20"
              placeholder="Buscaría entender la causa, tener paciencia y trabajar con refuerzo positivo o ayuda profesional"
              name="petDestroy"
              {...register("petDestroy")}
            />
          </div>

          <div className="flex flex-col">
            <label className="flex flex-col font-semibold text-[14px]">
              ¿Estás dispuesto/a a llevarlo al veterinario cuando sea necesario?
            </label>
            <RadioGroup
              name="preparedToVisitVeterinarian"
              register={register}
              control={control}
            />
          </div>

          <div className="flex flex-col">
            <label className="flex flex-col font-semibold text-[14px]">
              ¿Estás dispuesto/a a recibir una visita o llamado de seguimiento
              después de la adopción?
            </label>
            <RadioGroup
              name="allowsVisit"
              register={register}
              control={control}
            />
          </div>

          <div className="flex flex-col">
            <label className="flex flex-col font-semibold text-[14px]">
              ¿Estás dispuesto/a a firmar un compromiso de adopción responsable?
            </label>
            <RadioGroup
              name="isResponsibleAdoption"
              register={register}
              control={control}
            />
          </div>
          </div>
        </div>
       </div>
        <button
          type="submit"
          className="bg-primary hover:bg-orange-400 cursor-pointer w-fit text-white py-2 px-4 rounded-md md:col-span-2 items-center"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

const RadioGroup = ({ name, control }, ref) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const options = [
    { label: "SI", val: true },
    { label: "NO", val: false },
  ];

  return (
    <div className="flex gap-4 mt-2 text-[12px] items-center">
      {options.map(({ label, val }) => {
        const checked = value === val;
        return (
          <label
            key={val}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition cursor-pointer
              ${
                checked
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-gray-400 text-gray-500"
              }`}
          >
            <span>{label}</span>
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${checked ? "border-orange-500" : "border-gray-400"}`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition
                  ${checked ? "bg-orange-500" : "bg-transparent"}`}
              />
            </span>
            <input
              type="radio"
              value={val}
              checked={checked}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />
          </label>
        );
      })}
    </div>
  );
};

const TagOptions = ({ options, value, onChange }, ref) => {
  const handleToggle = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt, idx) => (
        <button
          type="button"
          key={idx}
          onClick={() => handleToggle(opt)}
          className={`border text-primary rounded-full px-4 py-1 text-sm cursor-pointer
            ${
              value.includes(opt)
                ? "bg-orange-200 border-orange-400"
                : "border-primary hover:bg-orange-100"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default UserModalEdit;
