const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllMatches = async () => {
  const res = await fetch(`${BASE_URL}/matches`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al obtener solicitudes");
  }

  return await res.json();
};
