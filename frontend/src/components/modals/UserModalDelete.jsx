import PropTypes from "prop-types";

const UserModalDelete = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#00000026] backdrop-blur-[3px] z-10"
      ></div>

      <div className="relative bg-[#FFFFFF] p-6 sm:p-6  rounded-[20px] shadow-lg w-full sm:w-[545px] w-[317px] h-[304px] sm:h-[232px] mx-7 sm:mx-auto z-20">
        <h2 className="font-secundary font-bold text-[20px] text-tertiary text-lg mb-4 text-center">
          ¿Estás seguro de eliminar a {user.fullname}?
        </h2>
        <h3 className="font-raleway font-medium text-[14px] text-[#767575] text-center">
          Esta acción no se puede deshacer. Se eliminará permamentemente a{" "}
          {user.fullname}
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-4 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="font-raleway font-bold text-[16px] text-tertiary h-[44px] sm:w-[227px] w-[230px] px-2 py-2 bg-[#FFFFFF] rounded-[10px] hover:bg-gray-100 border border-[#595146] shadow-[3px_3px_4px_rgba(89,81,70,0.5)]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="font-raleway font-bold text-[16px] text-[#FFFFFF] h-[44px] sm:w-[228px] w-[230px] px-2 py-2 bg-[#FF2D2D] text-[#FFFFFF] rounded-[10px] hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

UserModalDelete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  user: PropTypes.shape({
    fullname: PropTypes.string.isRequired,
  }),
};

export default UserModalDelete;
