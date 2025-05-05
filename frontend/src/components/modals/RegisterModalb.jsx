import { useState } from "react";
import PropTypes from "prop-types";

const opcionesEnergia = ["Tranquilo", "Moderado", "Muy activo"];
const opcionesCaracter = ["Cariñoso", "Independiente", "Protector", "Juguetón"];
const opcionesPreferencia = ["Con niños", "Con perros", "Con gatos"];

const RegisterModalb = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    hasVeterinarian: "",
    allowsVisit: "",
    isResponsibleAdoption: "",
    energy: "",
    character: [],
    compatibility: "",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEnergySelect = (energy) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      energy: energy,
    }));
  };

  const toggleSeleccion = (opcion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      character: prevFormData.character.includes(opcion)
        ? prevFormData.character.filter((item) => item !== opcion)
        : [...prevFormData.character, opcion],
    }));
  };

  const handleCompatibilitySelect = (opcion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      compatibility: opcion,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    if (!formData.hasVeterinarian)
      nuevosErrores.hasVeterinarian = "Selecciona una opción.";
    if (!formData.allowsVisit)
      nuevosErrores.allowsVisit = "Selecciona una opción.";
    if (!formData.isResponsibleAdoption)
      nuevosErrores.isResponsibleAdoption = "Debes aceptar el compromiso.";
    if (!formData.energy) nuevosErrores.energy = "Selecciona una energía.";
    if (formData.character.length === 0)
      nuevosErrores.character = "Selecciona al menos un carácter.";
    if (!formData.compatibility)
      nuevosErrores.compatibility = "Selecciona una preferencia.";

    setErrores(nuevosErrores);
  };
  const [formVisible] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] bg-opacity-20 flex items-center justify-center px-4">
      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto my-7 p-6 bg-white/90 rounded-2xl shadow-2xl"
        >
          <div className="flex justify-end">
            <button
              type="button"
              className="text-[#595146] focus:outline-none"
              onClick={onClose}
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
                  strokeWidth="2"
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
              <div className=" w-3 h-3 rounded-full border border-gray-800" />
              <div className="border-t border-gray-800 w-6" />
              <div className="w-3 h-3 rounded-full  bg-primary" />
            </div>
          </div>

          <div className="px-7 text-base">
            <div className="mb-4">
              <label className="block mb-2">
                ¿Estás dispuesto/a a llevarlo al veterinario cuando sea
                necesario? (vacunarlo, desparasitarlo regularmente, castrarlo o
                esterilizar)?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center gap-2 px-3 py-1 border border-primary rounded-3xl bg-white/75">
                  <input
                    type="radio"
                    name="hasVeterinarian"
                    value="true"
                    checked={formData.hasVeterinarian === "true"}
                    onChange={handleChange}
                    className="accent-[#767575]"
                  />
                  Si
                </label>

                <label className="flex items-center gap-2 px-3 py-1 border border-primary rounded-3xl bg-white/75">
                  <input
                    type="radio"
                    name="hasVeterinarian"
                    value="false"
                    checked={formData.hasVeterinarian === "false"}
                    onChange={handleChange}
                    className="accent-[#767575]"
                  />
                  No
                </label>
              </div>
              {errores.hasVeterinarian && (
                <p className="text-red-600 text-sm mt-1">
                  {errores.hasVeterinarian}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                ¿Estás dispuesto/a recibir una visita o llamado de seguimiento
                después de la adopción?
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center gap-2 px-3 py-1 border border-primary rounded-3xl bg-white/75">
                  <input
                    type="radio"
                    name="allowsVisit"
                    value="true"
                    checked={formData.allowsVisit === "true"}
                    onChange={handleChange}
                    className="accent-[#767575]"
                  />
                  Si
                </label>

                <label className="flex items-center gap-2 px-3 py-1 border border-primary rounded-3xl bg-white/75">
                  <input
                    type="radio"
                    name="allowsVisit"
                    value="false"
                    checked={formData.allowsVisit === "false"}
                    onChange={handleChange}
                    className="accent-[#767575]"
                  />
                  No
                </label>
              </div>
              {errores.allowsVisit && (
                <p className="text-red-500 text-sm mt-1">
                  {errores.allowsVisit}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                ¿Estás dispuesto/a firmar un compromiso de adopción
                responsable?*
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center gap-2 px-3 py-1 border border-primary rounded-3xl bg-white/75">
                  <input
                    type="radio"
                    name="isResponsibleAdoption"
                    value="true"
                    checked={formData.isResponsibleAdoption === "true"}
                    onChange={handleChange}
                    className="accent-[#767575]"
                  />
                  Si
                </label>

                <label className="flex items-center gap-2 px-3 py-1 border border-primary rounded-3xl bg-white/75">
                  <input
                    type="radio"
                    name="isResponsibleAdoption"
                    value="false"
                    checked={formData.isResponsibleAdoption === "false"}
                    onChange={handleChange}
                    className="accent-[#767575]"
                  />
                  No
                </label>
              </div>
              {errores.isResponsibleAdoption && (
                <p className="text-red-600 text-sm mt-1">
                  {errores.isResponsibleAdoption}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                ¿Qué tipo de mascota estás buscando?*
              </label>
              <div className="mb-2">
                <label className="block font-bold mb-1">Energia</label>
                <div className="flex space-x-2">
                  {opcionesEnergia.map((energy) => (
                    <button
                      name="energy"
                      key={energy}
                      type="button"
                      onClick={() => handleEnergySelect(energy)}
                      className={`flex items-center px-4 py-1 rounded-full border-1 ${
                        formData.energy === energy
                          ? "bg-[#767575] text-white border-primary"
                          : "border-primary bg-white/75 hover:bg-[#767575]"
                      }`}
                    >
                      {formData.energy === energy && (
                        <svg
                          width="17"
                          height="10"
                          viewBox="0 0 17 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.6453 0.225837C15.8505 0.393738 15.9807 0.636286 16.0071 0.90014C16.0336 1.16399 15.9541 1.42755 15.7863 1.63284L6.78629 12.6328C6.69783 12.741 6.58769 12.8294 6.46297 12.8923C6.33826 12.9553 6.20174 12.9914 6.0622 12.9984C5.92267 13.0054 5.78323 12.983 5.65286 12.9328C5.52249 12.8826 5.40409 12.8056 5.30529 12.7068L0.305288 7.70684C0.209778 7.61459 0.133596 7.50425 0.0811869 7.38224C0.0287779 7.26024 0.00119157 7.12902 3.77571e-05 6.99624C-0.00111606 6.86346 0.0241854 6.73178 0.0744663 6.60888C0.124747 6.48599 0.199 6.37434 0.292893 6.28044C0.386786 6.18655 0.498438 6.1123 0.621334 6.06202C0.744231 6.01173 0.87591 5.98643 1.00869 5.98759C1.14147 5.98874 1.27269 6.01633 1.39469 6.06874C1.5167 6.12114 1.62704 6.19733 1.71929 6.29284L5.93829 10.5118L14.2383 0.366838C14.4062 0.161587 14.6487 0.0314286 14.9126 0.00498697C15.1764 -0.0214547 15.44 0.0579856 15.6453 0.225837Z"
                            fill="white"
                          />
                        </svg>
                      )}
                      {energy}
                    </button>
                  ))}
                </div>
                {errores.energy && (
                  <p className="text-red-600 text-sm mt-1">{errores.energy}</p>
                )}
              </div>

              <div className="mb-2">
                <label className="block font-bold mb-1">Carácter</label>
                <div className="flex flex-wrap gap-2">
                  {opcionesCaracter.map((opcion) => (
                    <button
                      name="character"
                      key={opcion}
                      type="button"
                      onClick={() => toggleSeleccion(opcion)}
                      className={`flex items-center px-4 py-1 rounded-full border-1 ${
                        formData.character.includes(opcion)
                          ? "bg-[#767575] text-white border-primary"
                          : "border-primary bg-white/75 hover:bg-[#767575]"
                      }`}
                    >
                      {formData.character.includes(opcion) && (
                        <svg
                          width="17"
                          height="10"
                          viewBox="0 0 17 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.6453 0.225837C15.8505 0.393738 15.9807 0.636286 16.0071 0.90014C16.0336 1.16399 15.9541 1.42755 15.7863 1.63284L6.78629 12.6328C6.69783 12.741 6.58769 12.8294 6.46297 12.8923C6.33826 12.9553 6.20174 12.9914 6.0622 12.9984C5.92267 13.0054 5.78323 12.983 5.65286 12.9328C5.52249 12.8826 5.40409 12.8056 5.30529 12.7068L0.305288 7.70684C0.209778 7.61459 0.133596 7.50425 0.0811869 7.38224C0.0287779 7.26024 0.00119157 7.12902 3.77571e-05 6.99624C-0.00111606 6.86346 0.0241854 6.73178 0.0744663 6.60888C0.124747 6.48599 0.199 6.37434 0.292893 6.28044C0.386786 6.18655 0.498438 6.1123 0.621334 6.06202C0.744231 6.01173 0.87591 5.98643 1.00869 5.98759C1.14147 5.98874 1.27269 6.01633 1.39469 6.06874C1.5167 6.12114 1.62704 6.19733 1.71929 6.29284L5.93829 10.5118L14.2383 0.366838C14.4062 0.161587 14.6487 0.0314286 14.9126 0.00498697C15.1764 -0.0214547 15.44 0.0579856 15.6453 0.225837Z"
                            fill="white"
                          />
                        </svg>
                      )}
                      {opcion}
                    </button>
                  ))}
                </div>
                {errores.character && (
                  <p className="text-red-600 text-sm mt-1">
                    {errores.character}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <label className="block font-bold mb-1">Compatibilidad</label>
                <div className="flex space-x-2">
                  {opcionesPreferencia.map((opcion) => (
                    <button
                      name="compatibility"
                      key={opcion}
                      type="button"
                      onClick={() => handleCompatibilitySelect(opcion)}
                      className={`flex items-center px-4 py-1 rounded-full border border-primary transition-colors ${
                        formData.compatibility === opcion
                          ? "bg-[#767575] text-white border-primary"
                          : "bg-white/75 hover:bg-[#767575]"
                      }`}
                    >
                      {formData.compatibility === opcion && (
                        <svg
                          width="17"
                          height="10"
                          viewBox="0 0 17 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.6453 0.225837C15.8505 0.393738 15.9807 0.636286 16.0071 0.90014C16.0336 1.16399 15.9541 1.42755 15.7863 1.63284L6.78629 12.6328C6.69783 12.741 6.58769 12.8294 6.46297 12.8923C6.33826 12.9553 6.20174 12.9914 6.0622 12.9984C5.92267 13.0054 5.78323 12.983 5.65286 12.9328C5.52249 12.8826 5.40409 12.8056 5.30529 12.7068L0.305288 7.70684C0.209778 7.61459 0.133596 7.50425 0.0811869 7.38224C0.0287779 7.26024 0.00119157 7.12902 3.77571e-05 6.99624C-0.00111606 6.86346 0.0241854 6.73178 0.0744663 6.60888C0.124747 6.48599 0.199 6.37434 0.292893 6.28044C0.386786 6.18655 0.498438 6.1123 0.621334 6.06202C0.744231 6.01173 0.87591 5.98643 1.00869 5.98759C1.14147 5.98874 1.27269 6.01633 1.39469 6.06874C1.5167 6.12114 1.62704 6.19733 1.71929 6.29284L5.93829 10.5118L14.2383 0.366838C14.4062 0.161587 14.6487 0.0314286 14.9126 0.00498697C15.1764 -0.0214547 15.44 0.0579856 15.6453 0.225837Z"
                            fill="white"
                          />
                        </svg>
                      )}
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
              {errores.compatibility && (
                <p className="text-red-600 text-sm mt-1">
                  {errores.compatibility}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 accent-[#767575] bg-[#767575]"
                  name="termsAccepted"
                />
                <span className="ml-2 text-sm">
                  Acepto los términos y condiciones
                </span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-white/75 hover:bg-[#767575] text-primary  py-1 px-10 border-1 border-primary rounded-3xl focus:outline-none focus:shadow-primary"
                type="button"
              >
                Atrás
              </button>
              <button
                className="bg-primary hover:bg-[#767575]  text-white font-semibold py-1 px-10 rounded-3xl"
                type="submit"
              >
                Finalizar
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

RegisterModalb.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RegisterModalb;
