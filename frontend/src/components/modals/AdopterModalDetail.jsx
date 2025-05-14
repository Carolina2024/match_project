import PropTypes from "prop-types";

const AdopterModalDetail = ({ open, onClose, adopter }) => {
  if (!open || !adopter) return null;

  const { adopter: adopterDetails = {}, fullname, email, createdAt } = adopter;

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/10 backdrop-blur-[4px] z-10"
      ></div>

      <div className="relative bg-white p-8 rounded-xl shadow-xl w-[900px] max-h-[90vh] overflow-y-auto z-20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-4xl "
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-1">Registro del adoptante</h2>
        <p className="text-gray-500 text-sm mb-6">
          Fecha del registro:{" "}
          {createdAt
            ? new Date(createdAt).toLocaleDateString("es-CL")
            : "No disponible"}
        </p>

        <div className="grid grid-cols-2 gap-10 text-sm text-gray-800">
          {/* Columna izquierda */}
          <div className="space-y-8 border-r border-gray-300 pr-6">
            <div className="border-b border-gray-300 pb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Información personal
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Nombre completo</p>
                  <p>{fullname}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">
                    Fecha de nacimiento
                  </p>
                  <p>
                    {birthDate
                      ? new Date(birthDate).toLocaleDateString("es-CL")
                      : "No disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">
                    Correo electrónico
                  </p>
                  <p>{email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">
                    Documento de identidad
                  </p>
                  <p>{identityDocument || "No disponible"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs mb-1">
                    Dirección y comuna
                  </p>
                  <p>{address || "No disponible"}</p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-300 pb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Experiencia con mascotas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>

                  <p className="text-gray-500 text-xs mb-1">¿Tienes o has tenido mascotas antes?</p>

                  <p>{hadPets ? "Sí" : "No"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">¿Están o estuvieron vacunadas?</p>
                  <p>{hadPetsVaccinated ? "Sí" : "No"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">¿Están o estuvieron castrados?</p>
                  <p>{hadPetsCastrated ? "Sí" : "No"}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Preferencias
              </h3>
              <div className="text-gray-500 text-xs mb-1">Energía</div>
              {userPreferenceEnergy && (
                <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full inline-block mb-2">
                  {userPreferenceEnergy}
                </span>
              )}

              <div className="text-gray-500 text-xs mb-1">Carácter</div>
              {Array.isArray(userPreferenceTraits)
                ? userPreferenceTraits.map((trait, i) => (
                    <span
                      key={i}
                      className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full inline-block mr-2 mb-2"
                    >
                      {trait}
                    </span>
                  ))
                : userPreferenceTraits && (
                    <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full inline-block mb-2">
                      {userPreferenceTraits}
                    </span>
                  )}

              <div className="text-gray-500 text-xs mb-1">Compatibilidad</div>
              <div className="space-x-2">
                {userPreferenceChildren && (
                  <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full inline-block mb-2">
                    Con niños
                  </span>
                )}
                {userPreferenceDogs && (
                  <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full inline-block mb-2">
                    Con perros
                  </span>
                )}
                {userPreferenceCats && (
                  <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full inline-block mb-2">
                    Con gatos
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8 pl-6">
            <div className="border-b border-gray-300 pb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Información de vivienda
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs mb-1">
                    Espacio disponible
                  </p>
                  <p>{homeType || "No especificado"}</p>
                </div>
                <div>

                  <p className="text-gray-500 text-xs mb-1">¿El edificio/condominio permite mascotas?</p>

                  <p>{allowsPets ? "Sí" : "No"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs mb-1">¿Cuantas horas al dia estaria sola la mascota?</p>
                  <p>{hoursAlone || "No especificado"}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                Responsabilidad
              </h3>
              <div className="space-y-2">
                <p className="text-gray-500 text-xs mb-1">
                  ¿Qué harías si la mascota rompe algo?
                </p>
                <p className="italic">{petDestroy || "No especificado"}</p>

                <p className="text-gray-500 text-xs mb-1">¿Estas dispuesto a llevarlo al veterinario?</p>
                <p>{preparedToVisitVeterinarian ? "Sí" : "No"}</p>


                <p className="text-gray-500 text-xs mb-1">¿Estas dispuesto a recibir visitas de seguimiento?</p>
                <p>{allowsVisit ? "Sí" : "No"}</p>

                <p className="text-gray-500 text-xs mb-1">¿Estas dispuesto a firmar un compromiso de adopción responsable?</p>

                <p>{isResponsibleAdoption ? "Sí" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdopterModalDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  adopter: PropTypes.shape({
    fullname: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    adopter: PropTypes.shape({
      identityDocument: PropTypes.string,
      birthDate: PropTypes.string,
      address: PropTypes.string,
      homeType: PropTypes.string,
      allowsPets: PropTypes.bool,
      hadPets: PropTypes.bool,
      hadPetsVaccinated: PropTypes.bool,
      hadPetsCastrated: PropTypes.bool,
      petDestroy: PropTypes.string,
      preparedToVisitVeterinarian: PropTypes.bool,
      allowsVisit: PropTypes.bool,
      isResponsibleAdoption: PropTypes.bool,
      userPreferenceEnergy: PropTypes.string,
      userPreferenceTraits: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      userPreferenceDogs: PropTypes.bool,
      userPreferenceCats: PropTypes.bool,
      userPreferenceChildren: PropTypes.bool,
      hoursAlone: PropTypes.string,
    }),
  }),
};

export default AdopterModalDetail;
