const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/users`;

export const fetchUsersget = async (page = 1, limit = 10) => {
  try {
    const token = localStorage.getItem("token");

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${API_URL}?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    const data = await response.json();

    const users = data.items.map((user) => ({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      identityDocument: user.adopter?.identityDocument || "N/A",
      estado: user.isActive ? "Activo" : "Inactivo",
      address: user.adopter?.address || "N/A",
    }));
    return {
      items: users,
      totalPages: data.totalPages || 1,
    };
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
    return {
      items: [],
      totalPages: 1,
    };
  }
};
