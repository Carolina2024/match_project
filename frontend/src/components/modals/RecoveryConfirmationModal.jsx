import PropTypes from "prop-types";
import { X } from "lucide-react";
import logo from "../assets/logo.png";

const RecoveryConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white p-10 pt-20 rounded-3xl shadow-lg w-full max-w-md sm:max-w-lg text-center border border-[#CBCBCB]">
        {/* Logo */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="w-20 h-20 rounded-full object-cover drop-shadow-md"
          />
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary hover:text-tertiary text-2xl"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-3 text-tertiary font-secundary">
          Enlace enviado
        </h2>
        <p className="text-[#595146] text-base px-2">
          Te hemos enviado un enlace de restablecimiento a tu correo.
          <br />
          Por favor, revisa tu bandeja de entrada o la carpeta de spam.
        </p>
        <p className="text-[#767575] text-sm mt-4">
          Una vez recibido, haz clic en el botón del correo, ingresa el código
          que te proporcionamos y define tu nueva contraseña.
        </p>

        <button
          onClick={onClose}
          className="mt-8 w-full py-2 bg-primary text-white text-lg font-semibold rounded-full shadow-md hover:bg-primary/90 transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

RecoveryConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RecoveryConfirmationModal;
