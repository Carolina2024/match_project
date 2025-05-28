import PropTypes from "prop-types";

const PetModalDelete = ({ isOpen, onClose, onConfirm, pet }) => {
  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10"
      ></div>

      <div className="relative bg-white p-4 sm:p-6 rounded-[20px] shadow-lg w-full sm:w-[539px] w-[317px] h-[304px] sm:h-[232px] mx-4 z-20 p-6 sm:p-6">
        <h2 className="text-lg font-bold font-secundary text-[20px] text-tertiary mb-2 text-center">
          ¿Estás seguro de eliminar a {pet.name}?
        </h2>
        <h3 className="text-center font-raleway text-[14px] text-[#767575]">
          Esta acción no se puede deshacer. Esta acción eliminara
        </h3>
        <h3 className="text-center text-[#767575]">
          permanentemente a {pet.name} del registro
        </h3>
        <div className="font-raleway text-[16px] text-tertiary font-bold flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            onClick={onClose}
            className="w-[227px] sm:w-[227px] px-4 py-2 bg-white rounded-lg hover:bg-gray-400 border-b-4 border-2 border-gray-400 mb-3 sm:mb-0"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-[227px] sm:w-[227px] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

PetModalDelete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  pet: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PetModalDelete;
