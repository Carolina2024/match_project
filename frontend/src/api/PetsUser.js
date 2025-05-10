const BASE_URL = "https://match-project.onrender.com/api";
const PETS_URL = `${BASE_URL}/pets`;

export const getCompatiblePets = async (userId) => {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(userId);
  const res = await fetch(`${PETS_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Error al obtener mascotas compatibles"
    );
  }

  return data;
};
