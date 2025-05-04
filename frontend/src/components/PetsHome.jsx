import { useState } from "react";
import mascotas from "./petsData";
import { FaCheckCircle, FaHeart } from 'react-icons/fa';
console.log(mascotas);
function PetsHome() {
  const [seleccionada, setSeleccionada] = useState(null);

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
                  src={mascota.imagen}
                  alt={mascota.nombre}
                  className="w-full h-60 mx-auto object-fill bg-contain"
                />
                <div className="flex justify-between items-center">
                  <h3 className="text-center font-bold mt-2">
                    {mascota.nombre}
                  </h3>
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => setSeleccionada(mascota)}
                      className="border border-primary rounded-2xl cursor-pointer text-sm px-3 py-1 text-primary bg-white"
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // 🧡 Mostrar solo la mascota seleccionada
        <div className="p-4">
          <button
            onClick={() => setSeleccionada(null)}
            className="mb-4 bg-white font-semibold rounded-full shadow-md text-primary hover:bg-orange-100 px-6 py-2 transition cursor-pointer"
          >
            Volver
          </button>
          <div className="flex">
            <div className="left flex flex-col justify-center items-center text-center">
              <img
                src={seleccionada.imagen}
                alt={seleccionada.nombre}
                className="w-80 h-auto object-cover mb-4 bg-contain"
              />
              <h2 className="text-2xl font-bold mb-2">{seleccionada.nombre}</h2>
              <div className="mt-2 items-center text-center w-full flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 items-center justify-center w-6/12">
                  {seleccionada.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p>
                <strong>Historia:</strong> {seleccionada.historia}
              </p>
              <p>
                <strong>Descripción:</strong> {seleccionada.descripcion}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3.5">
                <h2 className="text-2xl text-primary font-bold">¿Cómo soy?</h2>
                <div className="grid grid-cols-2 gap-y-2 gap-x-50 max-w-x">
                  <div className="flex flex-col">
                    <p className="text-lg">
                      {seleccionada.especie}
                    </p>
                    <p className="text-xs text-gray-500">Especie</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.raza}</p>
                    <p className="text-xs text-gray-500">Raza</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">
                      {seleccionada.tamaño}
                    </p>
                    <p className="text-xs text-gray-500">Tamaño</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">
                      {seleccionada.actividad}
                    </p>
                    <p className="text-xs text-gray-500">Nivel actividad</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.edad}</p>
                    <p className="text-xs text-gray-500">Edad</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.peso}</p>
                    <p className="text-xs text-gray-500">Peso</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg">{seleccionada.sexo}</p>
                    <p className="text-xs text-gray-500">sexo</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-50">
                <div className="flex flex-col gap-2.5">
                  <h2 className="text-2xl text-primary font-bold">Me entregan</h2>
                  <ul className="flex flex-col gap-1">
                    <li className="flex gap-2 items-center"><FaCheckCircle className="text-[#8AC345]"/>desparasitado</li>
                    <li className="flex gap-2 items-center"><FaCheckCircle className="text-[#8AC345]"/>desparasitado</li>
                    <li className="flex gap-2 items-center"><FaCheckCircle className="text-[#8AC345]"/>desparasitado</li>
                    <li className="flex gap-2 items-center"><FaCheckCircle className="text-[#8AC345]"/>desparasitado</li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-primary font-semibold">Me rescataron el dia</h3>
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-xs">28/05/2015</p>
                    <button className="flex text-center justify-center cursor-pointer items-center gap-1 bg-white border border-primary text-primary rounded-md px-5 py-2 hover:bg-orange-100">Match<FaHeart className="ml-1"/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetsHome;
