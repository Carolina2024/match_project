import PropTypes from "prop-types";

const MatchDetailModal = ({ solicitud, onClose, onStatusChange }) => {
  if (!solicitud) return null;

  const estado = solicitud.status;
  const fecha = new Date(solicitud.applicationDate).toLocaleDateString("es-ES");


  const renderBotones = () => {
    const botones = [];
    const tamañoClase =
      estado === "En proceso" ? "text-lg px-8 py-3" : "text-sm px-6 py-2";
  
    if (estado === "Por revisar") {
      botones.push(
        <button
          key="En proceso"
          onClick={() => onStatusChange("En proceso")}
          className={`bg-orange-500 text-white rounded font-semibold shadow-md hover:bg-orange-600 ${tamañoClase}`}
        >
          En proceso
        </button>
      );
    }
  
    if (estado === "Por revisar" || estado === "En proceso") {
      botones.push(
        <button
          key="Aprobado"
          onClick={() => onStatusChange("Aprobado")}
          className={`bg-green-600 text-white rounded font-semibold shadow-md hover:bg-green-700 ${tamañoClase}`}
        >
          Aprobar
        </button>
      );
      botones.push(
        <button
          key="Rechazado"
          onClick={() => onStatusChange("Rechazado")}
          className={`bg-red-600 text-white rounded font-semibold shadow-md hover:bg-red-700 ${tamañoClase}`}
        >
          Rechazar
        </button>
      );
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] mt-6">
        {botones}
      </div>
    );
  };
  

  const getEstadoClase = (estado) => {
    return {
      "Por revisar": "bg-gray-400",
      "En proceso": "bg-orange-400",
      Aprobado: "bg-green-500",
      Rechazado: "bg-red-500",
    }[estado] || "bg-gray-300";
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
          Detalle de la solicitud
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Información de la solicitud de adopción
        </p>

        <div className="flex justify-between items-center mb-6 text-sm">
          <div>
            <p className="text-gray-600 font-semibold">Fecha de la solicitud</p>
            <p>{fecha}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Estado</p>
            <span
              className={`text-white px-3 py-1 rounded-full font-semibold text-sm ${getEstadoClase(
                estado
              )}`}
            >
              {estado}
            </span>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded mb-4">
          <p className="text-orange-600 font-bold mb-2">
            Información de la mascota
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>
              <span className="text-gray-600">Mascota:</span>{" "}
              {solicitud.pet.name}
            </p>
            <p>
              <span className="text-gray-600">ID de mascota:</span>{" "}
              {solicitud.petId}
            </p>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded">
          <p className="text-orange-600 font-bold mb-2">
            Información del adoptante
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p>
              <span className="text-gray-600">Adoptante:</span>{" "}
              {solicitud.user.fullname}
            </p>
            <p>
              <span className="text-gray-600">ID de adoptante:</span>{" "}
              {solicitud.userId}
            </p>
            <p>
              <span className="text-gray-600">Correo:</span>{" "}
              {solicitud.user.email}
            </p>
            <p>
              <span className="text-gray-600">Dirección y comuna:</span>{" "}
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>

        {renderBotones()}
      </div>
    </div>
  );
};

MatchDetailModal.propTypes = {
  solicitud: PropTypes.object,
  onClose: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default MatchDetailModal;
