import paso1 from "../assets/cuidados1.jpg";
import paso2 from "../assets/cuidados2.jpg";
import paso3 from "../assets/cuidados3.jpg";
import paso4 from "../assets/cuidados4.jpg";
import paso5 from "../assets/cuidados5.jpg";

const CuidadosMascota = () => {
  return (
    <section className=" px-4 max-w-6xl mx-auto space-y-24 -mt-8 bg-[#F9F9F9] pt-10 pb-4 rounded-4xl rounded-b-none shadow-md">
      <div className="absolute top-1/2 left-0 right-0 flex justify-center mt-2">
        <svg
          width="633"
          height="1693"
          viewBox="0 0 733 1693"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M70.2872 35.425C70.2872 54.9897 54.5528 70.85 35.1436 70.85C15.7343 70.85 0 54.9897 0 35.425C0 15.8603 15.7343 0 35.1436 0C54.5528 0 70.2872 15.8603 70.2872 35.425Z"
            fill="#F4A470"
          />
          <path
            d="M36.9375 18.9091V48H32.5341V23.3125H32.3636L25.4034 27.858V23.6534L32.6619 18.9091H36.9375Z"
            fill="black"
          />
          <path
            d="M36.1812 71C36.1812 425.637 650.542 309.098 676.626 426.714C698.626 525.917 75.1793 594.694 36.1804 759.073C4.18075 960.354 633.064 929.672 676.626 1033.94C706.366 1105.13 84.172 1356.51 46.9602 1405.83C-3.63759 1551.73 479.5 1637.5 568.5 1692.5"
            stroke="#F4A470"
            strokeDasharray="6 6"
          />
          <path
            d="M732 426.425C732 445.99 716.33 461.85 697 461.85C677.67 461.85 662 445.99 662 426.425C662 406.86 677.67 391 697 391C716.33 391 732 406.86 732 426.425Z"
            fill="#F4A470"
          />
          <path
            d="M687.532 438.425V435.243L697.375 425.044C698.427 423.936 699.293 422.966 699.975 422.132C700.666 421.289 701.182 420.489 701.523 419.732C701.864 418.974 702.035 418.169 702.035 417.317C702.035 416.351 701.807 415.518 701.353 414.817C700.898 414.107 700.278 413.562 699.492 413.183C698.706 412.795 697.821 412.601 696.836 412.601C695.794 412.601 694.885 412.814 694.108 413.24C693.332 413.666 692.735 414.268 692.319 415.044C691.902 415.821 691.694 416.73 691.694 417.771H687.503C687.503 416.001 687.91 414.452 688.725 413.127C689.539 411.801 690.657 410.773 692.077 410.044C693.498 409.305 695.112 408.936 696.921 408.936C698.749 408.936 700.358 409.301 701.75 410.03C703.152 410.75 704.246 411.734 705.032 412.984C705.818 414.225 706.211 415.627 706.211 417.189C706.211 418.269 706.007 419.324 705.6 420.357C705.202 421.389 704.506 422.539 703.512 423.808C702.517 425.068 701.135 426.597 699.364 428.396L693.583 434.448V434.661H706.679V438.425H687.532Z"
            fill="black"
          />
          <path
            d="M94.2691 777.425C94.2691 796.99 78.5389 812.85 59.1346 812.85C39.7303 812.85 24 796.99 24 777.425C24 757.86 39.7303 742 59.1346 742C78.5389 742 94.2691 757.86 94.2691 777.425Z"
            fill="#F4A470"
          />
          <path
            d="M59.1694 790.898C57.2187 790.898 55.4763 790.562 53.9422 789.89C52.4176 789.217 51.2102 788.285 50.32 787.091C49.4393 785.889 48.9658 784.497 48.8996 782.915H53.3598C53.4166 783.777 53.7054 784.525 54.2263 785.16C54.7566 785.785 55.4479 786.268 56.3001 786.608C57.1524 786.949 58.0994 787.12 59.141 787.12C60.2869 787.12 61.3001 786.921 62.1808 786.523C63.071 786.125 63.767 785.572 64.2689 784.861C64.7708 784.142 65.0217 783.313 65.0217 782.375C65.0217 781.4 64.7708 780.543 64.2689 779.804C63.7765 779.056 63.052 778.469 62.0956 778.043C61.1486 777.617 60.0028 777.404 58.6581 777.404H56.2007V773.824H58.6581C59.7376 773.824 60.6846 773.63 61.499 773.242C62.3229 772.854 62.9668 772.314 63.4308 771.623C63.8948 770.922 64.1268 770.103 64.1268 769.165C64.1268 768.266 63.9232 767.484 63.516 766.822C63.1183 766.149 62.5501 765.624 61.8115 765.245C61.0823 764.866 60.2206 764.677 59.2263 764.677C58.2793 764.677 57.3939 764.852 56.57 765.202C55.7556 765.543 55.0927 766.036 54.5814 766.679C54.07 767.314 53.7954 768.076 53.7575 768.966H49.5104C49.5577 767.394 50.0217 766.012 50.9024 764.819C51.7926 763.625 52.9668 762.693 54.4251 762.02C55.8835 761.348 57.5028 761.012 59.2831 761.012C61.1486 761.012 62.7585 761.376 64.1126 762.106C65.4763 762.825 66.5274 763.786 67.266 764.989C68.0141 766.192 68.3835 767.508 68.374 768.938C68.3835 770.567 67.9289 771.949 67.0104 773.086C66.1013 774.222 64.8891 774.984 63.374 775.373V775.6C65.3058 775.893 66.802 776.661 67.8626 777.901C68.9327 779.142 69.463 780.68 69.4535 782.518C69.463 784.118 69.0179 785.553 68.1183 786.822C67.2282 788.09 66.0113 789.09 64.4677 789.819C62.9242 790.538 61.1581 790.898 59.1694 790.898Z"
            fill="black"
          />
          <path
            d="M732.287 1034.95C732.287 1053.71 716.553 1068.91 697.144 1068.91C677.734 1068.91 662 1053.71 662 1034.95C662 1016.2 677.734 1001 697.144 1001C716.553 1001 732.287 1016.2 732.287 1034.95Z"
            fill="#F4A470"
          />
          <path
            d="M684.245 1043.76V1040.21L696.816 1020.36H699.614V1025.58H697.839L688.847 1039.82V1040.04H706.077V1043.76H684.245ZM698.037 1049.45V1042.69L698.066 1041.07V1020.36H702.228V1049.45H698.037Z"
            fill="black"
          />
          <path
            d="M98.2872 1433.43C98.2872 1452.99 82.5528 1468.85 63.1436 1468.85C43.7343 1468.85 28 1452.99 28 1433.43C28 1413.86 43.7343 1398 63.1436 1398C82.5528 1398 98.2872 1413.86 98.2872 1433.43Z"
            fill="#F4A470"
          />
          <path
            d="M64.4982 1447.4C62.7179 1447.4 61.1175 1447.06 59.6971 1446.38C58.2861 1445.68 57.1592 1444.74 56.3164 1443.53C55.4736 1442.33 55.0238 1440.96 54.967 1439.41H59.2283C59.3325 1440.66 59.8865 1441.69 60.8903 1442.5C61.8941 1443.3 63.0967 1443.7 64.4982 1443.7C65.6156 1443.7 66.6052 1443.45 67.467 1442.94C68.3382 1442.42 69.02 1441.7 69.5124 1440.79C70.0143 1439.88 70.2653 1438.85 70.2653 1437.68C70.2653 1436.5 70.0096 1435.44 69.4982 1434.51C68.9869 1433.59 68.2814 1432.86 67.3817 1432.33C66.4916 1431.8 65.4689 1431.53 64.3136 1431.52C63.4329 1431.52 62.5475 1431.67 61.6573 1431.97C60.7672 1432.27 60.0475 1432.67 59.4982 1433.16L55.4783 1432.57L57.1119 1417.91H73.1062V1421.67H60.7624L59.8391 1429.81H60.0096C60.5778 1429.26 61.3306 1428.8 62.2681 1428.43C63.2151 1428.07 64.2283 1427.88 65.3079 1427.88C67.0787 1427.88 68.6554 1428.3 70.038 1429.14C71.43 1429.99 72.5238 1431.14 73.3192 1432.6C74.1242 1434.05 74.5219 1435.71 74.5124 1437.6C74.5219 1439.48 74.0958 1441.16 73.234 1442.64C72.3817 1444.12 71.198 1445.28 69.6829 1446.13C68.1772 1446.98 66.449 1447.4 64.4982 1447.4Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-46">
        <div className="w-full md:w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl mt-32">
          <img
            src={paso1}
            alt="Familia pensando en adopción"
            className="w-auto h-full object-cover transform -translate-y-12"
          />
        </div>

        <div className="md:w-3/4 md:-translate-y-10">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-bold text-primary">
              Antes de adoptar
            </h2>
          </div>

          <ul className="list-disc list-inside text-base text-black space-y-1">
            <li>
              Compromiso a largo plazo: perros y gatos viven entre 10 y 20 años.
              <br></br>
              <strong className="ml-6">Adoptar es una decisión de vida.</strong>
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

      <div className="flex flex-col md:flex-row-reverse items-center gap-60 -mt-24">
        <div className="w-full md:w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl mt-2">
          <img
            src={paso2}
            alt="Niña acomodando mascota en nuevo hogar"
            className="w-auto h-full object-cover transform -translate-y-12"
          />
        </div>

        <div className="md:w-2/4 md:-translate-y-10">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-bold text-primary">
              Primeros días en casa
            </h2>
          </div>

          <ul className="list-disc list-inside text-base text-black space-y-1">
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

      <div className="flex flex-col md:flex-row items-center gap-46 -mt-10">
        <div className="w-full md:w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl">
          <img
            src={paso3}
            alt="Persona paseando con mascota"
            className="w-auto h-full object-cover transform -translate-y-16"
          />
        </div>

        <div className="md:w-3/4 md:-translate-y-10">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-bold text-primary">
              Cuidados básicos diarios
            </h2>
          </div>

          <ul className="list-disc list-inside text-base text-black space-y-1">
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

      <div className="flex flex-col md:flex-row-reverse items-center gap-60 -mt-24">
        <div className="w-full md:w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl mt-2">
          <img
            src={paso4}
            alt="Veterinario cuidando a mascota"
            className="w-auto h-full object-cover transform -translate-y-12"
          />
        </div>

        <div className="md:w-2/4 md:-translate-y-10">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-bold text-primary">Salud</h2>
          </div>

          <ul className="list-disc list-inside text-base text-black space-y-1">
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

      <div className="flex flex-col md:flex-row items-center gap-46 -mt-22">
        <div className="w-full md:w-1/4 flex justify-center overflow-hidden h-64 md:h-72 rounded-xl">
          <img
            src={paso5}
            alt="Niña demostrando amor a su mascota"
            className="w-auto h-full object-cover transform -translate-y-14 "
          />
        </div>

        <div className="md:w-3/4 md:-translate-y-10">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-bold text-primary">Amor y respeto</h2>
          </div>

          <ul className="list-disc list-inside text-base text-black space-y-1">
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
      <div>
      <h2 className="text-primary text-center font-bold md:text-3xl text-xl italic mb-0 -mt-8">Para más información te invitamos a</h2>
      <h2 className="text-primary text-center font-bold md:text-3xl text-xl italic mb-6">seguirnos en nuestras redes</h2>
      </div>
    </section>
  );
};

export default CuidadosMascota;
