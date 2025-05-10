import { Trash2 } from "lucide-react";
import { FaTimes } from "react-icons/fa";

const AdopterModalDetail = ({ open, onClose, adopter }) => {
  if (!open || !adopter) return null;


  const {
    birthDate,
    identityDocument,
    address,
    homeType,
    allowsPets,
    hadPets,
    hadPetsVaccinated,
    hadPetsCastrated,
    hoursAlone,
    petDestroy,
    preparedToVisitVeterinarian,
    allowsVisit,
    isResponsibleAdoption,
    userPreferenceEnergy,
    userPreferenceTraits,
    userPreferenceDogs,
    userPreferenceCats,
    userPreferenceChildren,
  } = adopter;
  
  
  console.log("adopter:", adopter);
  console.log("birthDate:", adopter?.birthDate);


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo desenfocado */}
      <div
        onClick={onClose} // Cerrar modal si se hace clic fuera
        className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10"
      ></div>

      {/* Cuadro del modal */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[500px] z-20">
        {/* Botón de cierre "X" */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          X
        </button>

        <div className="mb-4">
          <h2 className="text-2xl font-bold">Registro del adoptante</h2>
          <p className="text-sm text-gray-500">
            Fecha del registro {adopter.registrationDate}
          </p>
        </div>

        <div className="overflow-y-auto h-[70vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
            <div>
              <h3 className="font-semibold mb-2">Información personal</h3>
              <p>
                <span className="font-medium">Nombre completo:</span>{" "}
                {adopter.fullname}
              </p>
              <p>
                <span className="font-medium">Fecha de nacimiento:</span>{" "}
                {birthDate
                  ? new Date(birthDate).toLocaleDateString("es-CL")
                  : "No disponible"}
              </p>

              <p>
                <span className="font-medium">Correo electrónico:</span>{" "}
                {adopter.email}
              </p>
              <p>
                <span className="font-medium">Documento de identidad:</span>{" "}
                {identityDocument}
              </p>
              <p>
                <span className="font-medium">Dirección y comuna:</span>{" "}
                {address}
              </p>
              <p>
                <span className="font-medium">Estado:</span>{" "}
                <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded">
                  Activo
                </span>
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Información de vivienda</h3>
              <p>
                <span className="font-medium">Espacio disponible:</span>{" "}
                {(() => {
                  switch (homeType) {
                    case "small_apartment":
                      return "Departamento pequeño";
                    case "large_apartment":
                      return "Departamento grande";
                    case "large_house":
                      return "Casa grande";
                    default:
                      return "No especificado"; // Si no hay un valor válido
                  }
                })()}
              </p>
              <p>
                <span className="font-medium">
                  ¿El edificio/condominio permite mascotas?:
                </span>{" "}
                {allowsPets ? "Sí" : "No"}
              </p>
              <p>
                <span className="font-medium">
                  ¿Cuántas horas al día estaría sola la mascota?:
                </span>{" "}
                {hoursAlone}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Experiencia con mascotas</h3>
              <p>
                <span className="font-medium">¿Ha tenido mascotas antes?:</span>{" "}
                {hadPets ? "Sí" : "No"}
              </p>
              <p>
                <span className="font-medium">¿Estuvieron vacunadas?:</span>{" "}
                {hadPetsVaccinated ? "Sí" : "No"}
              </p>
              <p>
                <span className="font-medium">¿Estuvieron castrados?:</span>{" "}
                {hadPetsCastrated ? "Sí" : "No"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Preferencias de mascotas</h3>
              <p>
                <span className="font-medium">Energía:</span>{" "}
                <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded">
                  {userPreferenceEnergy}
                </span>
              </p>
              <p>
                <span className="font-medium">Carácter:</span>{" "}
                <span className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded">
                  {[
                    userPreferenceDogs && "Perros",
                    userPreferenceCats && "Gatos",
                    userPreferenceChildren && "Niños",
                  ]
                    .filter(Boolean)
                    .join(", ") || "No especificado"}
                </span>
              </p>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Responsabilidad</h3>
              <p>
                <span className="font-medium">
                  ¿Qué harías si la mascota rompe algo?:
                </span>{" "}
                {petDestroy}
              </p>
              <p>
                <span className="font-medium">
                  ¿Estás dispuesto a llevarlo al veterinario?:
                </span>{" "}
                {preparedToVisitVeterinarian ? "Sí" : "No"}
              </p>
              <p>
                <span className="font-medium">
                  ¿Estás dispuesto a recibir visitas de seguimiento?:
                </span>{" "}
                {allowsVisit ? "Sí" : "No"}
              </p>
              <p>
                <span className="font-medium">
                  ¿Estás dispuesto a firmar un compromiso de adopción
                  responsable?:
                </span>{" "}
                {isResponsibleAdoption ? "Sí" : "No"}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdopterModalDetail;
