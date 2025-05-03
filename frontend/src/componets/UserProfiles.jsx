import { FaSearch } from "react-icons/fa";
// componets/UserProfiles.jsx
const UserProfiles = () => {
  const users = [
    {
      id: 1,
      name: "Vanessa Montero",
      email: "vane@example.com",
      estado: "Adoptante",
    },
    {
      id: 2,
      name: "Carlos Riquelme",
      email: "admin@example.com",
      estado: "Administrador",
    },
    {
      id: 3,
      name: "Francisca Merino",
      email: "fca@example.com",
      estado: "Adoptante",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-black-500 mb-6">USUARIOS</h1>

      {/* Input de búsqueda */}
      <div className="flex items-center mb-6">
        <span className="mr-3">Buscar:</span>
        <div className="relative w-64">
          <input
            type="text"
            placeholder=""
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      {/* Tabla de solicitudes */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-white-400 text-black border border-gray-400 bg-white-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Correo electrónico</th>
            <th className="px-4 py-2 text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-left">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 text-center">
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center items-center ms-7 space-x-3">
                    <span
                      className={
                        user.estado
                          ? "text-black font-medium"
                          : "text-gray-400 font-medium"
                      }
                    >
                      Activo
                    </span>
                    <span
                      className={
                        !user.estado
                          ? "text-black font-medium"
                          : "text-gray-400 font-medium"
                      }
                    >
                      Inactivo
                    </span>
                  </div>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfiles;
