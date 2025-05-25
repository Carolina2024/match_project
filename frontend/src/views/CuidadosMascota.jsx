
import DecorativeLinePath from "../assets/icons/svg-components/DecorativeLinePath";
import paso1 from "../assets/cuidados1.webp";
import paso2 from "../assets/cuidados2.webp";
import paso3 from "../assets/cuidados3.webp";
import paso4 from "../assets/cuidados4.webp";
import paso5 from "../assets/cuidados5.webp";


const CuidadosMascota = () => {
  return (
    <section className=" px-4 max-w-6xl mx-auto space-y-24 -mt-8 bg-[#F9F9F9] pt-10 pb-4 rounded-4xl rounded-b-none shadow-md">
      <div className="hidden md:flex absolute top-1/2 left-0 right-0 justify-center -mt-30 mr-6">

      <DecorativeLinePath />

      </div>

      <div className="flex flex-col md:hidden w-full gap-4">
        <div className="flex items-start gap-2">
          <div className="bg-primary font-tertiary text-black w-10 h-10 rounded-full text-lg flex items-center justify-center font-medium mt-1">
            1
          </div>
          <div className="flex-1">
            <h2 className="text-primary font-bold text-base text-center mr-6 mb-2">
              Antes de adoptar
            </h2>

            <div className="flex gap-3">
              <div className="w-24 flex-shrink-0 mt-48">
                <img
                  src={paso1}
                  alt="Familia pensando en adopción"
                  className="w-full h-auto object-contain"
                />
              </div>

              <ul className="list-disc list-inside text-sm text-black space-y-1">
                <li>
                  Compromiso a largo plazo: perros y gatos viven entre 10 y 20
                  años.
                </li>
                <li>
                  <strong>Adoptar es una decisión de vida.</strong>
                </li>
                <li>
                  Espacio y tiempo: asegúrate de contar con un lugar seguro y el
                  tiempo necesario para cuidarlo.
                </li>
                <li>
                  Presupuesto mensual: contempla los gastos en comida, salud,
                  higiene y posibles imprevistos.
                </li>
                <li>
                  Consentimiento familiar: es importante que todos los miembros
                  del hogar estén de acuerdo.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full items-center gap-10">
        <div className="w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl mt-32">
          <img
            src={paso1}
            alt="Familia pensando en adopción"
            className="w-auto h-full object-cover transform md:-translate-y-12"
          />
        </div>
        <div className="w-3/4 md:-translate-y-10  ml-10">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Antes de adoptar
          </h2>
          <ul className="list-disc list-inside text-base text-black space-y-1">
            <li>
              Compromiso a largo plazo: perros y gatos viven entre 10 y 20 años.
            </li>
            <li>
              <strong>Adoptar es una decisión de vida.</strong>
            </li>
            <li>
              Espacio y tiempo: asegúrate de contar con un lugar seguro y el
              tiempo necesario para cuidarlo.
            </li>
            <li>
              Presupuesto mensual: contempla los gastos en comida, salud,
              higiene y posibles imprevistos.
            </li>
            <li>
              Consentimiento familiar: es importante que todos los miembros del
              hogar estén de acuerdo.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:hidden w-full gap-4 -mt-18">
        <div className="flex items-start justify-end gap-2">
          <div className="flex-1">
            <h2 className="text-primary font-bold text-base text-left mb-2">
              Primeros días en casa
            </h2>

            <div className="flex flex-row-reverse gap-3">
              <div className="w-24 flex-shrink-0 mt-26">
                <img
                  src={paso2}
                  alt="Niña acomodando mascota en nuevo hogar"
                  className="w-full h-auto object-contain"
                />
              </div>

              <ul className="list-disc list-inside text-sm text-black space-y-1">
                <li>
                  Ambiente tranquilo: evita ruidos fuertes y movimientos
                  bruscos. Necesita adaptarse.
                </li>
                <li>
                  Muéstrale su espacio: prepárale un rincón con cama, comida,
                  agua y, en el caso de los gatos, su caja de arena.
                </li>
                <li>
                  Paciencia: puede mostrarse asustado o tímido. Dale tiempo,
                  amor y rutinas.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary font-tertiary text-black w-10 h-10 rounded-full text-lg flex items-center justify-center font-medium mt-1">
            2
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full flex-row-reverse items-center gap-10 -mt-24">
        <div className="w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl mt-2">
          <img
            src={paso2}
            alt="Niña acomodando mascota en nuevo hogar"
            className="w-auto h-full object-cover transform md:-translate-y-12"
          />
        </div>
        <div className="w-2/4 md:-translate-y-20 mr-42 ">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Primeros días en casa
          </h2>
          <ul className="list-disc list-inside text-base text-black space-y-1">
            <li>
              Ambiente tranquilo: evita ruidos fuertes y movimientos bruscos.
              Necesita adaptarse.
            </li>
            <li>
              Muéstrale su espacio: prepárale un rincón con cama, comida, agua
              y, en el caso de los gatos, su caja de arena.
            </li>
            <li>
              Paciencia: puede mostrarse asustado o tímido. Dale tiempo, amor y
              rutinas.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:hidden w-full gap-4 -mt-24">
        <div className="flex items-start gap-2">
          <div className="bg-primary font-tertiary text-black w-10 h-10 rounded-full text-lg flex items-center justify-center font-medium mt-1">
            3
          </div>

          <div className="flex-1">
            <h2 className="text-primary font-bold text-base text-right mr-20 mb-2">
              Cuidados básicos diarios
            </h2>

            <div className="flex gap-3">
              <div className="w-24 flex-shrink-0 mt-20">
                <img
                  src={paso3}
                  alt="Persona paseando con mascota"
                  className="w-full h-auto object-contain"
                />
              </div>

              <ul className="list-disc list-inside text-sm text-black space-y-1">
                <li>
                  Alimentación adecuada: consulta con un veterinario el mejor
                  alimento para su edad y tamaño.
                </li>
                <li>Agua fresca siempre disponible.</li>
                <li>
                  Ejercicio y juego: los perros necesitan paseos diarios, y los
                  gatos estimulación y juego dentro de casa.
                </li>
                <li>
                  Higiene: cepillado frecuente, limpieza de orejas y control de
                  pulgas y garrapatas.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full items-center gap-10 -mt-10">
        <div className="w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl">
          <img
            src={paso3}
            alt="Persona paseando con mascota"
            className="w-auto h-full object-cover transform md:-translate-y-16"
          />
        </div>
        <div className="w-2/4 md:-translate-y-40 ml-30">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Cuidados básicos diarios
          </h2>
          <ul className="list-disc list-inside text-base text-black space-y-1">
            <li>
              Alimentación adecuada: consulta con un veterinario el mejor
              alimento para su edad y tamaño.
            </li>
            <li>Agua fresca siempre disponible.</li>
            <li>
              Ejercicio y juego: los perros necesitan paseos diarios, y los
              gatos estimulación y juego dentro de casa.
            </li>
            <li>
              Higiene: cepillado frecuente, limpieza de orejas y control de
              pulgas y garrapatas.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:hidden w-full gap-4 -mt-20">
        <div className="flex items-start justify-end gap-2">
          <div className="flex-1">
            <h2 className="text-primary font-bold text-base text-left mb-2">
              Salud
            </h2>

            <div className="flex flex-row-reverse gap-3">
              <div className="w-24 flex-shrink-0 mt-12">
                <img
                  src={paso4}
                  alt="Veterinario cuidando a mascota"
                  className="w-full h-auto object-contain"
                />
              </div>

              <ul className="list-disc list-inside text-sm text-black space-y-1">
                <li>
                  Visitas al veterinario: llévalo apenas llegue a casa para un
                  chequeo general.
                </li>
                <li>Vacunación y desparasitación al día.</li>
                <li>
                  Castración/esterilización: es clave para su salud y para
                  evitar la superpoblación.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary font-tertiary text-black w-10 h-10 rounded-full text-lg flex items-center justify-center font-medium mt-1">
            4
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full flex-row-reverse items-center gap-10 -mt-24">
        <div className="w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl mt-2">
          <img
            src={paso4}
            alt="Veterinario cuidando a mascota"
            className="w-auto h-full object-cover transform md:-translate-y-14"
          />
        </div>
        <div className="w-2/4 md:-translate-y-32 mr-42">
          <h2 className="text-3xl font-bold text-primary mb-4">Salud</h2>
          <ul className="list-disc list-inside text-base text-black space-y-1">
            <li>
              Visitas al veterinario: llévalo apenas llegue a casa para un
              chequeo general.
            </li>
            <li>Vacunación y desparasitación al día.</li>
            <li>
              Castración/esterilización: es clave para su salud y para evitar la
              superpoblación.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:hidden w-full gap-4 -mt-20">
        <div className="flex items-start gap-2">
          <div className="bg-primary font-tertiary text-black w-10 h-10 rounded-full text-lg flex items-center justify-center font-medium mt-1">
            5
          </div>

          <div className="flex-1">
            <h2 className="text-primary font-bold text-base text-right mr-38 mb-2">
              Amor y respeto
            </h2>

            <div className="flex gap-3">
              <div className="w-24 flex-shrink-0 mt-24">
                <img
                  src={paso5}
                  alt="Niña demostrando amor a su mascota"
                  className="w-full h-auto object-contain"
                />
              </div>

              <ul className="list-disc list-inside text-sm text-black space-y-1">
                <li>
                  No humanices, pero sí empatiza: respeta su lenguaje, su
                  espacio y sus tiempos.
                </li>
                <li>
                  Edúcalo con cariño y coherencia: el refuerzo positivo es la
                  mejor herramienta.
                </li>
                <li>
                  Nunca lo abandones: si cambia tu situación, busca redes de
                  ayuda, pero no lo dejes solo.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-full items-center gap-10 -mt-22">
        <div className="w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl">
          <img
            src={paso5}
            alt="Niña demostrando amor a su mascota"
            className="w-auto h-full object-cover transform md:-translate-y-14"
          />
        </div>
        <div className="w-3/4 md:-translate-y-38 ml-20">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Amor y respeto
          </h2>
          <ul className="list-disc list-inside text-base text-black space-y-1">
            <li>
              No humanices, pero sí empatiza: respeta su lenguaje, su espacio y
              sus tiempos.
            </li>
            <li>
              Edúcalo con cariño y coherencia: el refuerzo positivo es la mejor
              herramienta.
            </li>
            <li>
              Nunca lo abandones: si cambia tu situación, busca redes de ayuda,
              pero no lo dejes solo.
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-primary text-center font-bold md:text-3xl text-xl italic mb-0 md:-mt-40 -mt-20">
          Para más información te invitamos a
        </h2>
        <h2 className="text-primary text-center font-bold md:text-3xl text-xl italic mb-6">
          seguirnos en nuestras redes
        </h2>
      </div>
    </section>
  );
};

export default CuidadosMascota;
