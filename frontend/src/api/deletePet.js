const BASE_URL = "https://match-project.onrender.com/api";
const USERS_URL = `${BASE_URL}/pets`;

export const deletePet = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${USERS_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar la mascota");
  }

  return res.json();
};
