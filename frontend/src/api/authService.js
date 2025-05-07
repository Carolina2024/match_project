const BASE_URL = "https://match-project.onrender.com/api/auth";
export const registerAdopter = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al registrar usuario");
  }
  return res.json();
};
