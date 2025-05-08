import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logo.png";

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

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Nombre y apellido son requeridos";
    if (!formData.birthDate) newErrors.birthDate = "Fecha requerida";
    if (!formData.email) newErrors.email = "Correo requerido";
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
    if (!validate()) return;
    // El formData y el homeType seleccionado
    onNext({ ...formData, homeType: selected });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] flex items-start justify-center pt-16 pb-8 px-4 overflow-y-auto">
      {formVisible && (
        <div className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-2xl p-6 text-[#333333]">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="text-[#595146] focus:outline-none cursor-pointer"
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

          <div className="text-center mb-6 mt-0 px-20">
            <img
              src={logo}
              alt="Logo Patas Pirque"
              className="mx-auto mb-7 h-36 w-auto rounded-full"
            />
            <div className="text-black justify-center text-center text-xl mt-1 mb-4 mx-16 ">
              Queremos saber
              <strong>
                {" "}
                qué tipo de compañero estás buscando y qué te motiva a adoptar.
              </strong>{" "}
              Así podemos asegurarnos de que haya una buena conexión entre
              ustedes.
            </div>
            <h2 className="text-3xl font-bold text-primary mt-1 mb-4">
              Crear Cuenta
            </h2>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className=" w-5 h-5 rounded-full bg-primary" />
              <div className="border-t border-[#1C1B1F] w-6" />
              <div className="w-5 h-5 rounded-full border border-[#1C1B1F]" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 text-xl">
              <div className="">
                <label htmlFor="fullName" className="block font-medium mb-2">
                  Nombre y Apellido*
                </label>
                <input
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className=" w-full rounded-3xl p-2 bg-white/75 border-primary border-1 focus:outline-none focus:border-primary mb-9"
                />
                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="birthDate" className="block font-medium mb-2">
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
                <label htmlFor="email" className="block font-medium mb-2">
                  Correo Electrónico*
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-primary bg-white/75 border-1 rounded-3xl p-2 focus:outline-none focus:border-primary mb-9"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block font-medium mb-2">
                  Contraseña*
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border bg-white/75 border-primary rounded-3xl p-2 pr-12 focus:outline-none focus:border-primary"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        width="20"
                        height="16"
                        className="absolute top-3 right-4"
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.92 7.6C17.9 2.91 14.1 0 10 0C5.90001 0 2.10001 2.91 0.0800058 7.6C0.0249425 7.72617 -0.003479 7.86234 -0.003479 8C-0.003479 8.13766 0.0249425 8.27383 0.0800058 8.4C2.10001 13.09 5.90001 16 10 16C14.1 16 17.9 13.09 19.92 8.4C19.9751 8.27383 20.0035 8.13766 20.0035 8C20.0035 7.86234 19.9751 7.72617 19.92 7.6ZM10 14C6.83001 14 3.83001 11.71 2.10001 8C3.83001 4.29 6.83001 2 10 2C13.17 2 16.17 4.29 17.9 8C16.17 11.71 13.17 14 10 14ZM10 4C9.20888 4 8.43552 4.2346 7.77773 4.67412C7.11993 5.11365 6.60724 5.73836 6.30449 6.46927C6.00174 7.20017 5.92252 8.00444 6.07686 8.78036C6.2312 9.55628 6.61217 10.269 7.17158 10.8284C7.73099 11.3878 8.44372 11.7688 9.21964 11.9231C9.99557 12.0775 10.7998 11.9983 11.5307 11.6955C12.2616 11.3928 12.8864 10.8801 13.3259 10.2223C13.7654 9.56448 14 8.79113 14 8C14 6.93913 13.5786 5.92172 12.8284 5.17157C12.0783 4.42143 11.0609 4 10 4ZM10 10C9.60444 10 9.21776 9.8827 8.88887 9.66294C8.55997 9.44318 8.30362 9.13082 8.15225 8.76537C8.00087 8.39991 7.96126 7.99778 8.03843 7.60982C8.11561 7.22186 8.30609 6.86549 8.58579 6.58579C8.8655 6.30608 9.22186 6.1156 9.60983 6.03843C9.99779 5.96126 10.3999 6.00087 10.7654 6.15224C11.1308 6.30362 11.4432 6.55996 11.6629 6.88886C11.8827 7.21776 12 7.60444 12 8C12 8.53043 11.7893 9.03914 11.4142 9.41421C11.0391 9.78929 10.5304 10 10 10Z"
                          fill="#f4a470"
                        />
                      </svg>
                    ) : (
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
                          d="M0.675014 0.0807117C0.809463 0.0290147 0.953934 0.00161209 1.10018 6.90142e-05C1.24642 -0.00147406 1.39157 0.0228727 1.52733 0.0717186C1.66309 0.120564 1.78681 0.192953 1.89142 0.284748C1.99603 0.376543 2.07947 0.485947 2.13699 0.606712L1.11372 1.00071L2.13811 0.606712L2.14145 0.614712L2.16483 0.659712L2.2695 0.853712C2.36525 1.02571 2.51334 1.27771 2.71488 1.58271C3.2463 2.38449 3.86951 3.13422 4.57437 3.81971C4.78563 4.02384 5.00474 4.22129 5.23131 4.41171C6.88146 5.80071 9.18745 7.00071 12.2484 7.00071C13.4751 7.00575 14.6918 6.80146 15.8337 6.39871C17.1999 5.91571 18.3435 5.18871 19.281 4.40071C20.5349 3.33218 21.5655 2.0706 22.3241 0.675712L22.3542 0.617712L22.3597 0.606712C22.4788 0.366721 22.6983 0.17847 22.9707 0.0826601C23.2432 -0.0131498 23.5466 -0.00881993 23.8155 0.0947136C24.0844 0.198247 24.2971 0.392665 24.4077 0.635933C24.5182 0.879201 24.5177 1.15177 24.4063 1.39471L24.4041 1.39971L24.3996 1.40771L24.3873 1.43371L24.3428 1.52071C24.0955 1.98329 23.8201 2.4333 23.5177 2.86871C22.9612 3.67166 22.3234 4.42685 21.6126 5.12471L22.5 5.92171C22.709 6.10922 22.8264 6.36359 22.8265 6.62886C22.8266 6.89413 22.7094 7.14857 22.5006 7.33621C22.2918 7.52385 22.0086 7.62932 21.7132 7.62941C21.4178 7.62951 21.1345 7.52422 20.9256 7.33671L19.9903 6.49671C19.3321 6.97451 18.6248 7.39507 17.878 7.75271L18.7488 8.95471C18.8309 9.06474 18.8879 9.18832 18.9164 9.31829C18.9449 9.44826 18.9444 9.58202 18.9149 9.71181C18.8854 9.8416 18.8274 9.96482 18.7444 10.0743C18.6614 10.1838 18.555 10.2774 18.4314 10.3497C18.3078 10.422 18.1694 10.4715 18.0243 10.4953C17.8792 10.5191 17.7303 10.5169 17.5862 10.4886C17.4421 10.4603 17.3057 10.4066 17.1849 10.3306C17.0641 10.2545 16.9614 10.1577 16.8826 10.0457L15.7847 8.53171C15.0287 8.73971 14.2214 8.88671 13.3618 8.95571V10.5007C13.3618 10.7659 13.2445 11.0203 13.0357 11.2078C12.8269 11.3954 12.5437 11.5007 12.2484 11.5007C11.9531 11.5007 11.6698 11.3954 11.461 11.2078C11.2522 11.0203 11.1349 10.7659 11.1349 10.5007V8.95671C10.272 8.88671 9.4647 8.73971 8.71089 8.53171L7.61412 10.0457C7.44945 10.2602 7.19806 10.4085 6.91348 10.459C6.6289 10.5096 6.33358 10.4584 6.09039 10.3164C5.8472 10.1743 5.67534 9.95263 5.61139 9.69851C5.54743 9.44439 5.59643 9.17788 5.74796 8.95571L6.61869 7.75271C5.83926 7.38271 5.13555 6.95271 4.50644 6.49571L3.57113 7.33571C3.36113 7.51787 3.07987 7.61866 2.78792 7.61639C2.49598 7.61411 2.21671 7.50894 2.01026 7.32353C1.80382 7.13812 1.68671 6.88731 1.68418 6.62511C1.68164 6.36292 1.79387 6.11031 1.9967 5.92171L2.88413 5.12471C2.0964 4.35089 1.39872 3.50685 0.801949 2.60571C0.564284 2.24573 0.344711 1.87636 0.143892 1.49871L0.0937862 1.39871L0.0926727 1.39671C0.0893323 1.39671 0.0893324 1.39471 0.00111372 1.00071L0.0904458 1.39571Z"
                          fill="#F4A470"
                        />
                      </svg>
                    )}
                  </span>
                  {errors.password && (
                    <p className="text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="run" className="block font-medium mb-2">
                  Documento de identidad*
                </label>
                <input
                  name="run"
                  type="text"
                  value={formData.run}
                  onChange={handleChange}
                  className="w-full bg-white/75 border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary mb-2"
                />
                {errors.run && <p className="text-red-500">{errors.run}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block font-medium mb-2">
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

            <div className="text-xl mb-8">
              <label htmlFor="homeType" className="block font-medium mb-2">
                ¿Qué espacio tienes disponible para tu nuevo compañero?*
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {opciones.map((opcion) => (
                  <button
                    name="homeType"
                    key={opcion}
                    type="button"
                    onClick={() => setSelected(opcion)}
                    className={`px-4 py-2 rounded-3xl cursor-pointer ${
                      selected === opcion
                        ? "bg-[#767575] text-white"
                        : "border-primary text-[#AAAAAA] bg-white/75"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xl text-[#333333]">
              <div>
                <label className="block font-medium mb-2">
                  ¿Tu condominio o edificio permite mascotas?*
                </label>
                <div className="flex gap-4 mt-1 mb-3">
                  <label className="flex items-center bg-white/75 border-2 border-primary rounded-3xl px-2 py-1 gap-10">
                    Si
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
                    No
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
                  <p className="text-red-500">{errors.allowsPets}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-2">
                  ¿Has tenido mascotas antes?*
                </label>
                <div className="flex gap-4 mt-1 mb-3">
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    Si
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
                    No
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
                  <p className="text-red-500">{errors.hasPets}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">¿Están vacunadas?</label>
                <div className="flex gap-4 mt-1 mb-3">
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    Si
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
                    No
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
                  <p className="text-red-500">{errors.isVaccinated}</p>
                )}
              </div>

              <div>
                <label className="block font-medium">¿Están castradas?</label>
                <div className="flex gap-4 mt-1 mb-3">
                  <label className="flex items-center bg-white/75 border-primary border-2 rounded-3xl px-2 py-1 gap-10">
                    Si
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
                    No
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
                  <p className="text-red-500">{errors.isSterilized}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl text-[#333333]">
              <div>
                <label className="block font-medium mb-2">
                  ¿Cuántas horas al día estará sola la mascota?*
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  step="1"
                  name="hoursAlone"
                  value={formData.hoursAlone}
                  onChange={handleChange}
                  className="w-auto bg-white/75 border-primary px-6 py-1 border-2 rounded-3xl focus:outline-none focus:border-primary"
                />
                {errors.hoursAlone && (
                  <p className="text-red-500">{errors.hoursAlone}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-2">
                  ¿Qué harías si la mascota rompe algo o tiene problemas de
                  comportamiento?*
                </label>
                <input
                  name="petDestroy"
                  type="text"
                  value={formData.petDestroy}
                  onChange={handleChange}
                  className="w-full border-2 bg-white/75 border-primary rounded-3xl p-2 h-24 mb-6 focus:outline-none focus:border-primary"
                />
                {errors.petDestroy && (
                  <p className="text-red-500">{errors.petDestroy}</p>
                )}
              </div>
            </div>

            {serverError && (
              <p className="text-red-600 text-center mb-4">{serverError}</p>
            )}

            <div className="text-right">
              <button
                type="submit"
                className="bg-primary hover:bg-tertiary text-white font-bold mb-6 py-2 px-16 rounded-3xl shadow-lg/20 cursor-pointer transition duration-300 ease-in-out"
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
