const API_BASE = import.meta.env.VITE_API_BASE_URL;
const PETS_URL = `${API_BASE}/pets`;

export const getCompatiblePets = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const res = await fetch(`${PETS_URL}/users/${user.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Error al obtener mascotas compatibles"
    );
  }

  return data;
};

export const createMatch = async (idPet) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/matches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ petId: idPet }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getUserMatchs = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/matches/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  return data;
};

export const getPetById = async (petId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${PETS_URL}/${petId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Error al obtener los datos de la mascota"
    );
  }

  return data;
};
