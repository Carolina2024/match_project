/* const API_URL = "https://match-project.onrender.com/api"; */
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

    console.log("Respuesta completa de la API:", data);

    const formatted = {
      id: data.id,
      fullname: data.fullname,
      email: data.email,
      role: data.role,
      adopter: {
        id: data.adopterId || data.id,
        identityDocument: data.identityDocument,
        birthDate: data.birthDate,
        address: data.address,
        homeType: data.homeType,
        allowsPets: data.allowsPets,
        hadPets: data.hadPets,
        hadPetsVaccinated: data.hadPetsVaccinated,
        hadPetsCastrated: data.hadPetsCastrated,
        hoursAlone: data.hoursAlone,
        petDestroy: data.petDestroy,
        preparedToVisitVeterinarian: data.preparedToVisitVeterinarian,
        allowsVisit: data.allowsVisit,
        isResponsibleAdoption: data.isResponsibleAdoption,
        userPreferenceEnergy: data.userPreferenceEnergy,
        userPreferenceTraits: data.userPreferenceTraits,
        userPreferenceDogs: data.userPreferenceDogs,
        userPreferenceCats: data.userPreferenceCats,
        userPreferenceChildren: data.userPreferenceChildren,
      },
    };
    console.log(JSON.stringify(formatted, null, 2));
    console.log("Detalles del adoptante:", data);
    console.log(
      "Detalles del adoptante formateados:",
      JSON.stringify(formatted, null, 2)
    );
    return formatted;
  } catch (error) {
    console.error("Error al obtener el adoptante:", error);
    throw error;
  }
};

// Sustituye con valores reales
const userId = "895e3aa4-2ddf-4910-a4a9-8872812bb53c";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1MTlhOWRkLTFhZWQtNGI4ZC1hZGMyLWJiMTNmZTYzODRlOSIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDY5NDMyMTgsImV4cCI6MTc0Njk1MDQxOH0.tWqNunqspZjVtqShakKWPiTUpvpLc7ZdVMB2FkJI4aM";

getUserById(userId, token);