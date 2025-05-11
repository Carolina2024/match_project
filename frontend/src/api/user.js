/* const BASE_URL = "https://match-project.onrender.com/api";
const AUTH_URL = `${BASE_URL}/auth`; */

const API_BASE = import.meta.env.VITE_API_BASE_URL; // Usando la variable de entorno para la base URL
const AUTH_URL = `${API_BASE}/auth`;

export const loginUser = async (data) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  return res.json();
};
