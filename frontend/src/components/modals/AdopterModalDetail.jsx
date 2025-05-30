import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";


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
    <div className=" fixed inset-0 flex items-center justify-center z-50 p-2">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#00000026] backdrop-blur-[3px] z-10"
      ></div>

      <div className="relative bg-[#FFFFFF] p-8 rounded-[20px] shadow-xl w-[317px] sm:w-[1000px] max-h-[90vh] overflow-y-auto z-20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black text-4xl "
        >
          <FiX size={24} color="#595146" />
        </button>
        <div className="mt-4">
          <h2 className="font-secundary font-bold text-[20px] text-tertiary mb-1 text-center sm:text-left">
            Registro del adoptante
          </h2>
          <p className="font-secundary font-medium text-[14px] text-[#767575] text-sm mb-6 text-center sm:text-left">
            Fecha del registro:{" "}
            {createdAt
              ? new Date(createdAt).toLocaleDateString("es-CL")
              : "No disponible"}
          </p>

          <div className="w-full grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-4 px-2">
            <div className="w-full space-y-8 lg:border-r lg:border-gray-300 lg:pr-6">
              <div className="border-b border-gray-300 pb-4">
                <h3 className="font-secundary font-semibold text-[16px] text-tertiary text-sm mb-4">
                  Información personal
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3">
                      <span className="block sm:inline">Nombre </span>
                      <span className="block sm:inline">completo</span>
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {fullname}
                    </p>
                  </div>
                  <div>
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3 whitespace-nowrap">
                      <span className="block sm:inline">Fecha de </span>
                      <span className="block sm:inline"> nacimiento</span>
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {birthDate
                        ? new Date(birthDate).toLocaleDateString("es-CL")
                        : "No disponible"}
                    </p>
                  </div>
                  <div>
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3">
                      <span className="block sm:inline">Correo </span>
                      <span className="block sm:inline">electrónico</span>
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {email}
                    </p>
                  </div>
                  <div>
                    <p className="font-raleway font-semibold text-[16px] text-tertiary mb-3 whitespace-nowrap">
                      <span className="block sm:inline">Documento de </span>
                      <span className="block sm:inline">identidad</span>
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {identityDocument || "No disponible"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3">
                      Dirección y comuna
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {address || "No disponible"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-300 pb-4">
                <h3 className="font-secundary font-semibold text-[16px] text-tertiary  mb-4">
                  Experiencia con mascotas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3 w-[120px] sm:w-auto">
                      ¿Tienes o has tenido mascotas antes?
                    </p>

                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {hadPets ? "Sí" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3 w-[120px] sm:w-auto">
                      ¿Están o estuvieron vacunadas?
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {hadPetsVaccinated ? "Sí" : "No"}
                    </p>
                  </div>
                  <div>
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3 whitespace-nowrap">
                      ¿Están o estuvieron castrados?
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {hadPetsCastrated ? "Sí" : "No"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-secundary font-semibold text-[16px] text-tertiary  mb-4">
                  Preferencias de mascotas
                </h3>
                <div className="flex gap-6">
                  <div>
                    <div className="font-semibold text-[16px] text-tertiary font-raleway  mb-3">
                      Energía
                    </div>
                    {userPreferenceEnergy && (
                      <span className="font-raleway font-semibold text-[16px] text-white bg-[#ff9855] rounded-[10px] px-4 py-2 inline-block mb-2">
                        {userPreferenceEnergy}
                      </span>
                    )}
                  </div>

                  <div className="-ml-2 sm:ml-20">
                    <div className="font-semibold text-[16px] text-tertiary font-raleway mb-1">
                      Carácter
                    </div>
                    {Array.isArray(userPreferenceTraits)
                      ? userPreferenceTraits.map((trait, i) => (
                          <span
                            key={i}
                            className="font-raleway font-semibold text-[16px] text-white bg-[#ff9855] rounded-[10px] px-4 py-2 inline-block mr-2 mb-3"
                          >
                            {trait}
                          </span>
                        ))
                      : userPreferenceTraits && (
                          <span className="font-raleway font-semibold text-[16px] text-white bg-[#ff9855] rounded-[10px] px-4 py-2 inline-block mr-2 mb-3">
                            {userPreferenceTraits}
                          </span>
                        )}
                  </div>
                </div>

                <div className="font-semibold text-[16px] text-tertiary font-raleway mb-3 mt-2">
                  Compatibilidad
                </div>
                <div className="space-x-2">
                  {userPreferenceChildren && (
                    <span className="font-raleway font-semibold text-[16px] text-white bg-[#ff9855] rounded-[10px] px-4 py-2  mb-2 inline-block">
                      Con niños
                    </span>
                  )}
                  {userPreferenceDogs && (
                    <span className="font-raleway font-semibold text-[16px] text-white bg-[#ff9855] rounded-[10px] px-4 py-2  mb-2 inline-block">
                      Con perros
                    </span>
                  )}
                  {userPreferenceCats && (
                    <span className="font-raleway font-semibold text-[16px] text-white bg-[#ff9855] rounded-[10px] px-4 py-2  mb-2 inline-block">
                      Con gatos
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-5 pl-2">
              <div className="border-b border-gray-300 pb-2">
                <h3 className="font-secundary font-semibold text-[16px] text-tertiary text-sm  mb-4">
                  Información de vivienda
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3">
                      Espacio disponible
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {homeType || "No especificado"}
                    </p>
                  </div>
                  <div className="sm:ml-2 -ml-3">
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3 w-[179px] sm:w-auto">
                      ¿El edificio/condominio permite mascotas?
                    </p>

                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {allowsPets ? "Sí" : "No"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3">
                      ¿Cuantas horas al dia estaria sola la mascota?
                    </p>
                    <p className="font-normal text-[14px] text-[#767575] font-raleway">
                      {hoursAlone ? `${hoursAlone} horas` : "No especificado"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-secundary font-semibold text-[16px] text-tertiary mb-4">
                  Responsabilidad
                </h3>
                <div className="space-y-2">
                  <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3">
                    ¿Qué harías si la mascota rompe algo?
                  </p>
                  <p className="font-normal text-[14px] text-[#767575] font-raleway">
                    {petDestroy || "No especificado"}
                  </p>

                  <div className="flex gap-6 mb-7 sm:mb-2">
                    <div className="flex-1 ">
                      <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3 w-[120px] sm:w-auto">
                        ¿Estas dispuesto a llevarlo al veterinario?
                      </p>
                      <p className="font-normal text-[14px] text-[#767575] font-raleway">
                        {preparedToVisitVeterinarian ? "Sí" : "No"}
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3 w-[125px] sm:w-auto -ml-2 sm:ml-4">
                        ¿Estas dispuesto a recibir visitas de seguimiento?
                      </p>
                      <p className="font-normal text-[14px] text-[#767575] font-raleway -ml-2 sm:ml-4">
                        {allowsVisit ? "Sí" : "No"}
                      </p>
                    </div>
                  </div>

                  <p className="font-raleway font-semibold text-[16px] text-tertiary text-xs mb-3">
                    ¿Estas dispuesto a firmar un compromiso de adopción
                    responsable?
                  </p>

                  <p className="font-normal text-[14px] text-[#767575] font-raleway">
                    {isResponsibleAdoption ? "Sí" : "No"}
                  </p>
                </div>
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
      hoursAlone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

export default AdopterModalDetail;
