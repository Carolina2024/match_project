import { usePet } from "../context/PetContext";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import { getPetById } from "../api/PetsUser";

const InfoPet = () => {
  const {
    handleMatchClick,
    handleConfirmMatch,
    handleGoToTracking,
    showCheckMatch3,
    setShowCheckMatch3,
    showCheckMatch4,
  } = usePet();

  const [pet, setPet] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await getPetById(id);
        setPet(res);
        //   const userData = {
        //     fullname: res.fullname,
        //     email: res.email,
        //     password: res.password,
        //     birthDate: res.adopter.birthDate,
        //     phoneNumber: res.adopter.phoneNumber,
        //     identityDocument: res.adopter.identityDocument,
        //     address: res.adopter.address,
        //     homeType: res.adopter.homeType,
        //     allowsPets: res.adopter.allowsPets,
        //     hadPets: res.adopter.hadPets,
        //     hadPetsVaccinated: res.adopter.hadPetsVaccinated,
        //     hadPetsCastrated: res.adopter.hadPetsCastrated,
        //     hoursAlone: +res.adopter.hoursAlone,
        //     petDestroy: res.adopter.petDestroy,
        //     preparedToVisitVeterinarian: res.adopter.preparedToVisitVeterinarian,
        //     allowsVisit: res.adopter.allowsVisit,
        //     isResponsibleAdoption: res.adopter.isResponsibleAdoption,
        //     userPreferenceEnergy: res.adopter.userPreferenceEnergy,
        //     userPreferenceTraits: res.adopter.userPreferenceTraits,
        //     userPreferenceDogs: res.adopter.userPreferenceDogs,
        //     userPreferenceCats: res.adopter.userPreferenceCats,
        //     userPreferenceChildren: res.adopter.userPreferenceChildren,
        //   };
      } catch (error) {
        console.error("Error obteniendo nombre:", error.message);
      }
    };

    fetchPet();
  }, []);

  if (pet.photoUrls === undefined) return <p>No hay mascota seleccionada.</p>;

  return (
    <>
      <div className="flex flex-col -mt-15">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="mb-4 bg-white font-semibold rounded-full shadow-md text-primary hover:bg-orange-100 px-6 py-2 transition cursor-pointer w-fit "
        >
          Volver
        </button>

        <div className="flex flex-col sm:gap-10 gap-15">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="left flex flex-col justify-center items-center text-center w-full lg:w-1/2">
              {pet?.photoUrls?.length > 1 ? (
                <Carousel
                  autoPlay={true}
                  infiniteLoop
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false}
                  className="w-full max-w-md mx-auto"
                >
                  {pet.photoUrls.slice(0, 3).map((url, i) => (
                    <div key={i}>
                      <img
                        src={url}
                        alt={`Imagen ${i + 1}`}
                        loading="lazy"
                        className="object-cover w-full h-80 rounded-md"
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <div className="w-full max-w-md mx-auto">
                  <img
                    src={pet.photoUrls[0]}
                    alt={pet.name}
                    loading="lazy"
                    className="object-cover w-full h-80 rounded-md"
                  />
                </div>
              )}

              <h2 className="text-2xl font-bold mt-4">{pet.name}</h2>

              <div className="mt-2 w-full flex flex-wrap gap-2 justify-center px-4">
                {pet.traits.map((trait, idx) => (
                  <span
                    key={idx}
                    className="border border-primary text-primary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-1/2 px-4">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl text-primary font-bold">¿Cómo soy?</h2>
                <div className="grid grid-cols-2 gap-y-2 text-left">
                  <div>
                    <p className="text-lg">{pet.species}</p>
                    <p className="text-xs text-gray-500">Especie</p>
                  </div>
                  <div>
                    <p className="text-lg">{pet.breed}</p>
                    <p className="text-xs text-gray-500">Raza</p>
                  </div>
                  <div>
                    <p className="text-lg">{pet.size}</p>
                    <p className="text-xs text-gray-500">Tamaño</p>
                  </div>
                  <div>
                    <p className="text-lg">{pet.energy}</p>
                    <p className="text-xs text-gray-500">Nivel actividad</p>
                  </div>
                  <div>
                    <p className="text-lg">{pet.age}</p>
                    <p className="text-xs text-gray-500">Edad</p>
                  </div>
                  <div>
                    <p className="text-lg">{pet.kg} kg</p>
                    <p className="text-xs text-gray-500">Peso</p>
                  </div>
                  <div>
                    <p className="text-lg">{pet.sex}</p>
                    <p className="text-xs text-gray-500">Sexo</p>
                  </div>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden md:flex flex-col md:flex-row md:items-start sm:gap-35 gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl text-primary font-bold">
                    Me entregan
                  </h2>
                  <ul>
                    {pet.isVaccinated && (
                      <li className="flex gap-2 items-center">
                        <FaCheckCircle className="text-[#8AC345]" />
                        Vacunado
                      </li>
                    )}
                    {pet.isSterilized && (
                      <li className="flex gap-2 items-center">
                        <FaCheckCircle className="text-[#8AC345]" />
                        Esterilizado
                      </li>
                    )}
                    {pet.isDewormed && (
                      <li className="flex gap-2 items-center">
                        <FaCheckCircle className="text-[#8AC345]" />
                        Desparasitado
                      </li>
                    )}
                    {pet.hasMicrochip && (
                      <li className="flex gap-2 items-center">
                        <FaCheckCircle className="text-[#8AC345]" />
                        Con microchip
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col justify-between h-full gap-2">
                  <div>
                    <h3 className="text-primary font-semibold">
                      Me rescataron el día
                    </h3>
                    <p className="text-xs">{pet.admissionDate}</p>
                  </div>
                  <button
                    className="flex justify-center items-center gap-1 bg-primary border-primary text-white rounded-md px-5 py-2 cursor-pointer"
                    onClick={handleMatchClick}
                  >
                    Match <FaHeart className="ml-1" />
                  </button>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-3 md:hidden">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-primary font-semibold">Me entregan</h2>
                    <ul className="text-sm">
                      {pet.isDewormed && (
                        <li className="flex items-center gap-1">
                          <FaCheckCircle className="text-[#8AC345]" />
                          Desparasitado
                        </li>
                      )}
                      {pet.hasMicrochip && (
                        <li className="flex items-center gap-1">
                          <FaCheckCircle className="text-[#8AC345]" /> Con chip
                        </li>
                      )}
                      {pet.isVaccinated && (
                        <li className="flex items-center gap-1">
                          <FaCheckCircle className="text-[#8AC345]" />
                          Vacunado
                        </li>
                      )}
                      {pet.isSterilized && (
                        <li className="flex items-center gap-1">
                          <FaCheckCircle className="text-[#8AC345]" />
                          Esterilizado
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="flex flex-col items-end text-sm">
                    <h3 className="text-primary font-semibold">
                      Me rescataron el día
                    </h3>
                    <p>{pet.admissionDate}</p>
                  </div>
                </div>

                <button
                  className="self-center bg-primary text-white flex items-center gap-1 px-4 py-2 rounded-md"
                  onClick={handleMatchClick}
                >
                  Match <FaHeart className="ml-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h2 className="text-2xl font-semibold text-primary">Mi historia</h2>
            <div className="bg-white p-5 rounded-md">
              <p>{pet.story}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmación match */}
      {showCheckMatch3 && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] bg-opacity-20 flex items-center justify-center px-4">
          <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-lg p-6 w-96 text-center space-y-4">
            <h1 className="text-primary font-bold text-3xl">
              ¿Estás seguro que quieres hacer match?
            </h1>
            <div className="flex justify-center gap-10">
              <button
                onClick={() => handleConfirmMatch(pet.id)}
                className="bg-primary text-white font-semibold py-2 px-14 rounded-full cursor-pointer"
              >
                Sí
              </button>
              <button
                onClick={() => setShowCheckMatch3(false)}
                className="bg-white border border-primary text-primary font-medium py-2 px-13 rounded-full cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmación enviada */}
      {showCheckMatch4 && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] bg-opacity-20 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-4 text-center space-y-4">
            <h2 className="text-primary font-bold text-4xl">
              ¡Felicitaciones!
            </h2>
            <p className="text-primary text-lg leading-snug sm:text-lg">
              Tu solicitud se ha enviado <br />
              con éxito a la fundación. <br />
              Te avisaremos al brevedad sobre tu solicitud
            </p>
            <div className="flex justify-center sm:flex-row gap-6 mt-6">
              <button
                className="bg-primary text-white font-semibold py-2 px-6 rounded-full shadow-md transition cursor-pointer"
                onClick={handleGoToTracking}
              >
                Ir a seguimiento de tu match
              </button>
              <button className="border border-primary text-primary hover:bg-orange-100 font-semibold py-2 px-6 rounded-full transition">
                Inicio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPet;
