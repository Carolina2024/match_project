import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";

const RequestModal = ({ request, onClose }) => {

  if (!request) return null;

  const formattedDate = new Date(request.applicationDate).toLocaleDateString(
    "en-GB"
  );

  const getStatusClass = (status) => {
    return (
      {
        "Por revisar": "bg-[#6c6c6c40]",
        "En proceso": "bg-[#ffa04c40] text-[#FFA04C]",
        Aprobado: "bg-[#329D0140] text-[#35A302]",
        Rechazado: "bg-[#E9171740] text-[#E91717]",
      }[status] || "bg-[#6c6c6c]"
    );
  };

  return (
    <div className="fixed inset-0 bg-[#00000026] backdrop-blur-[3px] flex items-center justify-center z-50 p-3">
      <div className="bg-[#FFFFFF] rounded-[20px] shadow-xl sm:p-7 p-5 relative w-[317px] h-[630px] sm:w-[549px] sm:h-[572px]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-tertiary hover:text-black"
        >
          <FiX size={24} />
        </button>

        <div className="p-0 sm:mt-5 mt-3">
          <h2 className="font-secundary text-[20px] text-tertiary font-bold text-center mb-1">
            Detalle de la solicitud
          </h2>
          <p className="font-primary text-[14px] font-medium text-center text-[#767575cc]  mb-2">
            Información de la solicitud de adopción
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm px-2 mb-2">
            <div className="flex flex-col">
              <p className="font-primary text-[16px] font-semibold text-tertiary mb-1">
                Fecha de la solicitud
              </p>
              <p className="font-secundary text-[14px] font-medium text-[#767575]">
                {formattedDate}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-primary text-[16px] font-semibold text-tertiary mb-1">
                Estado
              </p>
              <span
                className={`flex items-center justify-center font-primary text-[16px] font-semibold w-[100px] h-[28px] rounded-[10px] ${getStatusClass(
                  request.status
                )}`}
              >
                {request.status}
              </span>
            </div>
          </div>

          <div className="rounded-[10px] p-[5px]  gap-[4px] bg-[#FFFBF5] border border-[#7676801F] mb-2">
            <p className="font-primary text-[16px] font-semibold text-[#faaa75] mb-1">
              Información de la mascota
            </p>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="flex flex-col">
                <span className="font-primary text-[14px] font-medium text-[#59514680] mb-1">
                  Mascota
                </span>
                <span className="font-primary text-[16px] font-semibold text-[#767575]">
                  {request.pet.name}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-primary text-[14px] font-medium text-[#59514680] mb-1">
                  ID de mascota
                </span>

                <span className="font-secundary text-[16px] font-semibold text-[#767575]">
                  {request.pet.id}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] p-[7px] bg-[#FFFBF5] border border-[#7676801F]">
            <p className="font-primary text-[16px] font-semibold text-[#faaa75] mb-1">
              Información del adoptante
            </p>

            <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="flex flex-col">
                <span className="font-primary text-[14px] font-medium text-[#59514680] mb-1">
                  Adoptante
                </span>
                <span className="font-primary text-[16px] font-semibold text-[#767575]">
                  {request.user.fullname}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-primary text-[14px] font-medium text-[#59514680] mb-1">
                  ID de adoptante
                </span>
                <span className="font-secundary text-[16px] font-semibold text-[#767575]">
                  {request.user.id}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-primary text-[14px] font-medium text-[#59514680] mb-1">
                  Documento de identidad
                </span>

                <span className="font-secundary text-[16px] font-semibold text-[#767575]">
                  {request.user?.adopter?.identityDocument || "No disponible"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-primary text-[14px] font-medium text-[#59514680] mb-1">
                  Correo
                </span>
                <span className="font-secundary text-[16px] font-semibold text-[#767575] break-words whitespace-normal overflow-hidden">
                  {request.user.email}
                </span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="font-primary text-[14px] font-medium text-[#59514680] mb-1">
                  Dirección y comuna
                </span>

                <span className="font-secundary text-[16px] font-semibold text-[#767575]">
                  {request.user?.adopter?.address || "No disponible"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RequestModal.propTypes = {
  request: PropTypes.object,
  onClose: PropTypes.func,
};

export default RequestModal;
