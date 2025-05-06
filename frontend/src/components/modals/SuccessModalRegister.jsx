import PropTypes from "prop-types";

const SuccessModalRegister = ({ isOpen, onIngresar }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
      fixed inset-0 z-50
      bg-black/50 backdrop-blur-[4px]
      flex items-center justify-center
      px-4
    "
    >
      <div
        className="
        bg-[#F9F9F9] rounded-2xl shadow-xl w-full max-w-lg p-12 text-center
      "
      >
        <h2 className="text-3xl font-bold font-secundary text-primary mb-6">
          Ya te encuentras registrado en Patas Pirque
        </h2>
        <button
          type="button"
          onClick={onIngresar}
          className="
            bg-primary text-white font-semibold
            px-10 py-2 rounded-full shadow-xl/20
            hover:bg-primary/90 transition cursor-pointer
          "
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

SuccessModalRegister.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onIngresar: PropTypes.func.isRequired,
};

export default SuccessModalRegister;
