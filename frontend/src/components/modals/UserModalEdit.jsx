import { useState, useEffect } from "react";
import { getUserById, updateUserProfile } from "../../api/editProfileApi";
import { useForm, Controller, useController } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import SuccessModalEditProfile from "./SuccessModalEditProfile";
import ErrorModalEditProfile from "./ErrorModalEditProfile";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

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
  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: initialFormState,
  });

  const { updateUser } = useAuth();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hoursAlone = watch("hoursAlone");

  const increment = () => {
    setValue("hoursAlone", Number(hoursAlone || 0) + 1);
  };

  const decrement = () => {
    setValue("hoursAlone", Number(hoursAlone) > 1 ? Number(hoursAlone) - 1 : 1);
  };

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
      setIsErrorModalOpen(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-10 p-4 bg-white rounded-[50px] flex flex-col gap-5">
      <div className="mt-7 mb-7">
        <div className="flex flex-col gap-2">
          <h1 className="text-[24px] sm:text-[40px] font-bold text-center text-primary mb-0 sm:mb-2">
            Mi Perfil
          </h1>
          <p className="text-center text-[14px] sm:text-[20px] mb-10 font-semibold text-[#000000]">
            Modifica tus datos personales para
            <br className="sm:hidden" /> mantener tu cuenta al día
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
                  <span className="ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    Nombre y Apellido
                  </span>
                  <input
                    name="fullname"
                    className="border rounded-full py-2 px-4 w-70 border-primary outline-none
                  font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px]"
                    placeholder="María Alvarado"
                    {...register("fullname")}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    Correo Electrónico
                  </span>
                  <input
                    className="border rounded-full text-xs py-2 px-4 w-70 border-primary outline-none
                  font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px]"
                    placeholder="maria@gmail.com"
                    type="email"
                    name="email"
                    {...register("email")}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    Telefono
                  </span>
                  <input
                    className="border rounded-full text-xs py-2 px-4 w-70 items-center border-primary outline-none
                  font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px]"
                    placeholder="ch +56 9 12345678"
                    name="phoneNumber"
                    {...register("phoneNumber")}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col ml-0 sm:ml-32">
                  <span className="ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    Fecha de nacimiento
                  </span>
                  <div className="relative w-fit">
                    <input
                      className="w-[150px] sm:w-[200px] border rounded-full text-xs py-2 px-4 pr-8 border-primary outline-none
                    font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px]"
                      placeholder="Fecha de nacimiento"
                      type="date"
                      name="birthDate"
                      {...register("birthDate")}
                    />
                    <FiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F4A470] pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col ml-0 sm:ml-32">
                  <span className="ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    Contraseña
                  </span>
                  <input
                    className="border rounded-full text-xs py-2 px-4 w-70 border-primary outline-none
                  font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px]"
                    placeholder="******"
                    type="password"
                    name="password"
                    {...register("password")}
                  />
                </div>
                <div className="flex flex-col ml-0 sm:ml-32">
                  <span className="ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    Documento de identidad
                  </span>
                  <input
                    className="border rounded-full text-xs py-2 px-4 w-70 border-primary outline-none
                  font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px]"
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
                  <span className="ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    Dirección y comuna
                  </span>
                  <input
                    className="border rounded-full text-xs py-2 px-4 w-70 border-primary outline-none
                  font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px]"
                    placeholder="Dirección y comuna"
                    name="address"
                    {...register("address")}
                  />
                </div>
                <div className="">
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    ¿Qué espacio tienes disponible para tu compañero?
                  </label>
                  <input
                    className="border rounded-full text-xs py-2 px-4 w-70 border-primary outline-none
                  font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px]"
                    placeholder="Departamento pequeño/mediano"
                    name="homeType"
                    {...register("homeType")}
                  />
                </div>
                <div>
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    ¿Tu condominio o edificio permite mascotas?
                  </label>
                  <RadioGroup
                    name="allowsPets"
                    register={register}
                    control={control}
                  />
                </div>
                <div>
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    ¿Están o estuvieron vacunados?
                  </label>
                  <RadioGroup
                    name="hadPetsVaccinated"
                    register={register}
                    control={control}
                  />
                </div>

                <div>
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    ¿Cuántas horas al día estará sola la mascota?
                  </label>
                  <div className="flex items-center border-[2px] border-[#F4A470] rounded-full overflow-hidden w-max">
                    <input
                      name="hoursAlone"
                      type="number"
                      className="text-[#AAAAAA] outline-none text-[14px] w-[150px] h-[20px] px-2 leading-none text-center border-none rounded-none appearance-none"
                      {...register("hoursAlone", {
                        valueAsNumber: true,
                        min: 1,
                      })}
                      min={1}
                    />
                    <div className="flex flex-col select-none text-[#F4A470]  mr-2 cursor-pointer">
                      <button
                        type="button"
                        onClick={increment}
                        className="p-1 hover:text-[#e27b32]"
                        aria-label="Incrementar horas"
                      >
                        <FaChevronUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={decrement}
                        className="p-1 hover:text-[#e27b32]"
                        aria-label="Decrementar horas"
                      >
                        <FaChevronDown size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2 ">
                  ¿Qué tipo de mascota estás buscando?
                </label>

                <div className="flex flex-col">
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-bold text-[#000000] font-raleway mb-2">
                    Energía
                  </label>
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
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-bold text-[#000000] font-raleway mb-2">
                    Carácter
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
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-bold text-[#000000] font-raleway mb-2">
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
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    ¿Tienes o has tenido mascotas antes?
                  </label>
                  <RadioGroup
                    name="hadPets"
                    register={register}
                    control={control}
                  />
                </div>

                <div>
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    ¿Están o estuvieron castradas?
                  </label>
                  <RadioGroup
                    name="hadPetsCastrated"
                    register={register}
                    control={control}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    ¿Qué harías si la mascota rompe algo o<br />
                    tiene problemas de comportamiento?
                  </label>
                  <textarea
                    className="border-2 rounded-[30px] border-[#F4A470] text-xs py-2 px-4 w-70 border-primary outline-none text-pretty resize-none h-20
                  font-raleway font-medium text-[#AAAAAA] text-[14px] sm:text-[20px] w-[300px] sm:w-[400px]"
                    placeholder="Buscaría entender la causa, tener paciencia y trabajar con refuerzo positivo o ayuda profesional"
                    name="petDestroy"
                    {...register("petDestroy")}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
                    ¿Estás dispuesto/a a llevarlo al veterinario cuando sea
                    necesario? (vacunarlo y desparasitarlo regularmente,
                    castrarlo o esterilizar)
                  </label>
                  <RadioGroup
                    name="preparedToVisitVeterinarian"
                    register={register}
                    control={control}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
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
                  <label className="flex flex-col ml-3 text-[14px] sm:text-[20px] font-medium text-[#000000] font-raleway mb-2">
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
            className="bg-primary hover:bg-tertiary cursor-pointer text-white  w-[181px] h-[40px] sm:w-[181px] rounded-4xl md:col-span-2 items-center"
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
    <div className="flex gap-4 mt-2 items-center">
      {options.map(({ label, val }) => {
        const checked = value === val;
        return (
          <label
            key={val}
            className={`flex justify-between items-center gap-2 px-4 py-2 w-[100px] rounded-[100px] border-2 transition cursor-pointer border-[#F4A470]`}
          >
            <span className="font-[500] text-[12px] font-['Raleway'] text-[#AAAAAA]">
              {label}
            </span>
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                checked ? "border-[#AAAAAA]" : "border-gray-400"
              }`}
              style={{
                borderWidth: checked ? "7px" : "2px",
              }}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition ${
                  checked ? "bg-[#AAAAAA]" : "bg-transparent"
                }`}
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

const TagOptions = forwardRef(({ options, value, onChange, isSingleSelect = false }, ref) => {
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
    <div className="flex flex-wrap gap-2 mt-2 sm:w-80 w-70">
      {options.map((opt, idx) => {
        const selected = value.includes(opt);

        return (
          <button
            type="button"
            key={idx}
            onClick={() => handleToggle(opt)}
            className={`flex items-center gap-1 rounded-full px-4 py-1 text-sm border-2 cursor-pointer
            ${
              selected
                ? "bg-[#F4A470] text-white border-[#F4A470]"
                : "border-primary text-[#AAAAAA] hover:bg-orange-100"
            }`}
          >
            {selected && (
              <span className="text-white text-sm font-bold">✓</span>
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
});

TagOptions.displayName = "TagOptions";

  const BooleanToggleTag = forwardRef(({ label, value, onChange }, ref) => {
    const handleToggle = () => {
      onChange(!value);
    };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-1 rounded-full px-4 py-1 text-sm border-2 cursor-pointer
      ${
        value
          ? "bg-[#F4A470] text-white border-[#F4A470]"
          : "border-primary text-[#AAAAAA] hover:bg-orange-100"
      }`}
      >
        {value && <span className="text-white text-sm font-bold">✓</span>}
        {label}
      </button>
    </div>
  );
  });

BooleanToggleTag.displayName = "BooleanToggleTag";

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
