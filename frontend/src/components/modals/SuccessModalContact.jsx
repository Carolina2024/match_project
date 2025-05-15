import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function SuccessModalContact({ onClose }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#F9F9F9]  rounded-xl shadow-lg relative max-w-md py-14 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
        >
          <X size={20} />
        </button>
        <h2 className="text-primary px-30 text-2xl font-bold font-secundary mb-0">
          ¡Se ha enviado!
        </h2>
        <h2 className="text-primary text-2xl font-bold font-secundary mb-12">
          tu mensaje con éxito!
        </h2>
        <button
          onClick={handleGoHome}
          className="bg-primary hover:bg-primary/90 cursor-pointer text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

SuccessModalContact.propTypes = {
  onClose: PropTypes.func.isRequired,
};
