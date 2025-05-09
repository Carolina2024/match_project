const BASE_URL = "https://match-project.onrender.com/api/pets";
const BASE_URL2 = "https://match-project.onrender.com/api/pets/complete";

/**
 * Obtener todas las mascotas
 */
/* export const getAllPets = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener mascotas");
  return res.json();
}; */

export const getAllPets = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("token");

  // Agregar parámetros de paginación en la query string
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`${BASE_URL2}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener mascotas");
  return res.json();
};


/**
 * Crear una nueva mascota
 * @param {Object} petData - Datos de la mascota
 */
export const createPet = async (petData) => {
  console.log({petData})
  const formData = new FormData();

  formData.append("name", petData.name || "");
  formData.append("size", petData.size || "");
  formData.append("sex", petData.sex || "");
  formData.append("age", petData.age || "");
  formData.append("species", petData.species || "");
  formData.append("energy", petData.energy || "");
  formData.append("breed", petData.breed || "");
  formData.append("kg", petData.kg || "");
  formData.append("isVaccinated", petData.isVaccinated || false);
  formData.append("isSterilized", petData.isSterilized || false);
  formData.append("isDewormed", petData.isDewormed || false);
  formData.append("hasMicrochip", petData.hasMicrochip || false);
  formData.append("story", petData.story || "");
  formData.append("admissionDate", petData.admissionDate || "");
  formData.append("status", petData.status || "");

  // Traits (array)
  formData.append("delivery", petData.delivery.join(","));

formData.append("traits", petData.traits.join(",") );

  // (petData.traits || []).forEach((trait) => {
  //   formData.append("traits", trait);
  // });

  // Imágenes (array de Files)
  (petData.photos || []).forEach((file) => {
    if (file instanceof File) {
      formData.append("photos", file);
    }
  });

  const token = localStorage.getItem("token");
  console.log(formData)

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("❌ Error del servidor:", errorData);
    throw new Error(errorData.message || "Error al crear mascota");
  }

  return res.json();
};

/**
 * Eliminar una mascota por ID
 */
export const deletePet = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar mascota");
  }

  return true;
};

/**
 * Actualizar mascota por ID
 */
export const updatePet = async (id, petData) => {
  console.log({petData})
  const formData = new FormData();

  formData.append("name", petData.name || "");
  formData.append("size", petData.size || "");
  formData.append("sex", petData.sex || "");
  formData.append("age", petData.age || "");
  formData.append("species", petData.species || "");
  formData.append("energy", petData.energy || "");
  formData.append("breed", petData.breed || "");
  formData.append("kg", petData.kg || "");
  formData.append("isVaccinated", petData.delivery.includes("Vacunado") || false);
  formData.append("isSterilized", petData.delivery.includes("Esterilizado") || false);
  formData.append("isDewormed", petData.delivery.includes("Desparacitado")  || false);
  formData.append("hasMicrochip", petData.delivery.includes("Con chip")  || false);
  formData.append("story", petData.story || "");
  formData.append("admissionDate", petData.admissionDate || "");
  formData.append("status", petData.status || "");

  // Traits (array)
  // formData.append("delivery", petData.delivery.join(","));

formData.append("traits", petData.traits.join(",") );

if( petData.photoUrls.length > 0  ) {
  formData.append("photoUrls", petData.photoUrls.join(",") );
}


  // (petData.traits || []).forEach((trait) => {
  //   formData.append("traits", trait);
  // });

  // Imágenes (array de Files)

  (petData.photos || []).forEach((file) => {
    if (file instanceof File) {
      formData.append("photos", file);
    }
  });

  
  console.log(formData)
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("❌ Error al actualizar:", errorData);
    throw new Error(errorData.message || "Error al actualizar mascota");
  }

  return res.json();
};
