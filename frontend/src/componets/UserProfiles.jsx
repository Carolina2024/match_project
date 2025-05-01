// componets/UserProfiles.jsx
const UserProfiles = ({ users }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Perfiles de Usuarios</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white shadow-md rounded p-4 border border-gray-200"
          >
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Rol:</strong> {user.role}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfiles;
