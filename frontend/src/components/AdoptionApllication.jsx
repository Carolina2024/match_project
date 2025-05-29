import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { getAllMatches } from "../api/matchService";
import MatchDetailModal from "./modals/MatchDetailModal";
import RequestModal from "../components/modals/RequestModal";
import { RiSearchLine } from "react-icons/ri";
import CustomSelect from "./CustomSelect";
import { FiCalendar } from "react-icons/fi";
import { UilEdit } from "@iconscout/react-unicons";
import { PiPawPrintFill } from "react-icons/pi";

const AdoptionApllication = () => {
  const [filtro, setFiltro] = useState("Estado");
  const [busqueda, setBusqueda] = useState("");
  const [solicitudEditando, setSolicitudEditando] = useState(null);
  const [readingRequest, setReadingRequest] = useState(null);

  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [setTotalSolicitudes] = useState(0);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const statusParam =
          filtro === "Todos" || filtro === "Estado" ? "" : filtro;

        const data = await getAllMatches(currentPage, 8, statusParam, busqueda);

        setSolicitudes(data.items);
        setTotalPages(data.totalPages);
        setTotalSolicitudes(data.total);
      } catch (error) {
        console.error("Error al obtener solicitudes:", error.message);
      }
    };

    fetchSolicitudes();
  }, [currentPage, filtro, busqueda]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtro, busqueda]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const mapMatchToSolicitud = (match) => ({
    id: match.id,
    adopterName: match.user?.fullname || "N/A",
    petName: match.pet?.name || "N/A",
    status: match.status,
    applicationDate: match.applicationDate,
    user: match.user,
    pet: match.pet,
  });

  const handleStatusUpdate = async (matchId, nuevoEstado) => {
    try {
      const res = await fetch(`${API_BASE}/matches/${matchId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: nuevoEstado }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al actualizar estado");
      }

      const updatedMatchRaw = await res.json();
      const updatedMatch = mapMatchToSolicitud(updatedMatchRaw);

      setSolicitudes((prev) =>
        prev.map((s) => (s.id === matchId ? updatedMatch : s))
      );

      setSolicitudEditando(null);
    } catch (error) {
      console.error("Error actualizando estado:", error.message);
    }
  };

  return (
    <div className="bg-white sm:bg-[#FAF9F6] min-h-screen mt-18 sm:mt-8 mb-2">
      <div className="bg-transparent sm:bg-white sm:p-6 p-0 sm:rounded-[20px] sm:shadow-[1px_3px_6px_rgba(0,0,0,0.4)] sm:border sm:border-gray-300 mt-0 sm:mt-3 ">
        <div className="flex flex-col gap-3 mb-8">
          <div className="relative w-full px-3 sm:px-0">
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-[360px] sm:w-[410px] h-[44px] font-raleway pl-[40px] sm:pl-[40px] border border-[#767575]/80 font-medium text-[14px] text-[#767575] pr-[20px] sm:pr-[12px] py-[10px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <RiSearchLine
              className="absolute left-5 sm:left-2 top-2 text-[rgba(118,117,117,0.6)]"
              size={24}
            />
          </div>

          <div className="flex items-center gap-0 sm:gap-1 -mb-4 sm:mb-0">
            <label className="font-raleway font-medium text-[16px] text-tertiary px-4 sm:px-0">
              Filtrar por:
            </label>
            <CustomSelect
              label="Estado"
              options={[
                "Estado",
                "Por revisar",
                "En proceso",
                "Aprobado",
                "Rechazado",
              ]}
              selected={filtro}
              onChange={setFiltro}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-7  sm:p-2 p-2  -mt-2 sm:mt-8 overflow-hidden ">
          {solicitudes.length > 0 ? (
            solicitudes.map((sol) => (
              <div
                key={sol.id}
                onClick={() => {
                  if (
                    sol.status === "En proceso" ||
                    sol.status === "Rechazado" ||
                    sol.status === "Aprobado"
                  ) {
                    setReadingRequest(sol);
                  }
                }}
                className="w-full cursor-pointer h-[155.81px] sm:h-[214px]  bg-white border border-[#767575] rounded-[15px] sm:rounded-[20px] p-[15px] sm:p-[12px] flex flex-col justify-between  shadow-[3.64px_3.64px_0px_0px_#767575] sm:shadow-[5px_5px_0px_0px_#767575]  gap-[15px] sm:gap-[12px]"
              >
                <div className="text-center space-y-1">
                  <h3 className="font-raleway font-semibold text-[14px] sm:text-[16px] text-tertiary">
                    {sol.petName}
                  </h3>

                  <div className="mx-auto flex items-center justify-center w-[20px] h-[20px] sm:w-[38px] sm:h-[36px] rounded-[50px] bg-[#FAAA75] sm:p-[7px] p:[3] sm:gap-[10px] gap:[5px]">
                    <PiPawPrintFill className="sm:w-[24px] sm:h-[24px] w-[14px] h-[11.93px] text-white" />
                  </div>

                  <p className="font-raleway font-semibold text-[14px] sm:text-[16px] text-tertiary mb-1 sm:mb-4">
                    {sol.adopterName}
                  </p>

                  <div className="flex items-center justify-center">
                    <FiCalendar className="w-[15px] h-[15px] text-[#767575] top-[3.33px] left-[2.5px] " />
                    <span className="font-secundary font-semibold text-[12px] sm:text-[14px] text-[#767575cc]  px-2 sm:px-3 rounded-[10px]">
                      {new Date(sol.applicationDate).toLocaleDateString(
                        "es-ES"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center px-1 flex-wrap gap-1">
                  <span
                    className={`font-raleway font-semibold text-[12px] sm:text-[14px] w-[75px] sm:w-[96px] h-[21px] sm:h-[29px] rounded-[10px] px-[7px] py-[1px] sm:py-[4px]  text-center  whitespace-nowrap flex items-center justify-center ${
                      sol.status === "Por revisar"
                        ? "bg-[rgba(108,108,108,0.25)] text-gray-icon"
                        : sol.status === "En proceso"
                        ? "bg-[rgba(255,128,44,0.25)] text-text-orange-process"
                        : sol.status === "Aprobado"
                        ? "bg-[rgba(50,157,1,0.25)] text-green-text"
                        : sol.status === "Falta subir"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-[rgba(233,23,23,0.25)] text-[#E91717]"
                    }`}
                  >
                    {sol.status}
                  </span>
                  {(sol.status === "Por revisar" ||
                    sol.status === "En proceso") && (
                    <UilEdit
                      className="ml-[1px] sm:ml-[2px] text-tertiary cursor-pointer hover:text-black text-[21px] sm:text-[24px]"
                      title="Ver detalles de la solicitud"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSolicitudEditando(sol);
                      }}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No se encontraron solicitudes
            </p>
          )}
        </div>

        {solicitudEditando && (
          <MatchDetailModal
            solicitud={solicitudEditando}
            onClose={() => setSolicitudEditando(null)}
            onStatusChange={(nuevoEstado) =>
              handleStatusUpdate(solicitudEditando.id, nuevoEstado)
            }
          />
        )}

        {readingRequest && (
          <RequestModal
            request={readingRequest}
            onClose={() => setReadingRequest(null)}
          />
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4">
          <div className="text-[14px] font-raleway font-semibold text-[#767575]/80 mb-4 sm:mb-0">
            Mostrando {solicitudes.length} de {solicitudes.length} solicitudes
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="sm:w-[89px] w-[114] h-[36px] cursor-pointer px-[10px] py-[10px] text-center flex items-center justify-center gap-[10px] rounded-[10px] border border-[#767575]/80 text-[14px] font-raleway font-medium text-[#767575]/80 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              Anterior
            </button>

            <div className="max-w-[120px] sm:max-w-full overflow-x-auto sm:overflow-visible">
              <div className="flex gap-1 w-max">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`sm:w-[37px] w-[48px] h-[36px] rounded-[10px] cursor-pointer  px-[10px] py-[10px] text-[14px] font-raleway font-medium flex items-center justify-center border ${
                        currentPage === page
                          ? "bg-tertiary text-white border-tertiary"
                          : "bg-white text-tertiary border-tertiary hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="sm:w-[89px] w-[114] h-[36px] px-[10px] cursor-pointer py-[10px] text-center flex items-center justify-center rounded-[10px] border border-tertiary text-[14px] font-raleway font-medium text-tertiary bg-white hover:bg-gray-200 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionApllication;
