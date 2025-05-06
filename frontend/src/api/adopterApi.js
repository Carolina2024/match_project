// src/api/usersApi.js
const API_URL = "https://match-project.onrender.com/api/users";

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    const data = await response.json();
    console.log("Respuesta de la API:", data); // 👈 Agregado objeto de usuarios

    const users = data.items.map((user) => ({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      identityDocument: user.adopter?.identityDocument || "N/A",
      estado: user.isActive ? "Activo" : "Inactivo",
      address: user.adopter?.address || "N/A",
    }));

    return users;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    return [];
  }
};
