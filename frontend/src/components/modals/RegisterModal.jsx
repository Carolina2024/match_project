import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logo.webp";
import OnClose from "../../assets/icons/svg-components/OnClose";
import eyeOpen from "../../assets/icons/eye-open.svg";
import eyeClose from "../../assets/icons/eye-close.svg";
import { FiCalendar } from "react-icons/fi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const opciones = [
  "Departamento pequeño/mediano",
  "Departamento grande (con balcón) o casa chica (con patio y/o antejardín)",
  "Casa mediana/grande (con patio y/o antejardín)",
];

const RegisterModal = ({ isOpen, onClose, onNext, serverError }) => {
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    email: "",
    password: "",
    phoneNumber: "",
    run: "",
    address: "",
    allowsPets: "",
    hasPets: "",
    isVaccinated: "",
    isSterilized: "",
    hoursAlone: "",
    petDestroy: "",
  });
  const [errors, setErrors] = useState({});
  const [formVisible] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const increment = () => {
    setFormData((prev) => {
      const value = Number(prev.hoursAlone) || 0;
      const newValue = Math.min(23, value + 1);
      return { ...prev, hoursAlone: newValue.toString() };
    });
    setErrors((prevErrors) => {
      const nuevosErrores = { ...prevErrors };
      delete nuevosErrores.hoursAlone;
      return nuevosErrores;
    });
  };

  const decrement = () => {
    setFormData((prev) => {
      const value = Number(prev.hoursAlone) || 1;
      const newValue = Math.max(1, value - 1);
      return { ...prev, hoursAlone: newValue.toString() };
    });
    setErrors((prevErrors) => {
      const nuevosErrores = { ...prevErrors };
      delete nuevosErrores.hoursAlone;
      return nuevosErrores;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Nombre y apellido son requeridos";

    if (!formData.birthDate) {
      newErrors.birthDate = "Fecha requerida";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());

      const realAge = hasHadBirthdayThisYear ? age : age - 1;

      if (realAge < 18) {
        newErrors.birthDate = "Debes ser mayor de 18 años para registrarte";
      }
    }

    if (!formData.email) newErrors.email = "Correo requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Correo inválido";
    if (!formData.password) newErrors.password = "Campo requerido";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Campo requerido";
    if (!formData.run) newErrors.run = "Campo requerido";
    if (!selected) newErrors.homeType = "Seleccione una opción";
    if (!formData.allowsPets) newErrors.allowsPets = "Seleccione una opción";
    if (!formData.hasPets) newErrors.hasPets = "Seleccione una opción";
    if (!formData.isVaccinated)
      newErrors.isVaccinated = "Seleccione una opción";
    if (!formData.isSterilized)
      newErrors.isSterilized = "Seleccione una opción";
    if (!formData.hoursAlone) newErrors.hoursAlone = "Campo requerido";
    if (!formData.petDestroy.trim()) newErrors.petDestroy = "Campo requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onNext({ ...formData, homeType: selected });
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value.trim()) return "El correo es obligatorio";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Correo electrónico inválido Ejemplo: nombre@dominio.com";
        return "";

      case "password":
        if (!value.trim()) return "La contraseña es obligatoria";
        if (
          !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/.test(
            value
          )
        ) {
          return "Debe tener mínimo 6 caracteres, al menos una letra, un número y un símbolo. Ej: hola123!";
        }
        return "";

      case "phoneNumber":
        if (!value.trim()) return "El número de teléfono es requerido";
        if (!/^(\+56)\d{9}$/.test(value))
          return "Ingrese un número válido en Chile. Ej: +56123456789";
        return "";

      case "run":
      case "identityDocument":
        if (!value.trim()) return "El Documento de Identidad es requerido";
        if (
          !/^([1-9]|[1-9]\d|[1-9]\d{2})((\.\d{3})*|(\d{3})*)-(\d|k|K)$/.test(
            value
          )
        )
          return "Ingrese un Documento válido. Ej: 12345678-9";
        return "";

      case "address":
        if (!value.trim()) return "La dirección es requerida";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s,.#-]+$/.test(value)) {
          return "Sólo letras, números, comas, puntos, # y guiones";
        }
        return "";

      case "birthDate": {
        if (!value.trim()) return "Fecha requerida";

        const birthDate = new Date(value);
        const today = new Date();

        const age = today.getFullYear() - birthDate.getFullYear();
        const hasHadBirthdayThisYear =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

        const realAge = hasHadBirthdayThisYear ? age : age - 1;

        if (realAge < 18) return "Debes ser mayor de 18 años para registrarte";
        if (realAge > 75)
          return "La edad máxima para registrarse es de 75 años";

        return "";
      }

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      const nuevosErrores = { ...prevErrors };

      if (
        [
          "allowsPets",
          "hasPets",
          "isVaccinated",
          "isSterilized",
          "hoursAlone",
        ].includes(name)
      ) {
        if (value) {
          delete nuevosErrores[name];
        }
      }

      return nuevosErrores;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] flex items-start justify-center pt-16 pb-8 px-4 overflow-y-auto">
      {formVisible && (
        <div className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-2xl p-3 text-[#333333]">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-tertiary focus:outline-none cursor-pointer"
            >
              <OnClose />
            </button>
          </div>

          <div className="text-center mb-6 mt-0 px-6 sm:px-10 md:px-20">
            <img
              src={logo}
              alt="Logo Patas Pirque"
              className="mx-auto mb-5 h-24 w-24 sm:h-36 sm:w-auto rounded-full"
            />
            <div className="text-black justify-center text-center text-base sm:text-xl mt-1 mb-4 mx-2 sm:mx-10 md:mx-16">
              Queremos saber
              <strong>
                {" "}
                qué tipo de compañero estás buscando y qué te motiva a adoptar.
              </strong>{" "}
              Así podemos asegurarnos de que haya una buena conexión entre
              ustedes.
            </div>
            <h2 className="md:text-2xl text-xl sm:text-3xl font-bold text-primary mt-1 mb-4">
              Crear Cuenta
            </h2>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary" />
              <div className="border-t border-[#1C1B1F] w-6" />
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#1C1B1F]" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 md:text-xl text-base">
              <div>
                <label htmlFor="fullName" className="block font-medium mb-2">
                  Nombre y Apellido*
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className=" w-full rounded-3xl p-2 bg-white/75 border-primary border-1 focus:outline-none focus:border-primary"
                />
                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div className="mt-7 sm:mt-0">
                <label htmlFor="birthDate" className="block font-medium mb-2">
                  Fecha de nacimiento*
                </label>
                <div className="relative w-fit">
                  <div className="relative flex items-center">
                    <input
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="placeholder-[#AAAAAA] border border-primary bg-white/75 rounded-3xl p-2 pr-10 text-tertiary focus:outline-none focus:border-primary appearance-none w-full"
                    />
                    <FiCalendar className="absolute right-4 text-[#F4A470] pointer-events-none" />
                  </div>
                  {errors.birthDate && (
                    <p className="text-red-500 md:text-lg text-base mt-1">
                      {errors.birthDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 sm:mt-0">
                <label
                  htmlFor="email"
                  className="block font-medium mb-2 mt-1 sm:mt-10"
                >
                  Correo Electrónico*
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border-primary bg-white/75 border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
                />
                {errors.email && (
                  <p className="text-red-500 text-lg">{errors.email}</p>
                )}
              </div>

              <div className="mt-6 sm:mt-0">
                <label
                  htmlFor="password"
                  className="block font-medium mb-2 mt-1 sm:mt-10"
                >
                  Contraseña*
                </label>
                <div className="flex items-center border border-primary rounded-3xl bg-white/75 px-4 py-2 w-full">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="flex-1 text-base text-[#767575] bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-primary"
                  >
                    <img
                      src={showPassword ? eyeOpen : eyeClose}
                      alt={
                        showPassword
                          ? "Mostrar contraseña"
                          : "Ocultar contraseña"
                      }
                      className="w-[20px] h-[20px]"
                    />
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 md:text-lg text-base mt-2">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="mt-6 sm:mt-10">
                <label htmlFor="phoneNumber" className="block font-medium mb-2">
                  Teléfono*
                </label>
                <input
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+56 9 1234 5678"
                  className="w-full bg-white/75 border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="mt-6 sm:mt-10">
                <label htmlFor="run" className="block font-medium mb-2">
                  Documento de identidad*
                </label>
                <input
                  name="run"
                  type="text"
                  value={formData.run}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-white/75 border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary "
                />
                {errors.run && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.run}
                  </p>
                )}
              </div>

              <div className="mt-1 sm:mt-3">
                <label
                  htmlFor="address"
                  className="block font-medium mt-8 mb-2"
                >
                  Dirección y comuna en la que vive
                </label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full bg-white/75 border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
                />
                {errors.address && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.address}
                  </p>
                )}
              </div>
            </div>

            <div className="md:text-xl text-base mb-8 sm:mt-10 mt-4">
              <label htmlFor="homeType" className="block font-medium mb-2">
                ¿Qué espacio tienes disponible para tu nuevo compañero?*
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                {opciones.map((opcion) => (
                  <button
                    name="homeType"
                    key={opcion}
                    type="button"
                    onClick={() => {
                      setSelected(opcion);
                      setErrors((prevErrors) => {
                        const nuevosErrores = { ...prevErrors };
                        delete nuevosErrores.homeType;
                        return nuevosErrores;
                      });
                    }}
                    className={`px-4 py-2 rounded-3xl cursor-pointer border border-solid border-[#F4A470] ${
                      selected === opcion
                        ? "bg-[#F4A470] text-white"
                        : "border-primary text-[#AAAAAA] bg-white/75"
                    }`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
              {errors.homeType && (
                <p className="text-red-500 md:text-lg text-base">
                  {errors.homeType}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:text-xl text-base text-[#333333]">
              <div>
                <label className="block font-medium mb-2">
                  ¿Tu condominio o edificio permite mascotas?*
                </label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                    <span className="text-[#AAAAAA]">Si</span>
                    <input
                      type="radio"
                      name="allowsPets"
                      value="true"
                      checked={formData.allowsPets === "true"}
                      onChange={handleChange}
                      className="accent-[#767575] bg-white/75 w-4 h-4 border-2 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                    <span className="text-[#AAAAAA]">No</span>
                    <input
                      type="radio"
                      name="allowsPets"
                      value="false"
                      checked={formData.allowsPets === "false"}
                      onChange={handleChange}
                      className="accent-[#767575] bg-white/75 w-4 h-4 border-2 cursor-pointer"
                    />
                  </label>
                </div>
                {errors.allowsPets && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.allowsPets}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-2">
                  ¿Tienes o has tenido mascotas antes?*
                </label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    <span className="text-[#AAAAAA]">Si</span>
                    <input
                      type="radio"
                      name="hasPets"
                      value="true"
                      checked={formData.hasPets === "true"}
                      onChange={handleChange}
                      className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    <span className="text-[#AAAAAA]">No</span>
                    <input
                      type="radio"
                      name="hasPets"
                      value="false"
                      checked={formData.hasPets === "false"}
                      onChange={handleChange}
                      className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                    />
                  </label>
                </div>
                {errors.hasPets && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.hasPets}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium sm:mt-4 mt-3">
                  ¿Están o estuvieron vacunadas?
                </label>
                <div className="flex gap-4 mt-1 ">
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    <span className="text-[#AAAAAA]">Si</span>
                    <input
                      type="radio"
                      name="isVaccinated"
                      value="true"
                      checked={formData.isVaccinated === "true"}
                      onChange={handleChange}
                      className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    <span className="text-[#AAAAAA]">No</span>
                    <input
                      type="radio"
                      name="isVaccinated"
                      value="false"
                      checked={formData.isVaccinated === "false"}
                      onChange={handleChange}
                      className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                    />
                  </label>
                </div>
                {errors.isVaccinated && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.isVaccinated}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium">
                  ¿Están o estuvieron castradas?
                </label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    <span className="text-[#AAAAAA]">Si</span>
                    <input
                      type="radio"
                      name="isSterilized"
                      value="true"
                      checked={formData.isSterilized === "true"}
                      onChange={handleChange}
                      className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    <span className="text-[#AAAAAA]">No</span>
                    <input
                      type="radio"
                      name="isSterilized"
                      value="false"
                      checked={formData.isSterilized === "false"}
                      onChange={handleChange}
                      className="accent-[#767575] w-4 h-4 border-2 cursor-pointer"
                    />
                  </label>
                </div>
                {errors.isSterilized && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.isSterilized}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:text-xl text-base text-[#333333]">
              <div>
                <label className="block font-medium mb-2 sm:w-70 w-80">
                  ¿Cuántas horas al día estará sola la mascota?*
                </label>

                <div className="relative w-max">
                  <input
                    type="text"
                    name="hoursAlone"
                    value={formData.hoursAlone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    readOnly
                    className="w-28 pr-10 text-center bg-white/75 border-primary px-3 py-2 border-2 rounded-3xl focus:outline-none focus:border-primary"
                  />

                  <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
                    <button
                      type="button"
                      onClick={increment}
                      className="mr-2 p-[1px] text-primary bg-transparent border-none focus:outline-none  transition"
                    >
                      <FaChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={decrement}
                      className="mr-2 p-[1px] mt-[2px] text-primary bg-transparent border-none focus:outline-none  transition"
                    >
                      <FaChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {errors.hoursAlone && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.hoursAlone}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-2 sm:w-92 w-80">
                  ¿Qué harías si la mascota rompe algo o tiene problemas de
                  comportamiento?*
                </label>
                <input
                  name="petDestroy"
                  type="text"
                  value={formData.petDestroy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="sm:w-100 w-70 sm:h-20 h-30 border-2 bg-white/75 border-primary rounded-3xl p-2 h-24 focus:outline-none focus:border-primary"
                />
                {errors.petDestroy && (
                  <p className="text-red-500 md:text-lg text-base">
                    {errors.petDestroy}
                  </p>
                )}
              </div>
            </div>

            {serverError && (
              <p className="text-red-600 text-center mb-4 md:text-lg text-base">
                {serverError}
              </p>
            )}

            <div className="text-right">
              <button
                type="submit"
                className="bg-primary hover:bg-tertiary text-white font-bold mb-6 py-2 px-7 sm:px-16 rounded-3xl shadow-lg/20 cursor-pointer transition duration-300 ease-in-out"
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  serverError: PropTypes.string,
};

export default RegisterModal;
