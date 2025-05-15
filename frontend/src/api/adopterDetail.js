const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getUserById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
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

const userId = "895e3aa4-2ddf-4910-a4a9-8872812bb53c";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1MTlhOWRkLTFhZWQtNGI4ZC1hZGMyLWJiMTNmZTYzODRlOSIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDY5NDMyMTgsImV4cCI6MTc0Njk1MDQxOH0.tWqNunqspZjVtqShakKWPiTUpvpLc7ZdVMB2FkJI4aM";

getUserById(userId, token);
