import { usePet } from "../context/PetContext";
import { FaHeart } from "react-icons/fa";
import { MdCheckCircleOutline } from "react-icons/md";
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
          className="mb-4 ml-24 bg-white font-bold text-base rounded-full shadow-md text-primary px-7 py-2 transition cursor-pointer w-fit "
        >
          <svg
            className="inline mr-2"
            width="20"
            height="11"
            viewBox="0 0 20 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.5H19M5 9.5L1 5.5L5 9.5ZM1 5.5L5 1.5L1 5.5Z"
              stroke="#FAAA75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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

              <h2 className="text-2xl font-normal mt-3 mb-1">{pet.name}</h2>

              <div className="mt-2 w-full flex flex-wrap gap-4 justify-center px-4">
                {pet.traits.map((trait, idx) => (
                  <span
                    key={idx}
                    className="border-3 border-primary text-primary px-5 py-1 rounded-full text-xl font-bold"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-1/2 px-4">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl text-primary font-bold">¿Cómo soy?</h2>
                <div className="grid grid-cols-2 gap-y-2 text-left">
                  <div>
                    <p className="text-xl font-normal">{pet.species}</p>
                    <p className="text-sm text-[#767575] font-normal">
                      Especie
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-normal">{pet.breed}</p>
                    <p className="text-sm text-[#767575] font-normal">Raza</p>
                  </div>
                  <div>
                    <p className="text-xl font-normal">{pet.size}</p>
                    <p className="text-sm text-[#767575] font-normal">Tamaño</p>
                  </div>
                  <div>
                    <p className="text-xl font-normal">{pet.energy}</p>
                    <p className="text-sm text-[#767575] font-normal">
                      Nivel actividad
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-normal">{pet.age}</p>
                    <p className="text-sm text-[#767575] font-normal">Edad</p>
                  </div>
                  <div>
                    <p className="text-xl font-normal">{pet.kg} kg</p>
                    <p className="text-sm text-[#767575] font-normal">Peso</p>
                  </div>
                  <div>
                    <p className="text-xl font-normal">{pet.sex}</p>
                    <p className="text-sm text-[#767575] font-normal">Sexo</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-col md:flex-row md:items-start sm:gap-35 gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-3xl text-primary font-bold">
                    Me entregan
                  </h2>
                  <ul>
                    {pet.isVaccinated && (
                      <li className="flex gap-5 items-center text-xl font-normal mb-2">
                        <MdCheckCircleOutline className="text-[#8AC345]" />
                        Vacunado
                      </li>
                    )}
                    {pet.isSterilized && (
                      <li className="flex gap-5 items-center text-xl font-normal mb-2">
                        <MdCheckCircleOutline className="text-[#8AC345]" />
                        Esterilizado
                      </li>
                    )}
                    {pet.isDewormed && (
                      <li className="flex gap-5 items-center text-xl font-normal mb-2">
                        <MdCheckCircleOutline className="text-[#8AC345]" />
                        Desparasitado
                      </li>
                    )}
                    {pet.hasMicrochip && (
                      <li className="flex gap-5 items-center text-xl font-normal mb-2">
                        <MdCheckCircleOutline className="text-[#8AC345]" />
                        Con microchip
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col justify-between h-full gap-2">
                  <div>
                    <h3 className="text-primary font-bold text-xl mb-6">
                      Me rescataron el día
                    </h3>
                    <p className="text-base text-[#222222] font-normal">
                      {pet.admissionDate.split("-").reverse().join("/")}
                    </p>
                  </div>
                  <button
                    className="flex justify-center font-bold animate-heartbeat text-xl items-center gap-1 bg-primary border-primary text-white rounded-4xl mx-auto px-10 py-2 cursor-pointer"
                    onClick={handleMatchClick}
                  >
                    Match <FaHeart className="ml-1 text-base" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:hidden">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-primary font-semibold">Me entregan</h2>
                    <ul className="text-sm leading-9">
                      {pet.isDewormed && (
                        <li className="flex items-center gap-1">
                          <MdCheckCircleOutline className="text-[#8AC345] mb-2" />
                          Desparasitado
                        </li>
                      )}
                      {pet.hasMicrochip && (
                        <li className="flex items-center gap-1">
                          <MdCheckCircleOutline className="text-[#8AC345] mb-2" />{" "}
                          Con chip
                        </li>
                      )}
                      {pet.isVaccinated && (
                        <li className="flex items-center gap-1">
                          <MdCheckCircleOutline className="text-[#8AC345] mb-2" />
                          Vacunado
                        </li>
                      )}
                      {pet.isSterilized && (
                        <li className="flex items-center gap-1">
                          <MdCheckCircleOutline className="text-[#8AC345] mb-2" />
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

          <div className="flex flex-col gap-2.5 mb-10 px-10">
            <h2 className="text-3xl font-bold text-primary mb-5">
              Mi historia
            </h2>
            <div className="bg-white p-5 rounded-2xl">
              <p className="font-normal text-xl font-secundary">{pet.story}</p>
            </div>
          </div>
        </div>
      </div>

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
