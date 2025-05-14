import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [seleccionada, setSeleccionada] = useState(null);
  const [showCheckMatch3, setShowCheckMatch3] = useState(false);
  const [showCheckMatch4, setShowCheckMatch4] = useState(false);
  const navigate = useNavigate();

  const handleMatchClick = () => {
    setShowCheckMatch3(true);
  };

  const handleConfirmMatch = (id) => {
    console.log("Confirmar match con id:", id);
    setShowCheckMatch3(false);
    setShowCheckMatch4(true);
  };

  const handleGoToTracking = () => {
    navigate("/seguimiento");
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
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => useContext(PetContext);
