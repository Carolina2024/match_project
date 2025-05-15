import { createContext, useContext, useState, useEffect } from "react";
import { createMatch, getCompatiblePets, getUserMatchs } from "../api/PetsUser";
import { useNavigate, useLocation } from "react-router-dom";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [seleccionada, setSeleccionada] = useState(null);
  const [showCheckMatch3, setShowCheckMatch3] = useState(false);
  const [showCheckMatch4, setShowCheckMatch4] = useState(false);
  const navigate = useNavigate();

  const handleMatchClick = () => {
    setShowCheckMatch3(true);
  };

  const handleConfirmMatch = async (id) => {
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
      const data = await getCompatiblePets();
      const pets = data.items;
      setMascotas(pets);

      const matches = await getUserMatchs();
      if(matches.status === "En proceso" || matches.status === "Por revisar") {
        setMatchedPet({...matches.pet, id: matches.petId})
      }



      // 💡 Si el usuario vuelve desde seguimiento y su match fue rechazado
      // const matchRechazado = matches.find((m) => m.status === "Rechazado");

      const isMatchRejected = (matches.status = "Rechazado");

      if (isMatchRejected) {
        setUserMatches([]);
      }

    //   if (location.state?.desdeSeguimiento && isMatchRejected) {
    //     // 🧹 Limpiar el estado de match
    //     setUserMatches([]);
    //     return;
    //   }
    };

    fetchMascotas();
  }, [location.state]);

  const isMatched = (id) => userMatches.includes(String(id));

  const handleClickConoceme = (mascota) => {
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
        handleClickConoceme,
        mascotas,
        setMascotas,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => useContext(PetContext);
