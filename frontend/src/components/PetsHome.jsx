import { useEffect, useState } from "react";
import { createMatch, getCompatiblePets, getUserMatchs } from "../api/PetsUser";
import { useNavigate, useLocation } from "react-router-dom";
import { usePet } from "../context/PetContext";

function PetsHome() {
  const {
    seleccionada,
    setSeleccionada,
    handleMatchClick,
    handleConfirmMatch,
    handleGoToTracking,
    showCheckMatch3,
    setShowCheckMatch3,
    showCheckMatch4,
  } = usePet();

  const [mascotas, setMascotas] = useState([]);
  const [userMatches, setUserMatches] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const matchedPet = mascotas.find((pet) =>
    userMatches.includes(String(pet.id))
  );

  useEffect(() => {
    const fetchMascotas = async () => {
      const data = await getCompatiblePets();
      setMascotas(data.items);

      const matches = await getUserMatchs();
      const isMatchRejected = matches.status === "Rechazado";

      if (isMatchRejected) {
        setUserMatches([matches.petId]);
      }

      if (location.state?.desdeSeguimiento && isMatchRejected) {
        setUserMatches([]);
        return;
      }
    };

    fetchMascotas();
  }, [location.state]);

  const isMatched = (id) => userMatches.includes(String(id));

  const handleClickConoceme = (mascota) => {
    setSeleccionada(mascota);
    navigate("/infopet");
  };

  return (
    <div className="mx-auto bg-transparent">
      <h1 className="text-3xl font-semibold mb-4 text-center text-primary">
        {matchedPet ? "Tu match te está esperando" : "Tus mascotas compatibles"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-1 h-full bg-transparent">
        {(matchedPet ? [matchedPet] : mascotas).map((mascota) => (
          <div key={mascota.id} className="p-4 items-center text-center">
            <img
              src={mascota.photoUrls[0]}
              alt={mascota.name}
              className="w-45 h-45 mx-auto object-fill bg-contain rounded-3xl"
            />
            <div className="flex flex-col gap-3 items-center">
              <div>
                <h3 className="text-center text-2xl font-semibold mt-2">
                  {mascota.name}, {mascota.sex}
                </h3>
                <p className="font-bold text-primary">{mascota.traits[0]}</p>
              </div>
              <div className="flex flex-col mt-2">
                <button
                  onClick={() =>
                    isMatched(mascota.id)
                      ? navigate("/seguimiento", {
                          state: {
                            nombre: mascota.name,
                            foto: mascota.photoUrls[0],
                          },
                        })
                      : handleClickConoceme(mascota)
                  }
                  className="border border-primary rounded-md cursor-pointer text-sm px-3 py-1 text-white font-semibold bg-primary"
                >
                  {isMatched(mascota.id) ? "Ver seguimiento" : "Conóceme"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetsHome;
