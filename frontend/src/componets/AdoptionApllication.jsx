import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";

const AdoptionApllication = () => {
  const solicitudes = [
    { id: 1, adoptante: "Carlos Riquelme", mascota: "Firulais", fecha: "2025-04-15", estado: true },
    { id: 2, adoptante: "María López", mascota: "Michi", fecha: "2025-04-10", estado: false },
    { id: 3, adoptante: "Pedro Gómez", mascota: "Rex", fecha: "2025-03-28", estado: true },
    { id: 4, adoptante: "Ana Ruiz", mascota: "Chileno", fecha: "2025-04-01", estado: false },
    { id: 5, adoptante: "Lucía Torres", mascota: "Pelusa", fecha: "2025-03-20", estado: true },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Solicitudes de adopción</h1>

      {/* Input de búsqueda */}
      <div className="flex items-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      {/* Tabla de solicitudes */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-orange-400 text-white">
            <th className="border px-4 py-2 text-left">Adoptante</th>
            <th className="border px-4 py-2 text-left">Mascota</th>
            <th className="border px-4 py-2 text-left">Fecha</th>
            <th className="border px-4 py-2 text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <tr key={solicitud.id} className="text-left">
              <td className="border px-4 py-2">{solicitud.adoptante}</td>
              <td className="border px-4 py-2">{solicitud.mascota}</td>
              <td className="border px-4 py-2">{solicitud.fecha}</td>
              <td className="border px-4 py-2 text-center">
                {solicitud.estado ? (
                  <FaCheck className="text-green-500 inline" />
                ) : (
                  <FaTimes className="text-red-500 inline" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdoptionApllication;
