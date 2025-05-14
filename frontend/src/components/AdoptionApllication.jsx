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

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await getAllMatches();
        console.log("Total de solicitudes:", data.length);
        console.log("Solicitudes cargadas:", data);
        setSolicitudes(data.items || data);
      } catch (error) {
        console.error("Error al obtener solicitudes:", error.message);
      }
    };

    fetchSolicitudes();
  }, []);
  const solicitudesFiltradas = solicitudes.filter((s) => {
    const coincideEstado = filtro === "Todos" || s.status === filtro;
    const coincideBusqueda = s.pet?.name
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideEstado && coincideBusqueda;
  });
  const handleStatusUpdate = async (matchId, nuevoEstado) => {
    try {
      const res = await fetch(
        `https://match-project.onrender.com/api/matches/${matchId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: nuevoEstado }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al actualizar estado");
      }

      const updatedMatch = await res.json();

      setSolicitudes((prev) =>
        prev.map((s) => (s.id === matchId ? updatedMatch : s))
      );

      setSolicitudEditando(null);
    } catch (error) {
      console.error("Error actualizando estado:", error.message);
      alert("Ocurrió un error al actualizar el estado.");
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <div className="bg-white m-4 md:m-10 p-6 rounded-xl shadow-md border border-gray-300">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {solicitudesFiltradas.map((sol) => (
            <div
              key={sol.id}
              onClick={() => {
                if (sol.status === "En proceso" || sol.status === "Rechazado") {
                  setReadingRequest(sol);
                }
              }}
              className="cursor-pointer w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] xl:max-w-[250px] 2xl:max-w-[280px] h-auto bg-white border rounded-xl shadow-[9px_9px_2px_rgba(0,0,0,0.5)] py-4 px-3 flex flex-col justify-between"
            >
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">{sol.pet.name}</h3>

                <FaHeart
                  className={`mx-auto ${
                    sol.status === "Rechazado"
                      ? "text-gray-400"
                      : "text-orange-500"
                  }`}
                />

                <p className="font-medium">{sol.user.fullname}</p>

                <div className="flex items-center justify-center text-sm text-gray-600 gap-1">
                  <BsCalendar2 />
                  <span>
                    {new Date(sol.applicationDate).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center mt-2 px-1">
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    sol.status === "Por revisar"
                      ? "bg-gray-300 text-gray-600"
                      : sol.status === "En proceso"
                      ? "bg-orange-200 text-orange-500"
                      : sol.status === "Aprobado"
                      ? "bg-green-300 text-green-600"
                      : "bg-red-300 text-red-600"
                  }`}
                >
                  {sol.status}
                </span>

                {(sol.status === "Por revisar" ||
                  sol.status === "En proceso") && (
                  <FaRegEdit
                    className="ml-2 text-gray-600 cursor-pointer hover:text-black"
                    title="Ver detalles de la solicitud"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSolicitudEditando(sol);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
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
      </div>
    </div>
  );
};

export default AdoptionApllication;
