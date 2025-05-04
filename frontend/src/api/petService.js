// api/petService.js
const BASE_URL = "https://match-project.onrender.com/api/pets";

export const getAllPets = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error al obtener mascotas");
  return res.json();
};

export const createPet = async (petData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(petData),
  });
  if (!res.ok) throw new Error("Error al crear mascota");
  return res.json();
};  

export const deletePet = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al eliminar mascota");
    }
  
    return true;
  };
  
  

export const updatePet = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar mascota");
  return res.json();
};
