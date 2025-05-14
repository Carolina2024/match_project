import PropTypes from "prop-types";
import { getUserById } from "../../api/userService";
import { useEffect, useState } from "react";

const MatchDetailModal = ({ solicitud, onClose, onStatusChange }) => {
  const [adopter, setAdopter] = useState(null);

  useEffect(() => {
    const fetchAdopter = async () => {
      try {
        const data = await getUserById(solicitud.userId);
        setAdopter(data.adopter || null);
      } catch (err) {
        console.error("Error al obtener adopter:", err.message);
      }
    };

    if (solicitud?.userId) {
      fetchAdopter();
    }
  }, [solicitud?.userId]);

  if (!solicitud) return null;

  const estado = solicitud.status;
  const fecha = new Date(solicitud.applicationDate).toLocaleDateString("es-ES");

  const renderBotones = () => {
    const botones = [];
  

if (estado === "Por revisar") {
  botones.push(
    <button
      key="EnProceso"
      onClick={() => onStatusChange("En proceso")}
      className="min-w-[120px] px-6 py-2 text-base font-semibold rounded-[10px] shadow-md bg-[#FF802C] text-white hover:bg-orange-600 border border-[#FF802C]"
    >
      En proceso
    </button>
  );
}

if (estado === "Por revisar" || estado === "En proceso") {
  botones.push(
    <button
      key="Aprobar"
      onClick={() => onStatusChange("Aprobado")}
      className={`min-w-[120px] px-6 py-2 text-base font-semibold rounded-[10px] shadow-md border transition text-center ${
        estado === "En proceso"
          ? "bg-[#2E9002] text-white  hover:bg-green-600"
          : "bg-white text-green-500 border-green-500 hover:bg-green-100"
      }`}
    >
      Aprobar
    </button>
  );
}

if (estado === "Por revisar" || estado === "En proceso") {
  botones.push(
    <button
      key="Rechazado"
      onClick={() => onStatusChange("Rechazado")}
      className="min-w-[120px] px-6 py-2 text-base font-semibold rounded-[10px] shadow-md bg-white text-[#595146] border border-[#595146] hover:bg-gray-100"
    >
      Rechazar
    </button>
  );
}

  
    const colClass =
      botones.length === 3
        ? "sm:grid-cols-3"
        : botones.length === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-1";
  
    return (
      <div className={`grid grid-cols-1 ${colClass} gap-4 mt-6`}>
        {botones}
      </div>
    );
  };
  

  const getEstadoClase = (estado) => {
    return (
      {
        "Por revisar": "bg-gray-200 text-gray-500",
        "En proceso": "bg-[#FF802C] text-white",
        Aprobado: "bg-green-500 text-white",
        Rechazado: "bg-red-400 text-white",
      }[estado] || "bg-gray-300 text-white"
    );
  };
  

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-4xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-1">
          Detalle de la solicitud
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Información de la solicitud de adopción
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="flex flex-col">

            <span className="text-gray-600 font-semibold">Fecha de la solicitud:</span>

            <span>{fecha}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold">Estado:</span>
            <span

              className={`px-3 py-1 rounded-[10px] font-semibold text-sm w-fit ${getEstadoClase(

                estado
              )}`}
            >
              {estado}
            </span>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded mb-4">
          <p className="text-orange-400 mb-2">Información de la mascota</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Mascota:</span>
              <span>{solicitud.pet.name}</span>
            </div>
            <div className="flex flex-col">

              <span className="text-gray-600 font-semibold">ID de mascota:</span>

              <span>{solicitud.petId}</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded">

          <p className="text-orange-400 mb-2">Información del adoptante</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Adoptante:</span>
              <span>{solicitud.user.fullname}</span>
            </div>
            <div className="flex flex-col">

              <span className="text-gray-600 font-semibold">ID de adoptante:</span>
              <span>{solicitud.userId}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Documento de identidad:</span>

              <span>{adopter?.identityDocument || "No disponible"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 font-semibold">Correo:</span>
              <span>{solicitud.user.email}</span>
            </div>
            <div className="flex flex-col col-span-2">

              <span className="text-gray-600 font-semibold">Dirección y comuna:</span>

              <span>Lorem ipsum dolor sit amet consectetur.</span>
            </div>
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
