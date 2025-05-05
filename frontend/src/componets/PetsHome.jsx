import { useState, useEffect } from "react";
import { getCompatiblePets } from "../api/PetsUser"; //
import { FaCheckCircle, FaHeart } from "react-icons/fa";
function PetsHome() {
  const [seleccionada, setSeleccionada] = useState(null);
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const fetchMascotas = async (userId) => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await getCompatiblePets(userId);
        const pets = data.items;
        setMascotas(pets);
        console.log(mascotas);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMascotas();
  }, []);

  return (
    <div className="mx-auto p-2.5 h-full">
      {!seleccionada ? (
        // 🐾 Mostrar todas las mascotas
        <>
          <h2 className="text-xl font-semibold mb-4">
            Estos son tus compañeros ideales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {mascotas.map((mascota) => (
              <div
                key={mascota.id}
                className="p-4 items-center text-center h-screen"
              >
                <img
                  src={mascota.photoUrls[0]}
                  alt={mascota.name}
                  className="w-50 h-45 mx-auto object-fill bg-contain rounded-3xl"
                />
                <div className="flex flex-col justify-between items-center">
                  <h3 className="text-center text-2xl font-bold mt-2">
                    {mascota.name}
                  </h3>
                  <div className="flex flex-col mt-2">
                    <button
                      onClick={() => setSeleccionada(mascota)}
                      className="border border-primary rounded-md cursor-pointer text-sm px-3 py-1 text-primary bg-white"
                    >
                      Conoceme
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // 🧡 Mostrar solo la mascota seleccionada
        <div className="p-4 flex flex-col">
          <button
            onClick={() => setSeleccionada(null)}
            className="mb-4 bg-white font-semibold rounded-full shadow-md text-primary hover:bg-orange-100 px-6 py-2 transition cursor-pointer w-fit"
          >
            Volver
          </button>
          <div className="flex">
            <div className="left flex flex-col justify-center items-center text-center">
              <img
                src={seleccionada.photoUrls[0]}
                alt={seleccionada.name}
                className="w-120 h-80 object-cover mb-4 bg-contain p-10"
              />
              <h2 className="text-2xl font-bold mb-2">{seleccionada.nombre}</h2>
              <div className="mt-2 items-center text-center w-full flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 items-center h-fit justify-center w-8/12">
                  {seleccionada.traits.map((trait, idx) => (
                    <span
                      key={idx}
                      className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium "
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3.5">
                <h2 className="text-2xl text-primary font-bold">¿Cómo soy?</h2>
                <div className="grid grid-cols-2 gap-y-2 gap-x-50 max-w-x">
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.species}</p>
                    <p className="text-xs text-gray-500">Especie</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.breed}</p>
                    <p className="text-xs text-gray-500">Raza</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.size}</p>
                    <p className="text-xs text-gray-500">Tamaño</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.energy}</p>
                    <p className="text-xs text-gray-500">Nivel actividad</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.age}</p>
                    <p className="text-xs text-gray-500">Edad</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.kg}</p>
                    <p className="text-xs text-gray-500">Peso</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.sex}</p>
                    <p className="text-xs text-gray-500">sexo</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-50">
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-2xl text-primary font-bold">
                    Me entregan
                  </h2>
                  <ul>
                    {seleccionada.isVaccinated && (
                      <li className="flex gap-2 items-center">
                        <FaCheckCircle className="text-[#8AC345]" />
                        vacunado
                      </li>
                    )}
                    {seleccionada.isSterilized && (
                      <li className="flex gap-2 items-center">
                        <FaCheckCircle className="text-[#8AC345]" />
                        esterilizado
                      </li>
                    )}
                    {seleccionada.isDewormed && (
                      <li className="flex gap-2 items-center">
                        <FaCheckCircle className="text-[#8AC345]" />
                        desparasitado
                      </li>
                    )}
                    {seleccionada.hasMicrochip && (
                      <li className="flex gap-2 items-center">
                        <FaCheckCircle className="text-[#8AC345]" />
                        con microchip
                      </li>
                    )}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-primary font-semibold">
                    Me rescataron el dia
                  </h3>
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-xs">{seleccionada.admissionDate}</p>
                    <button className="flex text-center justify-center cursor-pointer items-center gap-1 bg-white border border-primary text-primary rounded-md px-5 py-2 hover:bg-orange-100">
                      Match
                      <FaHeart className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <h2 className="text-2xl font-semibold text-primary">Mi historia</h2>
            <div
              className="h-24 bg-white
              p-2 rounded-md"
            >
              <p>{seleccionada.story}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetsHome;
