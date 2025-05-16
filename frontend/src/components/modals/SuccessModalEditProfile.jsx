import PropTypes from "prop-types";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessModalEditProfile = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-2xl shadow-lg px-10 py-16 w-full max-w-md  text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-tertiary cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-primary text-3xl font-bold mb-10">
          ¡Se ha actualizado tu perfil!
        </h2>

        <Link
            to="/"
          onClick={onConfirm}
          className="bg-primary hover:bg-tertiary cursor-pointer text-white font-semibold py-2 px-6 rounded-full text-basetransition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

SuccessModalEditProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default SuccessModalEditProfile;
