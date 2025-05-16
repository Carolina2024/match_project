import nosotros from "../assets/nosotros.png";
import sofia from "../assets/sofia.png";
import nosotros2 from "../assets/nosotros2.png";
import nosotrosp1 from "../assets/nosotrosp1.png";
import nosotrosp2 from "../assets/nosotrosp2.png";
import nosotrosp3 from "../assets/nosotrosp3.png";
import nosotrosg4 from "../assets/nosotrosg4.png";
import nosotrosp5 from "../assets/nosotrosp5.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

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
        <svg
          width="61"
          height="61"
          viewBox="0 0 61 61"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="uniqueMask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="61"
            height="61"
          >
            <rect width="61" height="61" fill="#D9D9D9" />
          </mask>
          <g mask="url(#uniqueMask)">
            <path
              d="M24.591 35.6904L26.8149 28.4417L20.9691 23.7364H28.2128L30.5003 16.6149L32.7878 23.7364H40.0316L34.1222 28.4417L36.3462 35.6904L30.5003 31.1759L24.591 35.6904ZM15.2503 59.344V39.6962C13.6406 37.9159 12.391 35.8811 11.5014 33.5921C10.6118 31.303 10.167 28.8656 10.167 26.2798C10.167 20.5996 12.1368 15.7883 16.0764 11.846C20.016 7.90375 24.8239 5.93262 30.5003 5.93262C36.1767 5.93262 40.9847 7.90375 44.9243 11.846C48.8639 15.7883 50.8337 20.5996 50.8337 26.2798C50.8337 28.8656 50.3889 31.303 49.4993 33.5921C48.6097 35.8811 47.3601 37.9159 45.7503 39.6962V59.344L30.5003 54.2572L15.2503 59.344ZM30.5003 41.5402C34.7364 41.5402 38.3371 40.0566 41.3024 37.0893C44.2677 34.122 45.7503 30.5188 45.7503 26.2798C45.7503 22.0408 44.2677 18.4377 41.3024 15.4704C38.3371 12.5031 34.7364 11.0194 30.5003 11.0194C26.2642 11.0194 22.6635 12.5031 19.6982 15.4704C16.733 18.4377 15.2503 22.0408 15.2503 26.2798C15.2503 30.5188 16.733 34.122 19.6982 37.0893C22.6635 40.0566 26.2642 41.5402 30.5003 41.5402ZM20.3337 51.7774L30.5003 49.1704L40.667 51.7774V43.8929C39.1844 44.7407 37.5852 45.4083 35.8696 45.8958C34.154 46.3833 32.3642 46.627 30.5003 46.627C28.6364 46.627 26.8467 46.3833 25.1311 45.8958C23.4154 45.4083 21.8163 44.7407 20.3337 43.8929V51.7774Z"
              fill="#F4A470"
            />
          </g>
        </svg>

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
              <svg
                width="34"
                height="34"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.3454 41.1274V28.912L11.7449 37.5646L9.10925 34.9272L17.756 26.3208H5.54883V22.6191H17.756L9.10925 14.0128L11.7449 11.3753L20.3454 20.028V7.8125H24.0445V20.028L32.645 11.3753L35.2806 14.0128L26.6339 22.6191H38.8411V26.3208H26.6339L35.2806 34.9272L32.645 37.5646L24.0445 28.912V41.1274H20.3454Z"
                  fill="#F4A470"
                />
              </svg>
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
              <svg
                width="34"
                height="34"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.3454 41.1274V28.912L11.7449 37.5646L9.10925 34.9272L17.756 26.3208H5.54883V22.6191H17.756L9.10925 14.0128L11.7449 11.3753L20.3454 20.028V7.8125H24.0445V20.028L32.645 11.3753L35.2806 14.0128L26.6339 22.6191H38.8411V26.3208H26.6339L35.2806 34.9272L32.645 37.5646L24.0445 28.912V41.1274H20.3454Z"
                  fill="#F4A470"
                />
              </svg>
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
            <svg
              width="37"
              height="24"
              viewBox="0 0 37 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.9167 7.87533V4.79199H30.8333V7.87533H27.75V10.9587H30.8333V14.042H33.9167V10.9587H37V7.87533H33.9167Z"
                fill="#F4A470"
              />
              <path
                d="M12.3333 12.5003C15.7404 12.5003 18.5 9.74074 18.5 6.33366C18.5 2.92658 15.7404 0.166992 12.3333 0.166992C8.92625 0.166992 6.16667 2.92658 6.16667 6.33366C6.16667 9.74074 8.92625 12.5003 12.3333 12.5003ZM12.3333 3.25033C14.0292 3.25033 15.4167 4.63783 15.4167 6.33366C15.4167 8.02949 14.0292 9.41699 12.3333 9.41699C10.6375 9.41699 9.25 8.02949 9.25 6.33366C9.25 4.63783 10.6375 3.25033 12.3333 3.25033Z"
                fill="#F4A470"
              />
              <path
                d="M12.3333 14.042C8.21708 14.042 0 16.1078 0 20.2087V24.8337H24.6667V20.2087C24.6667 16.1078 16.4496 14.042 12.3333 14.042ZM21.5833 21.7503H3.08333V20.2241C3.39167 19.1141 8.17083 17.1253 12.3333 17.1253C16.4958 17.1253 21.275 19.1141 21.5833 20.2087V21.7503Z"
                fill="#F4A470"
              />
              <path
                d="M19.2862 0.244076C20.7046 1.87824 21.5833 4.00574 21.5833 6.33366C21.5833 8.66158 20.7046 10.7891 19.2862 12.4232C22.3079 12.0378 24.6667 9.47866 24.6667 6.33366C24.6667 3.18866 22.3079 0.629492 19.2862 0.244076Z"
                fill="#F4A470"
              />
              <path
                d="M25.4838 15.3216C26.8558 16.6012 27.75 18.2045 27.75 20.2087V24.8337H30.8333V20.2087C30.8333 17.9732 28.3821 16.3391 25.4838 15.3216Z"
                fill="#F4A470"
              />
            </svg>
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
                    Únete
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
                    Únete
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
                    Únete
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:mt-20 mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-14 gap-6">
              {/* Card Campañas*/}
              <div className=" rounded-[30px] md:rounded-[50px] border-1 border-primary p-4 md:p-6 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0">
                <div className="hidden md:flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 mr-2"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 28.7549L13.1875 27.1288C11.0833 25.2317 9.34375 23.5951 7.96875 22.2192C6.59375 20.8433 5 19.608 4.1875 18.5135C3.375 17.419 2.80729 16.4132 2.48438 15.4959C2.16146 14.5786 2 13.6404 2 12.6814C2 10.7218 2.65625 9.08524 3.96875 7.77185C5.28125 6.45846 6.91667 5.80176 8.875 5.80176C9.95833 5.80176 10.9896 6.03108 11.9688 6.48973C12.9479 6.94837 13.7917 7.59465 14.5 8.42855C15.2083 7.59465 16.0521 6.94837 17.0312 6.48973C18.0104 6.03108 19.0417 5.80176 20.125 5.80176C22.0833 5.80176 23.7188 6.45846 25.0312 7.77185C26.3438 9.08524 27 10.7218 27 12.6814C27 13.6404 26.8385 14.5786 26.5156 15.4959C26.1927 16.4132 25.625 17.419 24.8125 18.5135C24 19.608 22.9062 20.8433 21.5312 22.2192C20.1562 23.5951 18.4167 25.2317 16.3125 27.1288L14.5 28.7549Z"
                      fill="#F4A470"
                    />
                  </svg>
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
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 28.7549L13.1875 27.1288C11.0833 25.2317 9.34375 23.5951 7.96875 22.2192C6.59375 20.8433 5 19.608 4.1875 18.5135C3.375 17.419 2.80729 16.4132 2.48438 15.4959C2.16146 14.5786 2 13.6404 2 12.6814C2 10.7218 2.65625 9.08524 3.96875 7.77185C5.28125 6.45846 6.91667 5.80176 8.875 5.80176C9.95833 5.80176 10.9896 6.03108 11.9688 6.48973C12.9479 6.94837 13.7917 7.59465 14.5 8.42855C15.2083 7.59465 16.0521 6.94837 17.0312 6.48973C18.0104 6.03108 19.0417 5.80176 20.125 5.80176C22.0833 5.80176 23.7188 6.45846 25.0312 7.77185C26.3438 9.08524 27 10.7218 27 12.6814C27 13.6404 26.8385 14.5786 26.5156 15.4959C26.1927 16.4132 25.625 17.419 24.8125 18.5135C24 19.608 22.9062 20.8433 21.5312 22.2192C20.1562 23.5951 18.4167 25.2317 16.3125 27.1288L14.5 28.7549Z"
                        fill="#F4A470"
                      />
                    </svg>
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

              {/* Card Donaciones */}
              <div className="rounded-[30px] md:rounded-[50px] border-1 border-primary bg-[#FFFFFF] p-4 md:p-6 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0">
                <div className="hidden md:flex items-center justify-center mb-2">
                  <svg
                    className="md:mr-2 inline-block align-middle"
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.75 13.75L13.5625 8.6875C12.9167 8.0625 12.3698 7.36979 11.9219 6.60938C11.474 5.84896 11.25 5.02083 11.25 4.125C11.25 2.97917 11.651 2.00521 12.4531 1.20312C13.2552 0.401042 14.2292 0 15.375 0C16.0417 0 16.6667 0.140625 17.25 0.421875C17.8333 0.703125 18.3333 1.08333 18.75 1.5625C19.1667 1.08333 19.6667 0.703125 20.25 0.421875C20.8333 0.140625 21.4583 0 22.125 0C23.2708 0 24.2448 0.401042 25.0469 1.20312C25.849 2.00521 26.25 2.97917 26.25 4.125C26.25 5.02083 26.0312 5.84896 25.5938 6.60938C25.1562 7.36979 24.6146 8.0625 23.9688 8.6875L18.75 13.75ZM18.75 10.25L22.1562 6.90625C22.5521 6.51042 22.9167 6.08854 23.25 5.64063C23.5833 5.19271 23.75 4.6875 23.75 4.125C23.75 3.66667 23.5938 3.28125 23.2812 2.96875C22.9688 2.65625 22.5833 2.5 22.125 2.5C21.8333 2.5 21.5573 2.55729 21.2969 2.67188C21.0365 2.78646 20.8125 2.95833 20.625 3.1875L18.75 5.4375L16.875 3.1875C16.6875 2.95833 16.4635 2.78646 16.2031 2.67188C15.9427 2.55729 15.6667 2.5 15.375 2.5C14.9167 2.5 14.5312 2.65625 14.2188 2.96875C13.9062 3.28125 13.75 3.66667 13.75 4.125C13.75 4.6875 13.9167 5.19271 14.25 5.64063C14.5833 6.08854 14.9479 6.51042 15.3438 6.90625L18.75 10.25ZM7.5 20.625L16.1875 23L23.625 20.6875C23.5208 20.5 23.3698 20.3385 23.1719 20.2031C22.974 20.0677 22.75 20 22.5 20H16.1875C15.625 20 15.1771 19.9792 14.8438 19.9375C14.5104 19.8958 14.1667 19.8125 13.8125 19.6875L10.9062 18.7188L11.5938 16.2812L14.125 17.125C14.4792 17.2292 14.8958 17.3125 15.375 17.375C15.8542 17.4375 16.5625 17.4792 17.5 17.5C17.5 17.2708 17.4323 17.0521 17.2969 16.8438C17.1615 16.6354 17 16.5 16.8125 16.4375L9.5 13.75H7.5V20.625ZM0 25V11.25H9.5C9.64583 11.25 9.79167 11.2656 9.9375 11.2969C10.0833 11.3281 10.2188 11.3646 10.3438 11.4062L17.6875 14.125C18.375 14.375 18.9323 14.8125 19.3594 15.4375C19.7865 16.0625 20 16.75 20 17.5H22.5C23.5417 17.5 24.4271 17.8438 25.1562 18.5312C25.8854 19.2188 26.25 20.125 26.25 21.25V22.5L16.25 25.625L7.5 23.1875V25H0ZM2.5 22.5H5V13.75H2.5V22.5Z"
                      fill="#F4A470"
                    />
                  </svg>

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
                    <svg
                      className="mr-2 inline-block align-middle text-primary"
                      width="31"
                      height="31"
                      viewBox="0 5 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_1624_3026"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                      >
                        <rect width="30" height="30" fill="#f4a470" />
                      </mask>
                      <g mask="url(#mask0_1624_3026)">
                        <path
                          d="M20 18.2652L14.8125 13.1993C14.1667 12.5739 13.6198 11.8807 13.1719 11.1197C12.724 10.3588 12.5 9.53012 12.5 8.63367C12.5 7.48706 12.901 6.51243 13.7031 5.7098C14.5052 4.90717 15.4792 4.50586 16.625 4.50586C17.2917 4.50586 17.9167 4.64658 18.5 4.92802C19.0833 5.20946 19.5833 5.58993 20 6.06942C20.4167 5.58993 20.9167 5.20946 21.5 4.92802C22.0833 4.64658 22.7083 4.50586 23.375 4.50586C24.5208 4.50586 25.4948 4.90717 26.2969 5.7098C27.099 6.51243 27.5 7.48706 27.5 8.63367C27.5 9.53012 27.2812 10.3588 26.8438 11.1197C26.4062 11.8807 25.8646 12.5739 25.2188 13.1993L20 18.2652ZM20 14.7628L23.4062 11.4168C23.8021 11.0207 24.1667 10.5986 24.5 10.1503C24.8333 9.70211 25 9.19656 25 8.63367C25 8.17503 24.8438 7.78935 24.5312 7.47663C24.2188 7.16392 23.8333 7.00756 23.375 7.00756C23.0833 7.00756 22.8073 7.06489 22.5469 7.17956C22.2865 7.29422 22.0625 7.46621 21.875 7.69553L20 9.94707L18.125 7.69553C17.9375 7.46621 17.7135 7.29422 17.4531 7.17956C17.1927 7.06489 16.9167 7.00756 16.625 7.00756C16.1667 7.00756 15.7812 7.16392 15.4688 7.47663C15.1562 7.78935 15 8.17503 15 8.63367C15 9.19656 15.1667 9.70211 15.5 10.1503C15.8333 10.5986 16.1979 11.0207 16.5938 11.4168L20 14.7628ZM8.75 25.1449L17.4375 27.5215L24.875 25.2075C24.7708 25.0198 24.6198 24.8583 24.4219 24.7228C24.224 24.5872 24 24.5195 23.75 24.5195H17.4375C16.875 24.5195 16.4271 24.4986 16.0938 24.457C15.7604 24.4153 15.4167 24.3319 15.0625 24.2068L12.1562 23.2374L12.8438 20.7982L15.375 21.6425C15.7292 21.7468 16.1458 21.8302 16.625 21.8927C17.1042 21.9552 17.8125 21.9969 18.75 22.0178C18.75 21.7885 18.6823 21.5696 18.5469 21.3611C18.4115 21.1526 18.25 21.0171 18.0625 20.9546L10.75 18.2652H8.75V25.1449ZM1.25 29.5229V15.7635H10.75C10.8958 15.7635 11.0417 15.7792 11.1875 15.8104C11.3333 15.8417 11.4688 15.8782 11.5938 15.9199L18.9375 18.6405C19.625 18.8907 20.1823 19.3285 20.6094 19.9539C21.0365 20.5793 21.25 21.2673 21.25 22.0178H23.75C24.7917 22.0178 25.6771 22.3618 26.4062 23.0497C27.1354 23.7377 27.5 24.6446 27.5 25.7703V27.0212L17.5 30.1483L8.75 27.7092V29.5229H1.25ZM3.75 27.0212H6.25V18.2652H3.75V27.0212Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
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
