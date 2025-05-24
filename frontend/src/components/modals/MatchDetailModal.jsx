import PropTypes from "prop-types";

const MatchDetailModal = ({ solicitud, onClose, onStatusChange }) => {
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
          className="w-full sm:w-auto font-primary w-[146px] h-[44px] rounded-[10px] p-[5px] gap-[5px] text-[16px] font-bold text-[#FFFFFF] bg-[#FF802C] drop-shadow-[0_3px_4px_#59514680] flex items-center justify-center cursor-pointer hover:bg-orange-300"
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
          className={`w-full sm:w-auto font-primary  h-[44px] rounded-[10px] p-[5px] gap-[5px] text-[16px] font-bold drop-shadow-[0_3px_4px_#59514680] flex items-center justify-center ${
            estado === "En proceso"
              ? "bg-[#2E9002] text-[#FFFFFF]  hover:bg-green-600 w-[220px]"
              : "bg-white text-[#329D01] border border-[#329D01]  hover:bg-green-100"
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
          className="w-full sm:w-auto h-[44px] rounded-[10px] p-[5px] gap-[5px] text-[16px] font-bold text-[#595146] border border-[#595146] drop-shadow-[0_3px_4px_#59514680] flex items-center justify-center hover:bg-gray-100"
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
      <div className={`grid grid-cols-1 ${colClass} gap-4 mt-2`}>{botones}</div>
    );
  };

  const getEstadoClase = (estado) => {
    return (
      {
        "Por revisar": "bg-[#6c6c6c40] text-[#6C6C6C]",
        "En proceso": "bg-[#ffa04c40] text-[#FFA04C]",
        Aprobado: "bg-[#329D0140] text-[#35A302]",
        Rechazado: "bg-[#E9171740] text-[#E91717]",
      }[estado] || "bg-[#6c6c6c] text-[#FFFFFF]"
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-xl shadow-xl sm:p-7 p-5 relative w-[317px] h-[769px] sm:w-[549px] sm:h-[585px] ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-4xl"
        >
          &times;
        </button>

        <h2 className="font-secundary text-[20px] text-tertiary font-bold text-center mb-1">
          Detalle de la solicitud
        </h2>
        <p className="font-primary text-[14px] font-medium text-center text-[#767575cc]  mb-1">
          Información de la solicitud de adopción
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-2 px-2">
          <div className="flex flex-col">
            <span className="font-primary text-[16px] font-semibold text-tertiary mb-1">
              Fecha de la solicitud:
            </span>

            <span className="font-secundary text-[14px] font-medium text-[#767575]">
              {fecha}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-primary text-[16px] font-semibold text-tertiary mb-1">
              Estado:
            </span>
            <span
              className={`flex items-center justify-center font-primary text-[16px] font-semibold w-[100px] h-[28px] rounded-[10px] ${getEstadoClase(
                estado
              )}`}
            >
              {estado}
            </span>
          </div>
        </div>

        <div className="rounded-[10px] p-[5px]  gap-[4px] bg-[#FFFBF5] border border-[#7676801F] mb-2">
          <p className="font-primary text-[16px] font-semibold text-[#faaa75] mb-1">
            Información de la mascota
          </p>
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div className="flex flex-col">
              <span className="font-primary text-[14px] font-medium text-[#59514680]">
                Mascota:
              </span>
              <span className="font-primary text-[16px] font-semibold text-[#767575]">
                {solicitud.pet.name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-primary text-[14px] font-medium text-[#59514680]">
                ID de mascota:
              </span>

              <span className="font-secundary text-[16px] font-semibold text-[#767575]">
                {solicitud.pet.id}
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
              <span className="font-primary text-[14px] font-medium text-[#59514680]">
                Adoptante:
              </span>
              <span className="font-primary text-[16px] font-semibold text-[#767575]">
                {solicitud.user.fullname}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-primary text-[14px] font-medium text-[#59514680]">
                ID de adoptante:
              </span>
              <span className="font-secundary text-[16px] font-semibold text-[#767575]">
                {solicitud.user.id}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-primary text-[14px] font-medium text-[#59514680]">
                Documento de identidad:
              </span>

              <span className="font-secundary text-[16px] font-semibold text-[#767575]">
                {solicitud.user?.adopter?.identityDocument || "No disponible"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-primary text-[14px] font-medium text-[#59514680]">
                Correo:
              </span>
              <span className="font-secundary text-[16px] font-semibold text-[#767575] break-words whitespace-normal overflow-hidden">
                {solicitud.user.email}
              </span>
            </div>
            <div className="flex flex-col col-span-2">
              <span className="font-primary text-[14px] font-medium text-[#59514680]">
                Dirección y comuna:
              </span>

              <span className="font-secundary text-[16px] font-semibold text-[#767575]">
                {solicitud.user?.adopter?.address || "No disponible"}
              </span>
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
