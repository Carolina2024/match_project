import PropTypes from "prop-types";

const PetDetailsModal = ({ isOpen, onClose, pet }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  bg-black/30 backdrop-blur-[2px] md:px-80 sm:px-2 overflow-auto p-8">
      <div className="sm:ml-auto mt-20 bg-white rounded-xl sm:p-6 p-4 w-full max-w-sm sm:max-w-[200px] md:max-w-lg lg:max-w-4xl relative shadow-lg sm:mt-20">
        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-4 text-tertiary hover:text-black text-4xl"
        >
          &times;
        </button>
        <div className="mt-8 sm:mt-4 p-4 sm:p-2">
          <h2 className="text-xl font-bold mb-1 text-center sm:text-left font-secundary text-[20px] text-tertiary max-w-[250px] sm:max-w-[300px] mx-auto sm:mx-0">
            Información de la mascota
          </h2>
          <p className="text-sm font-medium mb-8 sm:mb-4 md:text-left text-center font-secundary text-[14px] text-[#767575]">
            <span className="block md:inline">Fecha del</span>{" "}
            <span className="block md:inline">
              ingreso:{" "}
              <span className="whitespace-nowrap">{pet?.admissionDate}</span>
            </span>
          </p>

          {(pet?.photoUrls || pet?.photos)?.length > 0 && (
            <div className="flex flex-nowrap justify-start gap-4 mb-8 sm:mb-4">
              {(pet.photoUrls || pet.photos).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Foto de ${pet.name}`}
                  className="w-[110px] h-[88px] md:w-[150px] md:h-[120px] object-cover rounded-lg shadow"
                />
              ))}
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-semibold mb-1  font-Raleway text-[16px] text-tertiary">
              Historia de la mascota
            </h3>
            <p
              className="text-sm font-normal font-raleway text-[14px] text-[#767575] ml-0 md:ml-2 mt-2 mb-8 sm:mb-4
              bg-white rounded-[10px] p-4 border w-[255px] h-[169px]
      md:bg-transparent md:border-0 md:p-0 md:w-auto md:h-auto
    "
              style={{ borderColor: "rgba(118, 117, 117, 0.8)" }}
            >
              {pet?.story}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mt-4 font-Raleway text-[16px] text-tertiary font-semibold">
            <div className="flex flex-col">
              <span className="text-ls">Mascota</span>
              <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3 ml-0 md:ml-2 mb-5 sm:mb-4">
                {pet?.name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-ls">Especie</span>
              <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3 ml-0 md:ml-2 mb-5 sm:mb-4">
                {pet?.species}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-ls">Raza</span>
              <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3 ml-0 md:ml-2 mb-5 sm:mb-4">
                {pet?.breed}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-ls">Edad</span>
              <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3 ml-0 md:ml-2 mb-5 sm:mb-4">
                {pet?.age}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-ls">Sexo</span>
              <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3 ml-0 md:ml-2 mb-5 sm:mb-4">
                {pet?.sex}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-ls">Nivel actividad</span>
              <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3 ml-0 md:ml-2 mb-5 sm:mb-4">
                {pet?.energy}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-ls">Peso</span>
              <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3 ml-0 md:ml-2 mb-5 sm:mb-4">
                {pet?.kg} Kg
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-ls">Tamaño</span>
              <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3 ml-0 md:ml-2 mb-5 sm:mb-4">
                {pet?.size}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-x-33 mt-3">
            <div>
              <h3 className="font-semibold text-tertiary mb-1">Estado</h3>
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-lg ml-0 md:ml-2 mb-5 sm:mb-4 ${
                  pet?.status === "Disponible"
                    ? "font-raleway font-semibold text-[16px] text-green-text bg-[rgba(53,163,2,0.25)] mt-3"
                    : pet?.status === "En Proceso"
                    ? "bg-[rgba(255,128,44,0.25)] font-raleway text-text-orange-process font-semibold text-[16px] mt-3"
                    : pet?.status === "Adoptado"
                    ? "bg-[rgba(108,108,108,0.25)] font-raleway text-gray-icon font-semibold text-[16px] mt-3"
                    : "bg-[rgba(108,108,108,0.25)] font-raleway text-gray-icon font-semibold text-[16px]"
                }`}
              >
                {pet?.status}
              </span>
            </div>

            <div className="text-left md:ml-[-40px] ml-0">
              <h3 className="font-Raleway text-[16px] text-tertiary font-semibold mb-1 mt-2">
                Rasgos de la mascota
              </h3>
              <div className="flex flex-wrap gap-3 justify-start">
                {pet?.traits?.map((trait, i) => (
                  <span
                    key={i}
                    className="font-raleway font-semibold text-[16px] text-white bg-[#FF9855] px-3 py-1 rounded-lg ml-0 md:ml-2 mt-4 mb-5 sm:mb-4"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-raleway font-semibold text-[16px] text-tertiary mb-1">
              Entrega de mascota
            </h3>
            <div className="flex flex-wrap gap-2">
              {pet?.isVaccinated && (
                <span className="font-raleway font-semibold text-[16px] text-white bg-tertiary px-3 py-1 rounded-lg text-xs mt-3 mb-2 ml-0 md:ml-2">
                  Vacunado
                </span>
              )}
              {pet?.isSterilized && (
                <span className="font-raleway font-semibold text-[16px] text-white bg-tertiary px-3 py-1 rounded-lg text-xs mt-3 mb-2">
                  Esterilizado
                </span>
              )}
              {pet?.isDewormed && (
                <span className="font-raleway font-semibold text-[16px] text-white bg-tertiary px-3 py-1 rounded-lg text-xs mt-3 mb-2">
                  Desparasitado
                </span>
              )}
              {pet?.hasMicrochip && (
                <span className="font-raleway font-semibold text-[16px] text-white bg-tertiary px-3 py-1 rounded-lg text-xs mt-3 mb-2">
                  Con chip
                </span>
              )}

              {!pet?.isVaccinated &&
                !pet?.isSterilized &&
                !pet?.isDewormed &&
                !pet?.hasMicrochip && (
                  <p className="text-sm text-gray-500">
                    No se registraron condiciones de entrega.
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PetDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pet: PropTypes.object.isRequired,
};

export default PetDetailsModal;
