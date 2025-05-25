import PropTypes from "prop-types";

const PetDetailsModal = ({ isOpen, onClose, pet }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:justify-start bg-black/30 backdrop-blur-[2px] md:px-80 sm:px-2 overflow-auto p-5">
      <div className="sm:ml-auto mt-20 bg-white rounded-xl sm:p-6 p-2 w-full max-w-sm sm:max-w-[200px] md:max-w-lg lg:max-w-4xl relative shadow-lg sm:mt-20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-4xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-1 md:text-left text-center font-secundary text-[20px] text-tertiary max-w-[250px] sm:max-w-[300px] mx-auto">
          Información de la mascota
        </h2>
        <p className="text-sm font-medium  mb-4 md:text-left text-center font-secundary text-[14px] text-[#767575]">
          Fecha del ingreso: {pet?.admissionDate}
        </p>

        {(pet?.photoUrls || pet?.photos)?.length > 0 && (
          <div className="flex flex-wrap justify-start gap-4 mb-4">
            {(pet.photoUrls || pet.photos).map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Foto de ${pet.name}`}
                className="w-[100px] h-[88px] md:w-[150px] md:h-[120px] object-cover rounded shadow"
              />
            ))}
          </div>
        )}

        <div className="mb-4">
          <h3 className="font-semibold mb-1  font-Raleway text-[16px] text-tertiary">
            Historia de la mascota
          </h3>
          <p className="text-sm font-normal font-raleway text-[14px] text-[#767575]">
            {pet?.story}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mt-4 font-Raleway text-[16px] text-tertiary font-semibold">
          <div className="flex flex-col">
            <span className="text-ls">Mascota</span>
            <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3">
              {pet?.name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls">Especie</span>
            <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3">
              {pet?.species}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls">Raza</span>
            <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3">
              {pet?.breed}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls">Edad</span>
            <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3">
              {pet?.age}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-ls">Sexo</span>
            <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3">
              {pet?.sex}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls">Nivel actividad</span>
            <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3">
              {pet?.energy}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls">Peso</span>
            <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3">
              {pet?.kg} Kg
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls">Tamaño</span>
            <span className="text-sm font-raleway font-normal text-[14px] text-[#767575] mt-3">
              {pet?.size}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-x-33 mt-3">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Estado</h3>
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-lg ${
                pet?.status === "Disponible"
                  ? "font-raleway font-semibold text-[16px] text-[#35a302] bg-[rgba(53,163,2,0.25)] mt-3"
                  : pet?.status === "En Proceso"
                  ? "bg-[rgba(255,128,44,0.25)] font-raleway text-[#FF802C] font-semibold text-[16px] mt-3"
                  : pet?.status === "Adoptado"
                  ? "bg-[rgba(108,108,108,0.25)] font-raleway text-[#6C6C6C] font-semibold text-[16px] mt-3"
                  : "bg-[rgba(108,108,108,0.25)] font-raleway text-[#6C6C6C] font-semibold text-[16px]"
              }`}
            >
              {pet?.status}
            </span>
          </div>

          <div>
            <h3 className="font-Raleway text-[16px] text-tertiary font-semibold mb-1 text-left  mt-2">
              Rasgos de la mascota
            </h3>
            <div className="flex flex-wrap gap-7">
              {pet?.traits?.map((trait, i) => (
                <span
                  key={i}
                  className="font-raleway font-semibold text-[16px] text-[#FFFFFF] bg-[#FF9855] px-3 py-1 rounded-lg text-xs text-left mt-1"
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
              <span className="font-raleway font-semibold text-[16px] text-[#FFFFFF] bg-tertiary px-3 py-1 rounded-lg text-xs mt-3 mb-2">
                Vacunado
              </span>
            )}
            {pet?.isSterilized && (
              <span className="font-raleway font-semibold text-[16px] text-[#FFFFFF] bg-tertiary px-3 py-1 rounded-lg text-xs mt-3 mb-2">
                Esterilizado
              </span>
            )}
            {pet?.isDewormed && (
              <span className="font-raleway font-semibold text-[16px] text-[#FFFFFF] bg-tertiary px-3 py-1 rounded-lg text-xs mt-3 mb-2">
                Desparasitado
              </span>
            )}
            {pet?.hasMicrochip && (
              <span className="font-raleway font-semibold text-[16px] text-[#FFFFFF] bg-tertiary px-3 py-1 rounded-lg text-xs mt-3 mb-2">
                Con microchip
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
  );
};

PetDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pet: PropTypes.object.isRequired,
};

export default PetDetailsModal;
