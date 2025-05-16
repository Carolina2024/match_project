import PropTypes from "prop-types";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const RecoveryConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white p-10 pt-20 rounded-3xl shadow-lg w-full max-w-md sm:max-w-lg text-center border border-[#CBCBCB]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-tertiary text-2xl cursor-pointer"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-3 text-tertiary font-secundary -mt-6">
          ¡Enlace enviado!
        </h2>
        <p className="text-primary text-2xl px-2 font-bold">
          Hemos enviado un enlance para restablecer tu contraseña a tu correo
          electrónico.
        </p>
        <p className="text-primary text-2xl mt-4 font-bold mb-8">
          Por favor, revisa tu bandeja de entrada o la carpeta de spam.
        </p>

        <Link
        to="/"
          onClick={onClose}
          className="mt-8 px-10 py-2 bg-primary text-white text-lg font-semibold cursor-pointer rounded-full shadow-md hover:bg-primary/90 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

RecoveryConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecoveryConfirmationModal;
