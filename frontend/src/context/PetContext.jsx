
import { createContext, useContext, useState, useEffect } from "react";
import { createMatch, getCompatiblePets, getUserMatchs } from "../api/PetsUser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [seleccionada, setSeleccionada] = useState(null);
  const [showCheckMatch3, setShowCheckMatch3] = useState(false);
  const [showCheckMatch4, setShowCheckMatch4] = useState(false);
  const [mascotas, setMascotas] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [matchedPet, setMatchedPet] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleMatchClick = () => {
    setShowCheckMatch3(true);
  };

  const handleGoToTracking = () => {
    navigate("/seguimiento", {
      state: {
        nombre: seleccionada.name,
        foto: seleccionada.photoUrls[0],
      },
    });
  };

  const handleClickMeet = (mascota) => {
    setSeleccionada(mascota);
    navigate(`infopet/${mascota.id}`);
  };

  const isMatched = (id) => userMatches.includes(String(id));

  const handleConfirmMatch = async (id) => {
    try {
      await createMatch(id);
      setShowCheckMatch3(false);
      setShowCheckMatch4(true);
  
      const data = await getCompatiblePets();
      setMascotas(data.items);
  
      const result = await getUserMatchs();
      const normalizedMatches = Array.isArray(result) ? result : [result];
  
      const matchedPetIds = normalizedMatches.map((m) => m.petId);
      setUserMatches(matchedPetIds);
  
      const activeMatch = normalizedMatches.find((m) =>
        ["En proceso", "Por revisar", "Aprobada", "Rechazado"].includes(m.status)
      );
  
      if (activeMatch) {
        setMatchedPet({
          ...activeMatch.pet,
          id: activeMatch.petId,
          matchStatus: activeMatch.status,
        });
      } else {
        setMatchedPet(null);
      }
    } catch (error) {
      console.error("Error en handleConfirmMatch:", error);
    }
  };
  

  useEffect(() => {
    const fetchMascotas = async () => {
      if (!user || user.role !== "adoptante") {
        setMascotas([]);
        setUserMatches([]);
        setMatchedPet(null);
        return;
      }
  
      try {
        const data = await getCompatiblePets();
        setMascotas(data.items);
  
        const matches = await getUserMatchs();
        const normalizedMatches = Array.isArray(matches) ? matches : [matches];
  
        const matchedPetIds = normalizedMatches.map((m) => m.petId);
        setUserMatches(matchedPetIds);
  
        const activeMatch = normalizedMatches.find((m) =>
          ["En proceso", "Por revisar", "Aprobada", "Rechazado"].includes(m.status)
        );
  
        if (activeMatch) {
          setMatchedPet({
            ...activeMatch.pet,
            id: activeMatch.petId,
            matchStatus: activeMatch.status,
          });
        } else {
          setMatchedPet(null);
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
        userMatches,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};



export const usePet = () => useContext(PetContext);

PetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};