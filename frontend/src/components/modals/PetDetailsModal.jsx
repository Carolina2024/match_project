import PropTypes from "prop-types";

const PetDetailsModal = ({ isOpen, onClose, pet }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 overflow-auto">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-4xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-1 text-gray-800 ">
          Información de la mascota
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Fecha del ingreso: {pet?.admissionDate}
        </p>

        {(pet?.photoUrls || pet?.photos)?.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-4">
            {(pet.photoUrls || pet.photos).map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Foto de ${pet.name}`}
                className="w-24 h-24 object-cover rounded shadow"
              />
            ))}
          </div>
        )}

        <div className="mb-4">
          <h3 className="font-semibold mb-1 text-gray-700">
            Historia de la mascota
          </h3>
          <p className="text-sm text-gray-600">{pet?.story}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mt-4">
          <div className="flex flex-col">
            <span className="text-ls text-black-500 font-semibold">
              Mascota
            </span>
            <span className="text-sm text-gray-800">{pet?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls text-black-500 font-semibold">
              Especie
            </span>
            <span className="text-sm text-gray-800">{pet?.species}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls text-black-500 font-semibold">Raza</span>
            <span className="text-sm text-gray-800">{pet?.breed}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls text-black-500 font-semibold">Edad</span>
            <span className="text-sm text-gray-800">{pet?.age}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-ls text-black-500 font-semibold">Sexo</span>
            <span className="text-sm text-gray-800">{pet?.sex}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls text-black-500 font-semibold">
              Nivel actividad
            </span>
            <span className="text-sm text-gray-800">{pet?.energy}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls text-black-500 font-semibold">Peso</span>
            <span className="text-sm text-gray-800">{pet?.kg} Kg</span>
          </div>
          <div className="flex flex-col">
            <span className="text-ls text-black-500 font-semibold">Tamaño</span>
            <span className="text-sm text-gray-800">{pet?.size}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Estado</h3>
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-lg ${
                pet?.status === "Disponible"
                  ? "bg-disponible color-text-disponible"
                  : pet?.status === "En Proceso"
                  ? "color-bg-orange color-text-process"
                  : pet?.status === "Adoptada"
                  ?  "color-bg-gray text-[#6C6C6C]"
                  :  "color-bg-gray text-[#6C6C6C]"
              }`}
            >
              {pet?.status}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-1">
              Rasgos de la mascota
            </h3>
            <div className="flex flex-wrap gap-2">
              {pet?.traits?.map((trait, i) => (
                <span
                  key={i}
                  className="bg-[#FF9855] text-white px-3 py-1 rounded-lg text-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-1 text-gray-700">
            Entrega de mascota
          </h3>
          <div className="flex flex-wrap gap-2">
            {pet?.isVaccinated && (
              <span className="bg-[#595146] text-white px-3 py-1 rounded-lg text-xs">
                Vacunado
              </span>
            )}
            {pet?.isSterilized && (
              <span className="bg-[#595146] text-white px-3 py-1 rounded-lg text-xs">
                Esterilizado
              </span>
            )}
            {pet?.isDewormed && (
              <span className="bg-[#595146] text-white px-3 py-1 rounded-lg text-xs">
                Desparasitado
              </span>
            )}
            {pet?.hasMicrochip && (
              <span className="bg-[#595146] text-white px-3 py-1 rounded-lg text-xs">
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
