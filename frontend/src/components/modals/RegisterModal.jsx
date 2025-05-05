import { useState } from "react";
import PropTypes from "prop-types";

const opciones = [
  "Departamento pequeño/mediano",
  "Departamento grande (con balcón) o casa chica (con patio y/o antejardín)",
  "Mediana/grande (con patio y/o antejardín)",
];

const RegisterModal = ({ isOpen, onClose, onNext }) => {
  const [selected, setSelected] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    email: "",
    password: "",
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

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Nombre y apellido son requeridos";
    if (!formData.birthDate) newErrors.birthDate = "Fecha requerida";
    if (!formData.email) newErrors.email = "Correo requerido";
    if (!formData.address) newErrors.address = "Dirección requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Correo inválido";
    if (!formData.password) newErrors.password = "Contraseña requerida";
    if (!formData.run) newErrors.run = "Documento requerido";
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
    if (validate()) {
      alert("Formulario válido y enviado");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] bg-opacity-20 flex items-center justify-center px-4">
      {formVisible && (
        <div className="max-w-6xl mx-auto my-7 p-6 bg-white/90 rounded-2xl shadow-2xl">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-[#595146] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="text-center mb-6 mt-1 px-20">
            <img
              src="src/assets/logo.png"
              alt="Logo Patas Pirque"
              className="mx-auto mb-4 h-20 w-auto"
            />
            <div className="text-black justify-center text-center text-lg mt-1 ">
              Queremos saber
              <strong>
                {" "}
                qué tipo de compañero estás buscando y qué te motiva a adoptar.
              </strong>{" "}
              Así podemos asegurarnos de que haya una buena conexión entre
              ustedes.
            </div>
            <h2 className="text-2xl font-semibold text-primary mt-1 mb-2">
              Crear Cuenta
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-6">
              <div className=" w-3 h-3 rounded-full bg-primary" />
              <div className="border-t border-gray-800 w-6" />
              <div className="w-3 h-3 rounded-full border border-gray-800" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block font-medium">
                  Nombre y Apellido*
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-3xl p-2 bg-white/75 border-primary border-1 focus:outline-none focus:border-primary"
                />
                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="birthDate" className="block font-medium">
                  Fecha de nacimiento*
                </label>
                <div className="relative">
                  <input
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className=" border border-primary bg-white/75 rounded-3xl p-2 pr-12 text-[#595146] focus:outline-none focus:border-primary appearance-none"
                  />
                  {errors.birthDate && (
                    <p className="text-red-500">{errors.birthDate}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-medium">
                  Correo Electrónico*
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-primary bg-white/75 border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block font-medium">
                  Contraseña*
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border bg-white/75 border-primary rounded-3xl p-2 pr-12 focus:outline-none focus:border-primary"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      width="25"
                      height="12"
                      viewBox="0 0 25 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.18478 0.330468C1.31923 0.278771 1.4637 0.251368 1.60994 0.249825C1.75618 0.248282 1.90133 0.272629 2.0371 0.321474C2.17286 0.37032 2.29658 0.442708 2.40119 0.534504C2.50579 0.626299 2.58924 0.735703 2.64676 0.856468L1.62349 1.25047L2.64787 0.856468L2.65121 0.864468L2.6746 0.909468L2.77926 1.10347C2.87502 1.27547 3.02311 1.52747 3.22465 1.83247C3.75606 2.63424 4.37927 3.38398 5.08413 4.06947C5.29539 4.27359 5.51451 4.47105 5.74108 4.66147C7.39123 6.05047 9.69721 7.25047 12.7581 7.25047C13.9849 7.2555 15.2016 7.05122 16.3435 6.64847C17.7097 6.16547 18.8532 5.43847 19.7908 4.65047C21.0446 3.58194 22.0753 2.32035 22.8339 0.925468L22.8639 0.867468L22.8695 0.856468C22.9886 0.616477 23.2081 0.428226 23.4805 0.332416C23.7529 0.236606 24.0564 0.240936 24.3253 0.344469C24.5942 0.448003 24.8069 0.642421 24.9174 0.885689C25.028 1.12896 25.0275 1.40153 24.916 1.64447L24.9138 1.64947L24.9094 1.65747L24.8971 1.68347L24.8526 1.77047C24.6053 2.23304 24.3298 2.68305 24.0275 3.11847C23.4709 3.92141 22.8332 4.6766 22.1224 5.37447L23.0098 6.17147C23.2187 6.35898 23.3362 6.61334 23.3363 6.87861C23.3364 7.14388 23.2191 7.39833 23.0103 7.58597C22.8016 7.77361 22.5183 7.87908 22.223 7.87917C21.9276 7.87926 21.6443 7.77398 21.4354 7.58647L20.5 6.74647C19.8418 7.22427 19.1346 7.64482 18.3878 8.00247L19.2585 9.20447C19.3407 9.31449 19.3977 9.43808 19.4262 9.56805C19.4547 9.69802 19.4542 9.83178 19.4247 9.96157C19.3951 10.0914 19.3372 10.2146 19.2542 10.3241C19.1712 10.4336 19.0648 10.5272 18.9412 10.5995C18.8176 10.6717 18.6792 10.7212 18.5341 10.7451C18.389 10.7689 18.2401 10.7666 18.096 10.7383C17.9519 10.71 17.8155 10.6563 17.6947 10.5803C17.5739 10.5043 17.4711 10.4075 17.3924 10.2955L16.2945 8.78147C15.5384 8.98947 14.7312 9.13647 13.8716 9.20547V10.7505C13.8716 11.0157 13.7543 11.27 13.5455 11.4576C13.3366 11.6451 13.0534 11.7505 12.7581 11.7505C12.4628 11.7505 12.1796 11.6451 11.9708 11.4576C11.762 11.27 11.6447 11.0157 11.6447 10.7505V9.20647C10.7817 9.13647 9.97447 8.98947 9.22065 8.78147L8.12389 10.2955C7.95921 10.51 7.70783 10.6583 7.42325 10.7088C7.13866 10.7593 6.84335 10.7082 6.60016 10.5661C6.35697 10.4241 6.18511 10.2024 6.12115 9.94827C6.0572 9.69414 6.1062 9.42764 6.25772 9.20547L7.12845 8.00247C6.34903 7.63247 5.64532 7.20247 5.01621 6.74547L4.0809 7.58547C3.8709 7.76763 3.58964 7.86842 3.29769 7.86614C3.00574 7.86386 2.72647 7.75869 2.52003 7.57329C2.31358 7.38788 2.19648 7.13707 2.19394 6.87487C2.1914 6.61267 2.30364 6.36007 2.50646 6.17147L3.39389 5.37447C2.60616 4.60065 1.90849 3.7566 1.31172 2.85547C1.07405 2.49549 0.854477 2.12612 0.653658 1.74847L0.616913 1.67647L0.605779 1.65547L0.603552 1.64847L0.602438 1.64647C0.599098 1.64647 0.599098 1.64447 1.62349 1.25047L0.600211 1.64547C0.542443 1.52473 0.51174 1.39494 0.509858 1.26354C0.507975 1.13214 0.534951 1.00169 0.589241 0.879651C0.643532 0.757616 0.724074 0.646388 0.826261 0.552327C0.928447 0.458265 1.05028 0.382215 1.18478 0.330468Z"
                        fill="#F4A470"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="run" className="block font-medium">
                  Documento de identidad*
                </label>
                <input
                  name="run"
                  type="text"
                  value={formData.run}
                  onChange={handleChange}
                  className="w-full bg-white/75 border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
                />
                {errors.run && <p className="text-red-500">{errors.run}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block font-medium">
                  Dirección y comuna en la que vive
                </label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-white/75 border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="homeType" className="block font-medium mb-2">
                ¿Qué espacio tienes disponible para tu nuevo compañero?*
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {opciones.map((opcion) => (
                  <button
                    name="homeType"
                    key={opcion}
                    type="button"
                    value={formData.homeType}
                    onChange={handleChange}
                    onClick={() => setSelected(opcion)}
                    className={`px-4 py-1 rounded-2xl border-1 ${
                      selected === opcion
                        ? "bg-[#767575] border-primary text-white"
                        : "border-primary text-[#aaaaaa] bg-white/75"
                    }`}
                  >
                    {opcion}
                  </button>
                ))}
              </div>
              {errors.homeType && (
                <p className="text-red-500">{errors.homeType}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block font-medium">
                  ¿Tu condominio o edificio permite mascotas?*
                </label>
                <div className="flex gap-4 mt-1 mb-3">
                  <label
                    htmlFor="allowsPetsYes"
                    className="flex items-center bg-white/75 border-1 border-primary rounded-3xl px-2 gap-5"
                  >
                    Si
                    <input
                      type="radio"
                      name="allowsPets"
                      value="true"
                      checked={formData.allowsPets === "true"}
                      onChange={handleChange}
                      className="accent-[#767575] bg-white/75"
                    />{" "}
                  </label>
                  <label
                    htmlFor="allowsPetsNo"
                    className="flex items-center bg-white/75 border-1 border-primary rounded-3xl px-2 gap-5"
                  >
                    No
                    <input
                      type="radio"
                      name="allowsPets"
                      value="false"
                      checked={formData.allowsPets === "false"}
                      onChange={handleChange}
                      className="accent-[#767575] bg-white/75"
                    />{" "}
                  </label>
                </div>
                {errors.allowsPets && (
                  <p className="text-red-500">{errors.allowsPets}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">
                  ¿Has tenido mascotas antes?*
                </label>
                <div className="flex gap-4 mt-1 mb-3">
                  <label className="flex items-center bg-white/75 border-primary border-1 rounded-3xl px-2 gap-5">
                    Si
                    <input
                      value="true"
                      type="radio"
                      name="hasPets"
                      checked={formData.hasPets === "true"}
                      onChange={handleChange}
                      className="accent-[#767575]"
                    />
                  </label>
                  <label className="flex items-center bg-white/75 border-primary border-1 rounded-3xl px-2 gap-5">
                    No
                    <input
                      value="false"
                      type="radio"
                      name="hasPets"
                      checked={formData.hasPets === "false"}
                      onChange={handleChange}
                      className="accent-[#767575] border rounded-3xl px-2 gap-5"
                    />
                  </label>
                </div>
                {errors.hasPets && (
                  <p className="text-red-500">{errors.hasPets}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">¿Están vacunadas?</label>
                <div className="flex gap-4 mt-1 mb-3">
                  <label className="flex items-center bg-white/75 border-primary border-1 rounded-3xl px-2 gap-5">
                    Si
                    <input
                      value="true"
                      type="radio"
                      name="isVaccinated"
                      checked={formData.isVaccinated === "true"}
                      onChange={handleChange}
                      className="accent-[#767575]"
                    />
                  </label>
                  <label className="flex items-center bg-white/75 border-primary border-1 rounded-3xl px-2 gap-5">
                    No
                    <input
                      value="false"
                      type="radio"
                      name="isVaccinated"
                      checked={formData.isVaccinated === "false"}
                      onChange={handleChange}
                      className="accent-[#767575]"
                    />
                  </label>
                </div>
                {errors.isVaccinated && (
                  <p className="text-red-500">{errors.isVaccinated}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">¿Están castradas?</label>
                <div className="flex gap-4 mt-1 mb-3">
                  <label className="flex items-center bg-white/75 border-primary border-1 rounded-3xl px-2 gap-5">
                    Si
                    <input
                      value="true"
                      type="radio"
                      name="isSterilized"
                      checked={formData.isSterilized === "true"}
                      onChange={handleChange}
                      className="accent-[#767575]"
                    />
                  </label>
                  <label className="flex items-center bg-white/75 border-primary border-1 rounded-3xl px-2 gap-5">
                    No
                    <input
                      value="false"
                      type="radio"
                      name="isSterilized"
                      checked={formData.isSterilized === "false"}
                      onChange={handleChange}
                      className="accent-[#767575]"
                    />
                  </label>
                </div>
                {errors.isSterilized && (
                  <p className="text-red-500">{errors.isSterilized}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium ">
                  ¿Cuántas horas al día estará sola la mascota?*
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  step="1"
                  name="hoursAlone"
                  checked={formData.hoursAlone}
                  onChange={handleChange}
                  className="w-auto bg-white/75 border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
                />
                {errors.hoursAlone && (
                  <p className="text-red-500">{errors.hoursAlone}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">
                  ¿Qué harías si la mascota rompe algo o tiene problemas de
                  comportamiento?*
                </label>
                <input
                  name="petDestroy"
                  checked={formData.petDestroy}
                  onChange={handleChange}
                  type="text"
                  className="w-full border-1 bg-white/75 border-primary rounded-2xl p-2 h-18 focus:outline-none focus:border-primary"
                />
                {errors.petDestroy && (
                  <p className="text-red-500">{errors.petDestroy}</p>
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={onNext}
                className="bg-primary hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-3xl"
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
    onNext:  PropTypes.func.isRequired,
  };

export default RegisterModal;
