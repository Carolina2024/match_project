import { useState, useEffect } from "react";
import { getUserById, updateUserProfile } from "../../api/editProfileApi";
import { useForm, Controller, useController } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import SuccessModalEditProfile from "./SuccessModalEditProfile";
import ErrorModalEditProfile from "./ErrorModalEditProfile";

import PropTypes from "prop-types";

const initialFormState = {
  fullname: "",
  email: "",
  password: "",
  birthDate: "",
  phoneNumber: "",
  identityDocument: "",
  address: "",
  homeType: "",
  allowsPets: false,
  hadPets: false,
  hadPetsVaccinated: false,
  hadPetsCastrated: false,
  hoursAlone: 0,
  petDestroy: "",
  preparedToVisitVeterinarian: false,
  allowsVisit: false,
  isResponsibleAdoption: false,
  userPreferenceEnergy: "",
  userPreferenceTraits: [],
  userPreferenceDogs: false,
  userPreferenceCats: false,
  userPreferenceChildren: false,
};

function UserModalEdit() {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: initialFormState,
  });

  const { updateUser } = useAuth();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = JSON.parse(localStorage.getItem("user")).id;
        const res = await getUserById(id);
        const userData = {
          fullname: res.fullname,
          email: res.email,
          password: res.password,
          birthDate: res.adopter.birthDate,
          phoneNumber: res.adopter.phoneNumber,
          identityDocument: res.adopter.identityDocument,
          address: res.adopter.address,
          homeType: res.adopter.homeType,
          allowsPets: res.adopter.allowsPets,
          hadPets: res.adopter.hadPets,
          hadPetsVaccinated: res.adopter.hadPetsVaccinated,
          hadPetsCastrated: res.adopter.hadPetsCastrated,
          hoursAlone: +res.adopter.hoursAlone,
          petDestroy: res.adopter.petDestroy,
          preparedToVisitVeterinarian: res.adopter.preparedToVisitVeterinarian,
          allowsVisit: res.adopter.allowsVisit,
          isResponsibleAdoption: res.adopter.isResponsibleAdoption,
          userPreferenceEnergy: res.adopter.userPreferenceEnergy,
          userPreferenceTraits: res.adopter.userPreferenceTraits,
          userPreferenceDogs: res.adopter.userPreferenceDogs,
          userPreferenceCats: res.adopter.userPreferenceCats,
          userPreferenceChildren: res.adopter.userPreferenceChildren,
        };
        reset(userData);
      } catch (error) {
        console.error("Error obteniendo nombre:", error.message);
      }
    };

    fetchUser();
  }, [reset]);

  const onSubmit = async (data) => {
    const id = JSON.parse(localStorage.getItem("user")).id;

    if (data?.password?.length === 0) {
      data.password = undefined;
    }

    if (data.hoursAlone) {
      data.hoursAlone = +data.hoursAlone;
    }

    try {
      await updateUserProfile(id, data);
      const refreshed = await getUserById(id);
      updateUser(refreshed);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsErrorModalOpen(true)
      setErrorMessage(error.message)
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-10 p-4 bg-white rounded-md flex flex-col gap-5">
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
          <div className="flex flex-col sm:flex-row sm:gap-40 gap-3 ">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <span className="text-xs ml-3 font-bold">Nombre y Apellido</span>
                <input
                  name="fullname"
                  className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                  placeholder="María Alvarado"
                  {...register("fullname")}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs ml-3 font-bold">Correo Electrónico</span>
                <input
                  className="border rounded-full text-xs p-2 w-70 border-primary outline-none"
                  placeholder="maria@gmail.com"
                  type="email"
                  name="email"
                  {...register("email")}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs ml-3 font-bold">Telefono</span>
                <input
                  className="border rounded-full text-xs p-2 w-70 items-center border-primary outline-none"
                  placeholder="ch +56 9 12345678"
                  name="phoneNumber"
                  {...register("phoneNumber")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col ">
                <span className="text-xs ml-3 font-bold">Fecha de nacimiento</span>
                <input
                  className="border rounded-full text-xs p-2 border-primary outline-none w-fit"
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
                  placeholder="******"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="left order-2 sm:order-1 flex flex-col gap-5">
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
                  name="allowsPets"
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
                <label className="flex flex-col font-semibold">Energía</label>
                <Controller
                  control={control}
                  name="userPreferenceEnergy"
                  render={({ field }) => (
                    <TagOptions
                      options={["Tranquilo", "Moderado", "Muy Activo"]}
                      onChange={field.onChange}
                      isSingleSelect={true}
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="flex flex-col">
                <label className="flex flex-col font-semibold">Carácter</label>
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
                <label className="flex flex-col font-semibold">
                  Compatibilidad
                </label>
                <div className="flex gap-2.5">
                  <Controller
                    control={control}
                    name="userPreferenceDogs"
                    render={({ field }) => (
                      <BooleanToggleTag label="Con perros" {...field} />
                    )}
                  />

                  <Controller
                    control={control}
                    name="userPreferenceCats"
                    render={({ field }) => (
                      <BooleanToggleTag label="Con gatos" {...field} />
                    )}
                  />

                  <Controller
                    control={control}
                    name="userPreferenceChildren"
                    render={({ field }) => (
                      <BooleanToggleTag label="Con niños" {...field} />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="right order-1 sm:order-2 flex flex-col gap-5">
              <div>
                <label className="flex flex-col font-semibold text-[14px]">
                  ¿Has tenido mascotas antes?
                </label>
                <RadioGroup
                  name="hadPets"
                  register={register}
                  control={control}
                />
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
                  ¿Estás dispuesto/a a llevarlo al veterinario cuando sea
                  necesario?
                </label>
                <RadioGroup
                  name="preparedToVisitVeterinarian"
                  register={register}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <label className="flex flex-col font-semibold text-[14px]">
                  ¿Estás dispuesto/a a recibir una visita o llamado de
                  seguimiento después de la adopción?
                </label>
                <RadioGroup
                  name="allowsVisit"
                  register={register}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <label className="flex flex-col font-semibold text-[14px]">
                  ¿Estás dispuesto/a a firmar un compromiso de adopción
                  responsable?
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
          className="bg-primary hover:bg-tertiary cursor-pointer w-fit text-white py-2 px-4 rounded-4xl md:col-span-2 items-center"
        >
          Guardar cambios
        </button>
      </form>
      <SuccessModalEditProfile
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onConfirm={() => {
          setIsSuccessModalOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <ErrorModalEditProfile
        isOpen={isErrorModalOpen}
        errorMessage={errorMessage}
        onClose={() => setIsErrorModalOpen(false)}
        onConfirm={() => {
          setIsErrorModalOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}

const RadioGroup = ({ name, control }) => {
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
                  ? "border-primary bg-orange-50 text-primary"
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
              onChange={(e) => onChange(e.target.value === "true")}
              className="hidden"
            />
          </label>
        );
      })}
    </div>
  );
};

const TagOptions = ({ options, value, onChange, isSingleSelect = false }) => {
  const handleToggle = (option) => {
    if (isSingleSelect) {
      if (value !== option) {
        onChange(option);
      }
    } else {
      if (value.includes(option)) {
        onChange(value.filter((item) => item !== option));
      } else {
        onChange([...value, option]);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((opt, idx) => {
        const selected = value.includes(opt);

        return (
          <button
            type="button"
            key={idx}
            onClick={() => handleToggle(opt)}
            className={`flex items-center gap-1 rounded-full px-4 py-1 text-sm border cursor-pointer
            ${
              selected
                ? "bg-gray-300 text-gray-800 border-gray-300"
                : "border-primary text-primary hover:bg-orange-100"
            }`}
          >
            {selected && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-500 text-white text-xs">
                ✓
              </span>
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
};

const BooleanToggleTag = ({ label, value, onChange }) => {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-1 rounded-full px-4 py-1 text-sm border cursor-pointer
      ${
        value
          ? "bg-gray-300 text-gray-800 border-gray-300"
          : "border-primary text-primary hover:bg-orange-100"
      }`}
      >
        {value && (
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-500 text-white text-xs">
            ✓
          </span>
        )}
        {label}
      </button>
    </div>
  );
};
RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

TagOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  isSingleSelect: PropTypes.bool,
};

BooleanToggleTag.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UserModalEdit;
