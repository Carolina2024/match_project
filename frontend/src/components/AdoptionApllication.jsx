import { useEffect, useState } from "react";
import { FaSearch, FaHeart, FaRegEdit } from "react-icons/fa";
import { BsCalendar2 } from "react-icons/bs";
import { getAllMatches } from "../api/matchService";
import MatchDetailModal from "./modals/MatchDetailModal";
import RequestModal from "../components/modals/RequestModal";

const AdoptionApllication = () => {
  const [filtro, setFiltro] = useState("Todos");
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
        const statusParam = filtro === "Todos" ? "" : filtro;
        const data = await getAllMatches(currentPage, 8, statusParam, busqueda);
        console.log("Datos recibidos de la API:", data);

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
    <div className="bg-white sm:bg-[#FAF9F6]">
      <div className="bg-transparent sm:bg-white sm:m-10 sm:p-6 sm:rounded-[20px] sm:shadow-[1px_3px_6px_rgba(0,0,0,0.4)] sm:border sm:border-gray-300 m-0 p-0">
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Filtrar por:</label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none w-full sm:w-64"
            >
              <option value="Todos">Estado</option>
              <option value="Por revisar">Por revisar</option>
              <option value="En proceso">En proceso</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center sm:block"></div>

        <div className="grid grid-cols-2 gap-15 mr-[36px] ml-[-15px] justify-center  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                className="cursor-pointer w-[175px] h-[156px] sm:w-[240px] sm:h-[214px] bg-white border border-[0.73px] sm:rounded-[20px] rounded-[14.56px] p-[14.56px] sm:p-5 flex flex-col justify-between gap-[14.56px] sm:gap-5 shadow-[5px_5px_0px_0px_rgba(118,117,117,1)]"
              >
                <div className="text-center space-y-2">
                  <h3 className="text-sm sm:text-lg font-semibold">
                    {sol.petName}
                  </h3>

                  <FaHeart
                    className={` mx-auto text-lg sm:text-xl mx-auto ${
                      sol.status === "Rechazado"
                        ? "text-gray-500"
                        : "text-orange-400"
                    }`}
                  />

                  <p className="text-xs sm:text-base font-medium">
                    {sol.adopterName}
                  </p>

                  <div className="flex items-center justify-center text-sm text-gray-600 gap-1">
                    <BsCalendar2 />
                    <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-[10px] font-medium ">
                      {new Date(sol.applicationDate).toLocaleDateString(
                        "es-ES"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center mt-[-8px] px-1 flex-wrap gap-1 w-full">
                  <span
                    className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-[10px] font-medium text-center max-w-full whitespace-nowrap ${
                      sol.status === "Por revisar"
                        ? "bg-gray-300 text-gray-600"
                        : sol.status === "En proceso"
                        ? "bg-orange-200 text-orange-800"
                        : sol.status === "Aprobado"
                        ? "bg-disponible text-[#35A302]"
                        : sol.status === "Falta subir"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-300 text-red-600"
                    }`}
                  >
                    {sol.status}
                  </span>
                  {(sol.status === "Por revisar" ||
                    sol.status === "En proceso") && (
                    <FaRegEdit
                      className="text-base sm:text-lg  ml-2 text-gray-600 cursor-pointer hover:text-black"
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
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            Mostrando {solicitudes.length} de {totalSolicitudes} solicitudes
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Anterior
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded border text-sm font-medium ${
                      currentPage === page
                        ? "bg-[#595146] text-white border-[#595146]"
                        : "bg-white text-[#b26b3f] border-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-400 disabled:opacity-50"
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
