const BASE_URL = "https://match-project.onrender.com/api";

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
