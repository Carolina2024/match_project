const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserById = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no disponible");
  }

  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    const data = await response.json();

    const formatted = {
      id: data.id,
      fullname: data.fullname,
      email: data.email,
      role: data.role,
      createdAt: data.createdAt,
      adopter: {
        id: data.adopter?.id || data.adopterId || data.id,
        identityDocument: data.adopter?.identityDocument,
        birthDate: data.adopter?.birthDate,
        address: data.adopter?.address,
        homeType: data.adopter?.homeType,
        allowsPets: data.adopter?.allowsPets,
        hadPets: data.adopter?.hadPets,
        hadPetsVaccinated: data.adopter?.hadPetsVaccinated,
        hadPetsCastrated: data.adopter?.hadPetsCastrated,
        hoursAlone: data.adopter?.hoursAlone,
        petDestroy: data.adopter?.petDestroy,
        preparedToVisitVeterinarian: data.adopter?.preparedToVisitVeterinarian,
        allowsVisit: data.adopter?.allowsVisit,
        isResponsibleAdoption: data.adopter?.isResponsibleAdoption,
        userPreferenceEnergy: data.adopter?.userPreferenceEnergy,
        userPreferenceTraits: data.adopter?.userPreferenceTraits,
        userPreferenceDogs: data.adopter?.userPreferenceDogs,
        userPreferenceCats: data.adopter?.userPreferenceCats,
        userPreferenceChildren: data.adopter?.userPreferenceChildren,
      },
    };

    return formatted;
  } catch (error) {
    console.error("Error al obtener el adoptante:", error);
    throw error;
  }
};


