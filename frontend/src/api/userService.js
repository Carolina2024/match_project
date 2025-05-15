const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserById = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al obtener usuario");
  }

  return res.json();
};
