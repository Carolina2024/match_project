import { Trash2 } from "lucide-react";
import { FaTimes } from "react-icons/fa";

const AdopterModalDetail = ({ open, onClose, adopter }) => {
  if (!open || !adopter) return null;

  const {
    adopter: adopterDetails = {},
    fullname,
    email,
    createdAt,
    isActive,
  } = adopter;

  const {
    birthDate,
    hoursAlone,
    identityDocument,
    address,
    homeType,
    allowsPets,
    hadPets,
    hadPetsVaccinated,
    hadPetsCastrated,
    petDestroy,
    preparedToVisitVeterinarian,
    allowsVisit,
    isResponsibleAdoption,
    userPreferenceEnergy,
    userPreferenceTraits,
    userPreferenceDogs,
    userPreferenceCats,
    userPreferenceChildren,
  } = adopterDetails;

  console.log("adopter:", adopter);
  console.log("birthDate:", adopter?.birthDate);
  console.log(adopterDetails);
  console.log("hoursAlone:", hoursAlone);
  console.log("Adopter Data:", adopter);
  console.log(adopter);
  console.log("Fecha creada:", createdAt);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10"
      ></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[500px] z-20">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          X
        </button>

        <div className="mb-4">
          <h2 className="text-2xl font-bold">Registro del adoptante</h2>
          <p className="mb-2">
            <strong>Registrado el:</strong>{" "}
            <span className={createdAt ? "" : "text-red-500"}>
              {createdAt
                ? new Date(createdAt).toLocaleDateString("es-CL")
                : "No disponible"}
            </span>
          </p>
        </div>

        <div className="overflow-y-auto h-[70vh] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
            <div>
              <h3 className="font-semibold mb-2">Información personal</h3>
              <p>
                <span className="font-medium">Nombre completo:</span> {fullname}
              </p>
              <p>
                <span className="font-medium">Fecha de nacimiento:</span>{" "}
                <span className={birthDate ? "" : "text-red-500"}>
                  {birthDate
                    ? new Date(birthDate).toLocaleDateString("es-CL")
                    : "No disponible"}
                </span>
              </p>

              <p>
                <span className="font-medium">Correo electrónico:</span> {email}
              </p>
              <p>
                <span className="font-medium">Documento de identidad:</span>{" "}
                {adopter?.identityDocument || "No disponible"}
              </p>
              <p>
                <span className="font-medium">Dirección y comuna:</span>{" "}
                {adopter?.address || "No disponible"}
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
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">Espacio disponible:</span>
                {adopter?.homeType === "Departamento pequeño/mediano" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Tranquilo
                  </span>
                )}
                {adopter?.homeType ===
                  "Departamento grande (con balcón) o casa chica (con patio y/o antejardín" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Moderado
                  </span>
                )}
                {adopter?.homeType ===
                  "Departamento grande (con balcón) o casa chica (con patio y/o antejardín" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Muy activo
                  </span>
                )}
                {![
                  "Departamento pequeño/mediano",
                  "Departamento grande (con balcón) o casa chica (con patio y/o antejardín",
                  "Departamento grande (con balcón) o casa chica (con patio y/o antejardín",
                ].includes(adopter?.homeType) && (
                  <span className="text-sm text-red-600">
                    No se registró una preferencia de espacio.
                  </span>
                )}
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
                <span className={adopter?.hoursAlone ? "" : "text-red-500"}>
                  {adopter?.hoursAlone || "No especificado"}
                </span>
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
              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">Energía:</span>
                {adopter?.userPreferenceEnergy === "Tranquilo" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Tranquilo
                  </span>
                )}
                {adopter?.userPreferenceEnergy === "Moderado" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Moderado
                  </span>
                )}
                {adopter?.userPreferenceEnergy === "Muy activo" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Muy activo
                  </span>
                )}
                {!["Tranquilo", "Moderado", "Muy activo"].includes(
                  adopter?.userPreferenceEnergy
                ) && (
                  <span className="text-sm text-red-600">
                    No se registró una preferencia de energía.
                  </span>
                )}
              </p>

              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">Carácter:</span>
                {adopter?.userPreferenceTraits === "Cariñoso" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Tranquilo
                  </span>
                )}
                {adopter?.userPreferenceTraits === "Independiente" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Moderado
                  </span>
                )}
                {adopter?.userPreferenceTraits === "Protector" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Muy activo
                  </span>
                )}
                {adopter?.userPreferenceTraits === "Juguetón" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Muy activo
                  </span>
                )}
                {!["Cariñoso", "Independiente", "Protector"].includes(
                  adopter?.userPreferenceTraits
                ) && (
                  <span className="text-sm text-red-600">
                    No se registró un carácter.
                  </span>
                )}
              </p>

              <p className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">Compatibilidad:</span>
                {adopter?.userPreferenceChildren === "Con niños" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Tranquilo
                  </span>
                )}
                {adopter?.userPreferenceDogs === "Con perros" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Moderado
                  </span>
                )}
                {adopter?.userPreferenceCats === "Con gatos" && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Muy activo
                  </span>
                )}
                {!adopter?.userPreferenceChildren &&
                  !adopter?.userPreferenceDogs &&
                  !adopter?.userPreferenceCats && (
                    <span className="text-sm text-red-600">
                      No se registraron preferencias de compatibilidad.
                    </span>
                  )}
              </p>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold mb-2">Responsabilidad</h3>
              <p>
                <span className="font-medium">
                  ¿Qué harías si la mascota rompe algo o tiene problemas de
                  comportamiento?:
                </span>{" "}
                {adopter?.petDestroy || (
                  <span className="text-red-600">
                    No se registró una respuesta.
                  </span>
                )}
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
        </div>
      </div>
    </div>
  );
};

export default AdopterModalDetail;
