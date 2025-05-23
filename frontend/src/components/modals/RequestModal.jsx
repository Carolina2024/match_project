import PropTypes from "prop-types";

const RequestModal = ({ request, onClose }) => {

  if (!request) return null;

  const formattedDate = new Date(request.applicationDate).toLocaleDateString(
    "en-GB"
  );

  const getStatusClass = (status) => {
    return (
      {
        "Por revisar": "bg-gray-400",
        "En proceso": "color-bg-orange color-text-process",
        Aprobado: "bg-disponible text-[#35A302]",
        Rechazado: "bg-red-slowly text-red-600",
      }[status] || "bg-gray-300"
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-4xl "
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-1">
          Detalles de la solicitud
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Información de la solicitud de adopción
        </p>

        <div className="flex justify-between items-center mb-6 text-sm">
          <div>
            <p className="text-gray-600 font-semibold">Fecha de la solicitud</p>
            <p>{formattedDate}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold mb-1">Estado</p>
            <span
              className={`text-xs sm:text-sm px-3 py-[2px] rounded-[10px] font-medium text-center whitespace-nowrap ${getStatusClass(
                request.status
              )}`}
            >
              {request.status}
            </span>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded mb-4">
          <p className="text-orange-400  mb-2">Información de la mascota</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Nombre:</span>
              <span>{request.pet.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">
                ID de mascota:
              </span>
              <span>{request.pet?.id}</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded">
          <p className="text-orange-400  mb-2">Información del adoptante</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Adoptante:</span>
              <span>{request.user.fullname}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">
                ID de adoptante:
              </span>
              <span>{request.user?.id}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">
                Documento de identidad:
              </span>
              <span>{request.user?.adopter?.identityDocument || "No disponible"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Correo:</span>
              <span>{request.user.email}</span>
            </div>
            <div className="flex flex-col col-span-2">
              <span className="text-gray-600 font-semibold">
                Dirección y comuna:
              </span>
              <span>{request.user?.adopter?.address || "No disponible"}</span>
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
