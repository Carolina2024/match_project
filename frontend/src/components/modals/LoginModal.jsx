import { X } from "lucide-react";
import PropTypes from "prop-types"; // Puedes usar un ícono propio o texto

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md mx-auto rounded-xl shadow-lg p-6 relative animate-fade-in">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          <X />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Iniciar Sesión
        </h2>

        {/* Formulario */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border border-gray-300 p-2 rounded"
          />
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded hover:bg-opacity-90 transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
