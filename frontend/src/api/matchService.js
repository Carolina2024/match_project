const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllMatches = async (
  page = 1,
  limit = 8,
  status = "",
  search = ""
) => {
  try {
    const token = localStorage.getItem("token");

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status && status !== "Todos") {
      queryParams.append("status", status);
    }
    if (search) {
      queryParams.append("search", search);
    }

    const response = await fetch(
      `${BASE_URL}/matches?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las solicitudes de adopción");
    }

    const data = await response.json();
console.log(data)
    const matches = data.items.map((match) => ({
      id: match.id,
      adopterName: match.user?.fullname || "N/A",
      petName: match.pet?.name || "N/A",
      status: match.status,
      applicationDate: match.applicationDate,
      user: match.user,
      pet: match.pet,
      
    }));

    return {
      items: matches,
      totalPages: data.totalPages || 1,
      total: data.total || matches.length,
    };
  } catch (error) {
    console.error("Error al cargar las solicitudes:", error);
    return {
      items: [],
      totalPages: 1,
      total: 0,
    };
  }
};
