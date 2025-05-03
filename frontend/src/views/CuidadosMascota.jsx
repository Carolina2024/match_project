import paso1 from "../assets/cuidados1.jpg";
import paso2 from "../assets/cuidados2.jpg";
import paso3 from "../assets/cuidados3.jpg";
import paso4 from "../assets/cuidados4.jpg";
import paso5 from "../assets/cuidados5.jpg";

const CuidadosMascota = () => {
  return (
    <section className="py-12 px-4 max-w-6xl mx-auto space-y-24 mt-14 bg-[#F9F9F9] rounded-4xl shadow-md">
      <div className="absolute top-40 left-0 right-0 flex justify-center mt-10">
        <svg
          width="644"
          height="1622"
          viewBox="0 0 644 1622"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.18116 0C2.18116 354.637 616.542 238.098 642.626 355.714C664.626 454.917 41.1793 523.694 2.18037 688.073C-29.8193 889.354 599.064 858.672 642.626 962.943C672.366 1034.13 50.172 1285.51 12.9602 1334.83C-37.6376 1480.73 445.5 1566.5 534.5 1621.5"
            stroke="#F4A470"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>
      </div>
      {/* SECCIÓN 1 */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Imagen izquierda */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={paso1}
            alt="Familia pensando en adopción"
            className="max-w-xs w-full h-auto"
          />
        </div>

        {/* Texto derecha */}
        <div className="md:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
              1
            </div>
            <h2 className="text-xl font-bold text-primary">Antes de adoptar</h2>
          </div>

          <ul className="list-disc list-inside text-sm text-black space-y-2">
            <li>
              Compromiso a largo plazo: perros y gatos viven entre 10 y 20 años.{" "}
              <strong>Adoptar es una decisión de vida.</strong>
            </li>
            <li>
              Espacio y tiempo: asegurate de contar con un lugar seguro y el
              tiempo necesario para cuidarlo.
            </li>
            <li>
              Presupuesto mensual: contemplá los gastos en comida, salud,
              higiene y posibles imprevistos.
            </li>
            <li>
              Consentimiento familiar: es importante que todos los miembros del
              hogar estén de acuerdo.
            </li>
          </ul>
        </div>
      </div>

      {/* SECCIÓN 2 */}
      <div className="flex flex-col md:flex-row-reverse items-start gap-6">
        {/* Imagen derecha */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={paso2}
            alt="Niña acomodando mascota en nuevo hogar"
            className="max-w-xs w-full h-auto"
          />
        </div>

        {/* Texto izquierda */}
        <div className="md:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
              2
            </div>
            <h2 className="text-xl font-bold text-primary">
              Primeros días en casa
            </h2>
          </div>

          <ul className="list-disc list-inside text-sm text-black space-y-2">
            <li>
              Ambiente tranquilo: evitá ruidos fuertes y movimientos bruscos.
              Necesita adaptarse.
            </li>
            <li>
              Mostrale su espacio: preparale un rincón con cama, comida, agua y,
              en el caso de los gatos, su caja de arena.
            </li>
            <li>
              Paciencia: puede mostrarse asustado o tímido. Dale tiempo, amor y
              rutinas.
            </li>
          </ul>
        </div>
      </div>
      {/* SECCIÓN 3 */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Imagen izquierda */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={paso3}
            alt="Persona paseando con mascota"
            className="max-w-xs w-full h-auto"
          />
        </div>

        {/* Texto derecha */}
        <div className="md:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
              3
            </div>
            <h2 className="text-xl font-bold text-primary">
              Cuidados básicos diarios
            </h2>
          </div>

          <ul className="list-disc list-inside text-sm text-black space-y-2">
            <li>
              Alimentación adecuada: consultá con un veterinario el mejor
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

      {/* SECCIÓN 4 */}
      <div className="flex flex-col md:flex-row-reverse items-start gap-6">
        {/* Imagen derecha */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={paso4}
            alt="Veterinario cuidando a mascota"
            className="max-w-xs w-full h-auto"
          />
        </div>

        {/* Texto izquierda */}
        <div className="md:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
              4
            </div>
            <h2 className="text-xl font-bold text-primary">Salud</h2>
          </div>

          <ul className="list-disc list-inside text-sm text-gray-800 space-y-2">
            <li>
              Visitas al veterinario: llevalo apenas llegue a casa para un
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

      {/* SECCIÓN 5 */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Imagen izquierda */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={paso5}
            alt="Niña demostrando amor a su mascota"
            className="max-w-xs w-full h-auto"
          />
        </div>

        {/* Texto derecha */}
        <div className="md:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center">
              5
            </div>
            <h2 className="text-xl font-bold text-primary">Amor y respeto</h2>
          </div>

          <ul className="list-disc list-inside text-sm text-black space-y-2">
            <li>
              No humanices, pero sí empatizá: respetá su lenguaje, su espacio y
              sus tiempos.
            </li>
            <li>
              Educá con cariño y coherencia: el refuerzo positivo es la mejor
              herramienta.
            </li>
            <li>
              Nunca lo abandones: si cambia tu situación, buscá redes de ayuda,
              pero no lo dejes solo.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CuidadosMascota;
