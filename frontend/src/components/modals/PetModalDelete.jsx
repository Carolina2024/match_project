import PropTypes from "prop-types";

const PetModalDelete = ({ isOpen, onClose, onConfirm, pet }) => {
  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10"
      ></div>

      <div className="relative bg-[#FFFFFF] p-4 sm:p-6 rounded-[20px] shadow-lg w-full sm:w-[539px] w-[317px] h-[304px] sm:h-[232px] mx-4 z-20 p-6 sm:p-6">
        <h2 className="font-bold font-secundary text-[20px] text-tertiary mb-2 text-center">
          ¿Estás seguro de eliminar a {pet.name}?
        </h2>
        <h3 className="text-center font-raleway text-[14px] text-[#767575]">
          Esta acción no se puede deshacer. Esta acción eliminara
          permanentemente a {pet.name} del registro
        </h3>
        <div className="font-raleway text-[16px] text-tertiary font-bold flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            onClick={onClose}
            className="w-[227px] sm:w-[227px] h-[44px] px-4 py-2 bg-[#FFFFFF] rounded-[10px] hover:bg-gray-100 border border-[#595146] shadow-[3px_3px_4px_rgba(89,81,70,0.5)] mb-3 sm:mb-0"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-[228px] sm:w-[228px] h-[44px] px-4 py-2 bg-[#FF2D2D] text-[#FFFFFF]  rounded-[10px] hover:bg-red-600"
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
