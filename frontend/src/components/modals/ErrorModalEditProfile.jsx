import PropTypes from "prop-types";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const ErrorModalEditProfile = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-2xl shadow-lg px-10 py-16 w-full max-w-md items-center  text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-tertiary cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-primary text-3xl font-bold mb-10">
          {errorMessage}
        </h2>
      </div>
    </div>
  );
};

ErrorModalEditProfile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ErrorModalEditProfile;
