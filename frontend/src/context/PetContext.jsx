import { createContext, useContext, useState, useEffect } from "react";
import { createMatch, getCompatiblePets, getUserMatchs } from "../api/PetsUser";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [seleccionada, setSeleccionada] = useState(null);
  const [showCheckMatch3, setShowCheckMatch3] = useState(false);
  const [showCheckMatch4, setShowCheckMatch4] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleMatchClick = () => {
    setShowCheckMatch3(true);
  };

  const handleConfirmMatch = async (id) => {
    try {
      await createMatch(id);
      setShowCheckMatch3(false);
      setShowCheckMatch4(true);

      const data = await getCompatiblePets();
      setMascotas(data.items);

      const matches = await getUserMatchs();
      const matchedPetIds = matches
        .filter(
          (m) =>
            m.status === "Por revisar" ||
            m.status === "En proceso" ||
            m.status === "Aprobada"
        )
        .map((m) => m.petId);
      setUserMatches(matchedPetIds);
    } catch (error) {
      console.error("Error en handleConfirmMatch:", error);
    }
  };

  const handleGoToTracking = () => {
    navigate("/seguimiento", {
      state: {
        nombre: seleccionada.name,
        foto: seleccionada.photoUrls[0],
      },
    });
  };

  const [mascotas, setMascotas] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [matchedPet, setMatchedPet] = useState(null);

  const location = useLocation();


  useEffect(() => {
    const fetchMascotas = async () => {
      if (!user || !user.role || !user.id) {
        setMascotas([]);
        setUserMatches([]);
        setMatchedPet(null);
        return;
      }

      if (user.role === "admin") {
        setMascotas([]);
        setUserMatches([]);
        setMatchedPet(null);
        return;
      }

      if (user.role !== "adoptante") {
        setMascotas([]);
        setUserMatches([]);
        setMatchedPet(null);
        return;
      }

      try {
        const data = await getCompatiblePets();
        const pets = data.items;
        setMascotas(pets);

        const matches = await getUserMatchs();
        if (
          matches.status === "En proceso" ||
          matches.status === "Por revisar"
        ) {
          setMatchedPet({ ...matches.pet, id: matches.petId });
        }

        const isMatchRejected = (matches.status = "Rechazado");

        if (isMatchRejected) {
          setUserMatches([]);
        }
      } catch (error) {
        console.error("Error al cargar mascotas y matches:", error);
        setMascotas([]);
        setUserMatches([]);
        setMatchedPet(null);
      }
    };

    fetchMascotas();
  }, [user]);

  const isMatched = (id) => userMatches.includes(String(id));

  const handleClickMeet = (mascota) => {
    setSeleccionada(mascota);
    navigate(`infopet/${mascota.id}`);
  };

  return (
    <PetContext.Provider
      value={{
        seleccionada,
        setSeleccionada,
        handleMatchClick,
        handleConfirmMatch,
        handleGoToTracking,
        showCheckMatch3,
        setShowCheckMatch3,
        showCheckMatch4,
        matchedPet,
        isMatched,
        handleClickMeet,
        mascotas,
        setMascotas,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => useContext(PetContext);
