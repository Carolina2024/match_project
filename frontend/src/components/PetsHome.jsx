import { usePet } from "../context/PetContext";

function PetsHome() {
  const { matchedPet, handleClickMeet, mascotas } = usePet();

  function doNothing() {}

  return (
    <div className="mx-auto bg-transparent">
      <h2 className="text-3xl md:text-4xl font-bold font-secundary text-primary text-center mt-0">
        Tus mascotas compatibles
      </h2>
      <hr className="w-3/5 border-t-1 border-primary mx-auto mt-4 md:mb-10 mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-1 h-full bg-transparent">
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="p-4 items-center text-center">
            <img
              src={mascota.photoUrls[0]}
              alt={mascota.name}
              className="md:w-55 md:h-55 mx-auto object-cover bg-contain md:rounded-[80px] rounded-full hover:scale-105 transition mb-2"
            />
            <div className="flex flex-col gap-3 items-center">
              <div>
                <h3 className="text-center md:text-2xl text-xl font-normal mt-2 mb-1">
                  {mascota.name}, {mascota.sex}
                </h3>
                <p className="font-extrabold md:text-2xl text-lg font-tertiary text-primary">
                  {(mascota.traits.find(trait => trait.length <= 10))}
                </p>
              </div>
              <div className="flex flex-col mt-2">
                <button
                  onClick={() =>
                    matchedPet?.photoUrls !== undefined
                      ? doNothing()
                      : handleClickMeet(mascota)
                  }
                  className="border border-primary rounded-4xl shadow-lg cursor-pointer md:text-xl text-base px-6 py-2 text-white font-bold bg-primary hover:scale-105 transition"
                >
                  Conóceme
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
