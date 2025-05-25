import nosotros from "../assets/nosotros.webp";
import sofia from "../assets/sofia.webp";
import nosotros2 from "../assets/nosotros2.webp";
import nosotrosp1 from "../assets/nosotrosp1.webp";
import nosotrosp2 from "../assets/nosotrosp2.webp";
import nosotrosp3 from "../assets/nosotrosp3.webp";
import nosotrosg4 from "../assets/nosotrosg4.webp";
import nosotrosp5 from "../assets/nosotrosp5.webp";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import starMedal from "../../src/assets/icons/starMedal.svg";
import asteriskIcon from "../../src/assets/icons/asteriskIcon.svg";
import subscriptions from "../../src/assets/icons/subscriptions.svg";
import subscriptionsHeart from "../../src/assets/icons/subscriptionsHeart.svg";
import handDonationsIcon from "../../src/assets/icons/handDonationsIcon.svg";

const Nosotros = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  }, [hash]);

  return (
    <main className=" mx-auto md:max-w-6xl bg-[#F9F9F9] flex flex-col justify-center items-center rounded-t-[50px] pb-20 -mt-8">
      <div className="w-full ">
        <img
          src={nosotros}
          alt="Gato acariciado"
          className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-t-[50px]"
        />
      </div>

      <div
        id="historia"
        className="w-full max-w-5xl px-8 py-8 md:py-12  border-1 border-primary rounded-[50px] mt-12 mx-auto"
      >
        <h2 className="md:text-3xl text-2xl pl-14 font-bold text-primary mb-4">
          Nuestra historia
        </h2>
        <p className="font-medium px-14  text-[#000000] md:text-lg text-base">
          Patas Pirque nació en la zona rural de Pirque, Chile, como una
          respuesta al abandono de perros callejeros y la falta de educación
          sobre tenencia responsable. <br /> <br />
          Con el tiempo, el proyecto ha crecido para convertirse en un refugio
          abierto donde los perros rescatados viven en libertad, rodeados de
          naturaleza, mientras se recuperan emocional y físicamente en espera de
          un nuevo hogar.
        </p>
      </div>

      <div className="bg-white rounded-lg border-[#DFDFDF] mt-35 border-1 p-5 text-center">
        <div className="relative -mt-25 px-10 mb-4">
          <img
            src={sofia}
            alt="Sofía Labbé"
            className="w-41 h-41 rounded-full shadow-lg mx-auto"
          />
        </div>

        <div>
          <p className="font-bold text-xl text-primary">Sofía Labbé</p>
          <p className="text-base text-[#606060]">Fundadora</p>
        </div>
      </div>

      <div className=" w-full max-w-5xl px-1 py-6">
        <p className="font-normal italic md:text-lg text-base text-[#000000] px-20 py-10 text-justify">
          “Siempre tuve una conexión especial con los animales. Desde niña
          rescataba animales, guiada solo por mi instinto y cariño. Al llegar a
          Pirque, me encontré con una realidad dura: cientos de animales
          abandonados y poca ayuda. Fue entonces cuando decidí formalizar lo que
          siempre había hecho por amor, y nació Patas Pirque.
          <br />
          <br />
          Primero como un proyecto personal, y con el tiempo, como una fundación
          legalmente constituida, Patas Pirque se convirtió en mi forma de
          transformar la pena en acción. Hoy lidero esta causa con fuerza y
          corazón, y necesito de todos para continuar con esta causa.
          <br />
          <br />
          Todo ayuda a seguir rescatando, sanando y encontrando hogares para
          quienes más lo necesitan. Todo suma.”
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 mb-10 sm:mb-14 lg:mb-16">
        <img src={starMedal} alt="" />

        <span className="text-primary text-2xl sm:text-3xl lg:text-4xl font-bold">
          + 230{" "}
        </span>
        <span className="md:text-lg text-base sm:text-xl lg:text-2xl font-bold text-tertiary">
          perros y gatos rescatados
        </span>
      </div>

      <div className="w-full">
        <img
          src={nosotros2}
          alt="Veterinaria y perro"
          className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover md:rounded-lg rounded-3xl"
        />
      </div>

      <div className="w-full max-w-5xl px-6 py-8">
        <div
          id="proposito"
          className="bg-[#F9F9F9] rounded-[30px] md:rounded-[50px] px-6 md:px-24 py-6 border border-primary"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mx-0 mx-8">
            Nuestro propósito
          </h3>
          <p className="text-[#000000] font-medium md:text-lg text-base mx-8 md:mx-0 mb-4">
            Patas Pirque ofrece un enfoque único de rescate: no solo rehabilita
            perros, sino que también educa a la comunidad sobre la importancia
            de la tenencia responsable. <br />
            <br /> Al combinar el rescate físico con el cambio cultural, Patas
            Pirque contribuye a construir un futuro con menos abandono y más
            respeto por los animales.
          </p>
        </div>
      </div>

      <div className=" w-full max-w-5xl px-4 py-8">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-[30px] md:rounded-[50px] px-6 md:px-24 py-6">
          {" "}
          <div className="p-4">
            {" "}
            <div className="flex items-center gap-2">
              <img src={asteriskIcon} alt="" />

              <h4 className="text-primary md:text-3xl text-2xl font-bold">
                Misión
              </h4>
            </div>
            <p className="md:text-lg text-base text-[#000000] font-medium mt-2 md:ml-11">
              {" "}
              Rescatar, rehabilitar y reubicar perros en situación de abandono,
              fomentando una cultura de respeto, responsabilidad y amor hacia
              los animales, a través de la educación comunitaria.
            </p>
          </div>
          <div className="p-3">
            {" "}
            <div className="flex items-center gap-2">
              <img src={asteriskIcon} alt="" />

              <h4 className="text-primary md:text-3xl text-2xl font-bold">
                Visión
              </h4>
            </div>
            <ul className="md:text-lg tetx-base font-medium text-[#000000] mt-2  md:ml-11 list-disc list-inside leading-normal">
              <li>Amor y respeto por los seres vivos </li>
              <li>Educación como motor de cambio </li>
              <li> Solidaridad y compromiso social </li>
              <li>Vida rural en armonía con la naturaleza</li>
              <li>Responsabilidad en la adopción y tenencia animal</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="colaborar" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="md:text-3xl text-2xl font-bold font-secundary text-primary mt-20 text-center mb-8">
          ¿Cómo colaborar?
          <hr className="border-primary mt-4" />
        </h2>

        <div className="mb-12">
          <h3 className="flex items-center justify-center md:text-2xl text-xl font-bold text-primary mb-4 gap-2">
            <img src={subscriptions} alt="" />
            Suscripciones
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-12 md:gap-10 gap-6">
            <div className="md:rounded-[50px] rounded-[30px] border-1 border-primary p-6 flex flex-row md:flex-col items-center md:items-center text-center md:text-center gap-4 md:gap-0">
              <div className="w-32 h-32 md:w-68 md:h-52 md:rounded-[50px] rounded-[30px] overflow-hidden bg-gray-100">
                <img
                  src={nosotrosp1}
                  alt="Patita Suave"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center md:items-center justify-center md:mt-4">
                <h4 className="font-bold text-primary text-xl mb-1">
                  Patita Suave
                </h4>
                <p className="md:text-base text-lg text-[#000000] md:font-normal font-medium mb-2">
                  5.000 CLP mensual
                </p>
                <a
                  href="https://esponsor.com/pataspirque/subscribe/m9nl9mj7lr/join?page=tiers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-primary text-white mt-2 cursor-pointer rounded-full px-8 py-1 md:text-xl text-base font-bold hover:scale-105 transition">
                    Unirme
                  </button>
                </a>
              </div>
            </div>

            <div className="md:rounded-[50px] rounded-[30px] border-1 border-primary p-6 flex flex-row md:flex-col items-center md:items-center text-center md:text-center gap-4 md:gap-0">
              <div className="w-32 h-32 md:w-68 md:h-52 md:rounded-[50px] rounded-[30px] overflow-hidden bg-gray-100">
                <img
                  src={nosotrosp2}
                  alt="Huella Fuerte"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center md:items-center justify-center md:mt-4">
                <h4 className="font-bold text-primary text-xl mb-1">
                  Huella Firme
                </h4>
                <p className="md:text-base text-lg text-[#000000] md:font-normal font-medium mb-2">
                  10.000 CLP mensual
                </p>
                <a
                  href="https://esponsor.com/pataspirque/subscribe/q6x215pj2y/join?page=tiers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-primary text-white mt-2 cursor-pointer rounded-full px-8 py-1 md:text-xl text-base font-bold hover:scale-105 transition">
                    Unirme
                  </button>
                </a>
              </div>
            </div>

            <div className="md:rounded-[50px] rounded-[30px] border-1 border-primary p-6 flex flex-row md:flex-col items-center md:items-center text-center md:text-center gap-4 md:gap-0">
              <div className="w-32 h-32 md:w-68 md:h-52 md:rounded-[50px] rounded-[30px] overflow-hidden bg-gray-100">
                <img
                  src={nosotrosp3}
                  alt="Huella Fuerte"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center md:items-center justify-center md:mt-4">
                <h4 className="font-bold text-primary text-xl mb-1">
                  Corazón Quiltro
                </h4>
                <p className="md:text-base text-lg text-[#000000] md:font-normal font-medium mb-2">
                  20.000 CLP mensual
                </p>
                <a
                  href="https://esponsor.com/pataspirque/subscribe/z0pl37zwl5/join?page=tiers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-primary text-white mt-2 cursor-pointer rounded-full px-8 py-1 md:text-xl text-base font-bold hover:scale-105 transition">
                    Unirme
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:mt-20 mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-14 gap-6">
              <div className=" rounded-[30px] md:rounded-[50px] border-1 border-primary p-4 md:p-6 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0">
                <div className="hidden md:flex items-center justify-center mb-2">
                  <img
                    src={subscriptionsHeart}
                    className="w-[25px] mr-1"
                    alt=""
                  />

                  <h3 className="text-3xl font-bold text-primary">Campañas</h3>
                </div>

                <div className="w-32 h-32 md:w-68 md:h-52 rounded-[30px] md:rounded-[50px] overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={nosotrosg4}
                    alt="Gatos Ferales en Rescate"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-center items-center md:items-center md:mt-4 w-full">
                  <div className="flex md:hidden items-center gap-2 justify-start mb-2">
                    <img
                      src={subscriptionsHeart}
                      className="w-[25px] mr-1"
                      alt=""
                    />

                    <h3 className="text-xl font-bold text-primary">Campañas</h3>
                  </div>

                  <h4 className="font-semibold text-primary mb-1 text-base md:text-xl leading-snug">
                    Gatos ferales en <br className="hidden md:block" /> rescate
                  </h4>

                  <a
                    href="https://esponsor.com/pataspirque/goals/1CMNAK7jaGRcjuoNfhXPq9/support"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex justify-center w-full">
                      <button className="bg-primary cursor-pointer text-white mt-2 md:mt-3 rounded-full px-6 py-1 font-bold text-base md:text-xl hover:scale-105 transition">
                        Apoyar
                      </button>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-[30px] md:rounded-[50px] border-1 border-primary bg-[#FFFFFF] p-4 md:p-6 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0">
                <div className="hidden md:flex items-center justify-center mb-2">
                  <img
                    src={handDonationsIcon}
                    className="w-[35px] mr-1"
                    alt=""
                  />

                  <h3 className="text-3xl font-bold text-primary">
                    Donaciones
                  </h3>
                </div>

                <div className="w-32 h-32 md:w-68 md:h-52 rounded-[30px] md:rounded-[50px] overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={nosotrosp5}
                    alt="Para comida, medicamentos, etc."
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-center items-center md:items-center md:mt-4 w-full">
                  <div className="flex md:hidden items-center gap-2 justify-start mb-2">
                    <img
                      src={handDonationsIcon}
                      className="w-[35px] mr-1"
                      alt=""
                    />

                    <h3 className="text-xl font-bold text-primary">
                      Donaciones
                    </h3>
                  </div>

                  <h4 className="font-semibold text-tertiary mb-1 text-base md:text-xl text-center leading-snug">
                    Para comida, <br className="hidden md:block" />{" "}
                    medicamentos, etc.
                  </h4>

                  <a
                    href="https://esponsor.com/pataspirque"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex justify-center w-full">
                      <button className="bg-primary cursor-pointer text-white mt-2 md:mt-3 rounded-full px-6 py-1 font-bold text-base md:text-xl hover:scale-105 transition">
                        Apoyar
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
