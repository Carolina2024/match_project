import { useState } from "react";
import mascotas from "./pets";
console.log(mascotas)
function PetsHome() {
    const [seleccionada, setSeleccionada] = useState(null);

    return (
        <div className="p-6 h-100">
        <h2 className="text-xl font-bold mb-6">Estos son tus compañeros ideales</h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mascotas.map((mascota) => (
            <div
              key={mascota.id}
              className="border rounded-lg shadow-sm p-4 bg-white"
            >
              {seleccionada === mascota.id ? (
                <div className="rounded-xl border shadow p-4 flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{mascota.nombre}</h3>
                  </div>
                  <img
                    src={mascota.imagen} alt={mascota.nombre}
                    className="w-32 h-32 object-cover mx-auto"
                  />
                  <div className="flex flex-wrap gap-2 justify-center">
                    {mascota.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-200 text-sm px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <h4 className="font-bold">¿Cómo soy?</h4>
                      <p className="text-sm text-gray-700">{mascota.descripcion}</p>
                    </div>
                    <div>
                      <h4 className="font-bold">Mi historia</h4>
                      <p className="text-sm text-gray-700">{mascota.historia}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSeleccionada(null)}
                      className="text-xs text-blue-500"
                    >
                      Volver
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 text-xs">
                      ❤️ Match
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={`/${mascota.imagen}`}
                    alt={mascota.nombre}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="font-medium">{mascota.nombre}</p>
                  <button
                    onClick={() => setSeleccionada(mascota.id)}
                    className="mt-2 bg-gray-400 text-white text-xs px-2 py-1 rounded"
                  >
                    Ver más
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
}

export default PetsHome