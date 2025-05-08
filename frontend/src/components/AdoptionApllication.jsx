import { useState } from "react";
import { FaSearch, FaHeart, FaRegEdit } from "react-icons/fa";
import { BsCalendar2 } from "react-icons/bs";

const AdoptionApllication = () => {
  const [filtro, setFiltro] = useState("Todos");

  const solicitudes = [
    { id: 1, adoptante: "Carlos Riquelme", mascota: "Firulais", fecha: "2025-04-15", estado: "Pendiente" },
    { id: 2, adoptante: "María López", mascota: "Michi", fecha: "2025-04-10", estado: "Aprobado" },
    { id: 3, adoptante: "Pedro Gómez", mascota: "Rex", fecha: "2025-03-28", estado: "Aprobado" },
    { id: 4, adoptante: "Ana Ruiz", mascota: "Chileno", fecha: "2025-04-01", estado: "Rechazado" },
    { id: 5, adoptante: "Lucía Torres", mascota: "Pelusa", fecha: "2025-03-20", estado: "Pendiente" },
  ];

  const statusColors = {
    Pendiente: "bg-gray-300 text-black",
    Aprobado: "bg-green-200 text-green-700",
    Rechazado: "bg-red-200 text-red-700",
  };

  const solicitudesFiltradas = filtro === "Todos"
    ? solicitudes
    : solicitudes.filter((s) => s.estado === filtro);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">


      <div className="bg-white m-10 p-6 rounded-xl shadow-md border border-gray-300">

        <div className="flex flex-col gap-4 mb-8">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">Filtrar por:</label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none w-64"
            >
              <option value="Todos">Estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {solicitudesFiltradas.map((sol) => (
            <div
              key={sol.id}
              className="w-52 h-56 bg-white border rounded-xl shadow-[9px_9px_2px_rgba(0,0,0,0.5)] p-4 flex flex-col justify-between"
            >
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">{sol.mascota}</h3>
                <FaHeart className={`mx-auto ${sol.estado === "Rechazado" ? "text-gray-400" : "text-red-500"}`} />
                <p className="font-medium">{sol.adoptante}</p>
                <div className="flex items-center justify-center text-sm text-gray-600 gap-1">
                  <BsCalendar2 />
                  <span>{sol.fecha}</span>
                </div>
              </div>
              <div className="flex justify-center items-center mt-2 px-1">
                <span className={`text-sm px-2 py-1 rounded-full ${statusColors[sol.estado]}`}>
                  {sol.estado}
                </span>
                {sol.estado === "Pendiente" && (
                  <FaRegEdit className="ml-2 text-gray-600 cursor-pointer hover:text-black" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdoptionApllication;

