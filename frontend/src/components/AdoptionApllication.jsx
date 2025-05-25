import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { getAllMatches } from "../api/matchService";
import MatchDetailModal from "./modals/MatchDetailModal";
import RequestModal from "../components/modals/RequestModal";
import { RiSearchLine } from "react-icons/ri";
import CustomSelect from "./CustomSelect";
import { FiCalendar } from "react-icons/fi";
import { UilEdit } from "@iconscout/react-unicons";

const AdoptionApllication = () => {
  const [filtro, setFiltro] = useState("Estado");
  const [busqueda, setBusqueda] = useState("");
  const [solicitudEditando, setSolicitudEditando] = useState(null);
  const [readingRequest, setReadingRequest] = useState(null);

  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSolicitudes, setTotalSolicitudes] = useState(0);

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
    <div className="bg-white sm:bg-[#FAF9F6] min-h-screen mt-8">
      <div className="bg-transparent sm:bg-white sm:p-6 sm:rounded-[20px] sm:shadow-[1px_3px_6px_rgba(0,0,0,0.4)] sm:border sm:border-gray-300">
        <div className="flex flex-col gap-3 mb-8">
          <div className="relative w-full px-2 sm:px-0">
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-[320px] sm:w-[410px] h-[44px] font-raleway pl-[40px] sm:pl-[40px] border border-[#767575]/80 font-medium text-[14px] text-[#767575] pr-[20px] sm:pr-[12px] py-[10px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <RiSearchLine
              className="absolute left-3 top-2 text-gray-400"
              size={24}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="font-raleway font-medium text-[16px] text-[#595146] px-3 sm:px-0">
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

        <div className="flex flex-wrap justify-start gap-5 mr-[15px] ml-[15px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-1">
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
                className="cursor-pointer w-[175px] sm:w-[240px] h-[156px] sm:h-[214px] bg-[#FFFFFF] border border-[#767575] rounded-[15px] sm:rounded-[20px] p-[15px] sm:p-[20px] flex flex-col justify-between  shadow-[5px_5px_0px_0px_#767575]  gap-[15px] sm:gap-[22px]"
              >
                <div className="text-center space-y-2">
                  <h3 className="font-raleway font-semibold text-[14px] sm:text-[16px] text-[#595146]">
                    {sol.petName}
                  </h3>

                  <FaHeart
                    className="mx-auto w-[15px] sm:w-[21px] h-[13px] sm:h-[18px]"
                    style={{
                      color: sol.status === "Rechazado" ? "#767575" : "#ffa04c",
                      top: "3px",
                      left: "1.55px",
                    }}
                  />

                  <p className="font-raleway font-semibold text-[14px] sm:text-[16px] text-[#595146]">
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

                <div className="flex justify-center items-center px-1 flex-wrap gap-1 w-full">
                  <span
                    className={`font-raleway font-semibold text-[12px] sm:text-[14px] w-[75px] sm:w-[100px] h-[21px] sm:h-[40] rounded-[10px] px-[10px] py-[1px] sm:py-[4px]  text-center max-w-full whitespace-nowrap flex items-center justify-center ${
                      sol.status === "Por revisar"
                        ? "bg-[rgba(108,108,108,0.25)] text-[#6C6C6C]"
                        : sol.status === "En proceso"
                        ? "bg-[rgba(255,128,44,0.25)] text-[#FF802C]"
                        : sol.status === "Aprobado"
                        ? "bg-[rgba(50,157,1,0.25)] text-[#35A302]"
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
                      className="ml-[2px] text-[#595146] text-base sm:text-lg  cursor-pointer hover:text-black"
                      size="20"
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
              className="w-[89px] h-[36px] px-[10px] py-[10px] text-center flex items-center justify-center gap-[10px] rounded-[10px] border border-[#767575]/80 text-[14px] font-raleway font-medium text-[#767575]/80 bg-white hover:bg-gray-100 disabled:opacity-50"
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
                      className={`w-[37px] h-[36px] rounded-[10px] px-[10px] py-[10px] text-[14px] font-raleway font-medium flex items-center justify-center  rounded border ${
                        currentPage === page
                          ? "bg-[#595146] text-white border-[#595146]"
                          : "bg-white text-[#595146] border-[#595146] hover:bg-gray-100"
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
              className="w-[89px] h-[36px] px-[10px] py-[10px] text-center flex items-center justify-center rounded-[10px] border border-[#595146] text-[14px] font-raleway font-medium text-[#595146] bg-white hover:bg-gray-200 disabled:opacity-50"
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
