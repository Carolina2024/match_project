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
    // Espera un tick para que el DOM renderice
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  }, [hash]);

  return (
    <main className=" mx-auto max-w-6xl bg-[#F9F9F9] flex flex-col justify-center items-center rounded-t-[50px] pb-20 -mt-8">
      {/* Imagen encabezado */}
      <div className="w-full ">
        <img
          src={nosotros}
          alt="Gato acariciado"
          className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-t-[50px]"
        />
      </div>

      {/* Nuestra historia */}
      <div
        id="historia"
        className="w-full max-w-5xl px-8 py-8 md:py-12  border-1 border-primary rounded-[50px] mt-12 mx-auto"
      >
        <h2 className="text-3xl pl-14 font-bold text-primary mb-4">
          Nuestra historia
        </h2>
        <p className="font-medium px-14  text-[#000000] md:text-lg">
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
        {/* Contenedor para la imagen */}
        <div className="relative -mt-25 px-10 mb-4">
          <img
            src={sofia}
            alt="Sofía Labbé"
            className="w-41 h-41 rounded-full shadow-lg mx-auto"
          />
        </div>

        {/* Fundadora info */}
        <div>
          <p className="font-bold text-xl text-primary">Sofía Labbé</p>
          <p className="text-base text-[#606060]">Fundadora</p>
        </div>
      </div>

      {/* Contenedor para el texto principal */}
      <div className=" w-full max-w-5xl px-1 py-6">
        <p className="font-medium md:text-lg text-[#000000] px-20 py-10 text-justify">
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

      {/* Estadísticas y fundadoras */}
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
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#595146]">
          perros y gatos rescatados
        </span>
      </div>

      {/* Imagen grande */}
      <div className="w-full">
        <img
          src={nosotros2}
          alt="Veterinaria y perro"
          className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
        />
      </div>
      {/* Propósito */}
      <div className="w-full max-w-5xl px-6 py-8">
        <div
          id="proposito"
          className="bg-[#F9F9F9] rounded-[30px] md:rounded-[50px] px-6 md:px-24 py-6 border border-primary"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Nuestro propósito
          </h3>
          <p className="text-[#000000] font-medium md:text-lg mb-4">
            Patas Pirque ofrece un enfoque único de rescate: no solo rehabilita
            perros, sino que también educa a la comunidad sobre la importancia
            de la tenencia responsable. <br />
            <br /> Al combinar el rescate físico con el cambio cultural, Patas
            Pirque contribuye a construir un futuro con menos abandono y más
            respeto por los animales.
          </p>
        </div>
      </div>

      {/* Misión y Visión */}
      <div className=" w-full max-w-5xl px-4 py-8">
        {" "}
        {/* Contenedor padre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-[30px] md:rounded-[50px] px-6 md:px-24 py-6">
          {" "}
          {/* Caja de Misión */}
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
              <h4 className="text-primary text-3xl font-bold ">Misión</h4>
            </div>
            <p className="md:text-lg text-[#000000] font-medium mt-2">
              {" "}
              Rescatar, rehabilitar y <br /> reubicar perros en <br /> situación
              de abandono,
              <br />
              fomentando una cultura de
              <br /> respeto, responsabilidad y <br /> amor hacia los animales,
              a <br /> través de la educación <br /> comunitaria.
            </p>
          </div>
          {/* Caja de Visión */}
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
              <h4 className="text-primary text-3xl font-bold">Visión</h4>
            </div>
            <ul className="md:text-lg font-medium text-[#000000] mt-2 list-disc list-inside leading-normal">
              <li>Amor y respeto por los seres vivos </li>
              <li>Educación como motor de cambio </li>
              <li> Solidaridad y compromiso social </li>
              <li>Vida rural en armonía con la naturaleza</li>
              <li>Responsabilidad en la adopción y tenencia animal</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ¿Cómo ayudarnos? */}
      <div id="colaborar" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-secundary text-primary mt-20 text-center mb-8">
          ¿Cómo colaborar?
          <hr className="border-primary mt-4" />
        </h2>

        {/* Suscripciones */}
        <div className="mb-12">
          <h3 className="flex items-center justify-center text-2xl font-bold text-primary mb-4 gap-2">
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

          <div className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-6">
            {/* Patita Suave */}
            <div className="rounded-[50px] border-1 border-primary p-6 flex flex-col items-center">
              <div className="w-68 h-52 rounded-[50px] overflow-hidden mb-4 bg-gray-100">
                <img
                  src={nosotrosp1}
                  alt="Patita Suave"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-primary text-xl mb-1">
                Patita Suave
              </h4>
              <p className="text-base text-[#000000] font-normal mb-2">
                USD 5.26 mensual
              </p>
              <a
                href="https://esponsor.com/pataspirque?fbclid=PAQ0xDSwKLc2lleHRuA2FlbQIxMQABp5s4P8VzyeZqEmrJcYPyfumVUt8X01mImBtwn0Ld-Xc2TlpKNbnYMYTJorZd_aem_t-LCy7_p7r8c0QWuLEcVBA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-primary text-white mt-2 cursor-pointer rounded-full px-8 py-1 text-xl font-bold hover:scale-105 transition">
                  Únete
                </button>
              </a>
            </div>

            {/* Huella Fuerte */}
            <div className="rounded-[50px] border-1 border-primary p-6 flex flex-col items-center">
              <div className="w-68 h-52 rounded-[50px] overflow-hidden mb-4 bg-gray-100">
                <img
                  src={nosotrosp2}
                  alt="Huella Fuerte"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-primary text-xl mb-1">
                Huella Fuerte
              </h4>
              <p className="text-base text-[#000000] font-normal mb-2">
                USD 10.57 mensual
              </p>
              <a
                href="https://esponsor.com/pataspirque?fbclid=PAQ0xDSwKLc2lleHRuA2FlbQIxMQABp5s4P8VzyeZqEmrJcYPyfumVUt8X01mImBtwn0Ld-Xc2TlpKNbnYMYTJorZd_aem_t-LCy7_p7r8c0QWuLEcVBA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-primary cursor-pointer text-white rounded-full mt-2 px-8 py-1 text-xl font-bold hover:scale-105 transition">
                  Únete
                </button>
              </a>
            </div>

            {/* Corazón Quiltro */}
            <div className="rounded-[50px] border-1 border-primary p-6 flex flex-col items-center">
              <div className="w-68 h-52 rounded-[50px] overflow-hidden mb-4 bg-gray-300">
                <img
                  src={nosotrosp3}
                  alt="Huella Fuerte"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-primary text-xl mb-1">
                Corazón Quiltro
              </h4>
              <p className="text-base text-[#000000] font-normal mb-2">
                USD 21.14 mensual
              </p>
              <a
                href="https://esponsor.com/pataspirque?fbclid=PAQ0xDSwKLc2lleHRuA2FlbQIxMQABp5s4P8VzyeZqEmrJcYPyfumVUt8X01mImBtwn0Ld-Xc2TlpKNbnYMYTJorZd_aem_t-LCy7_p7r8c0QWuLEcVBA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-primary cursor-pointer text-white rounded-full mt-2 px-8 py-1 text-xl font-bold hover:scale-105 transition">
                  Únete
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Campañas y Donaciones */}
        <div className="flex justify-center mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Campañas */}
            <div className="rounded-[50px] border-1 border-primary bg-[#FFFFFF] p-6 flex flex-col items-center">
              <h3 className="text-3xl font-bold text-primary mb-4 flex items-center">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 28.7549L13.1875 27.1288C11.0833 25.2317 9.34375 23.5951 7.96875 22.2192C6.59375 20.8433 5 19.608 4.1875 18.5135C3.375 17.419 2.80729 16.4132 2.48438 15.4959C2.16146 14.5786 2 13.6404 2 12.6814C2 10.7218 2.65625 9.08524 3.96875 7.77185C5.28125 6.45846 6.91667 5.80176 8.875 5.80176C9.95833 5.80176 10.9896 6.03108 11.9688 6.48973C12.9479 6.94837 13.7917 7.59465 14.5 8.42855C15.2083 7.59465 16.0521 6.94837 17.0312 6.48973C18.0104 6.03108 19.0417 5.80176 20.125 5.80176C22.0833 5.80176 23.7188 6.45846 25.0312 7.77185C26.3438 9.08524 27 10.7218 27 12.6814C27 13.6404 26.8385 14.5786 26.5156 15.4959C26.1927 16.4132 25.625 17.419 24.8125 18.5135C24 19.608 22.9062 20.8433 21.5312 22.2192C20.1562 23.5951 18.4167 25.2317 16.3125 27.1288L14.5 28.7549ZM14.5 25.3776C16.5 23.5847 18.1458 22.0472 19.4375 20.7651C20.7292 19.483 21.75 18.3676 22.5 17.419C23.25 16.4705 23.7708 15.6262 24.0625 14.8861C24.3542 14.146 -0.729167 9.55431 24.5 12.6814C24.5 11.4306 24.0833 10.3882 23.25 9.55431C22.4167 8.72041 21.375 8.30346 20.125 8.30346C19.1458 8.30346 18.2396 8.57969 17.4062 9.13215C16.5729 9.68461 16 10.3882 15.6875 11.243L20.125 22.2192C19.8125 21.3644 16.3125 23.7337 11.5938 9.13215C41 9.68461 14.5708 27.1288 13.5917 27.1288C12.3417 27.1288 6.58333 8.72041 5.75 9.55431C12.6875 8.93417 17.9062 15.4802 17.9062 16.7311C11.5938 33.8722 4.64583 14.146 4.9375 14.8861C5.22917 15.6262 5.75 16.4705 6.5 17.419C7.25 18.3676 8.27083 19.483 9.5625 20.7651C10.8542 22.0472 12.5 23.5847 14.5 25.3776Z"
                    fill="#F4A470"
                  />
                </svg>
                Campañas
              </h3>
              <div className="w-68 h-50 rounded-[50px] overflow-hidden mb-4 bg-gray-100">
                <img
                  src={nosotrosg4}
                  alt="Gatos Ferales en Rescate"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-primary mb-1 text-xl text-center">
                Gatos Ferales en <br /> Rescate
              </h4>
              <a
                href="https://esponsor.com/pataspirque?fbclid=PAQ0xDSwKLc2lleHRuA2FlbQIxMQABp5s4P8VzyeZqEmrJcYPyfumVUt8X01mImBtwn0Ld-Xc2TlpKNbnYMYTJorZd_aem_t-LCy7_p7r8c0QWuLEcVBA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-primary cursor-pointer text-white mt-3 rounded-full px-8 py-1 font-bold text-xl hover:scale-105 transition">
                  Apoyar
                </button>
              </a>
            </div>

            {/* Donaciones */}
            <div className="rounded-[50px] border-1 border-primary bg-[#FFFFFF] p-6 flex flex-col items-center">
              <h3 className="text-3xl font-bold text-primary mb-4 flex items-center">
                <svg
                  className="mr-2 inline-block align-middle"
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
                Donaciones
              </h3>
              <div className="w-68 h-50 rounded-[50px] overflow-hidden mb-4 bg-gray-100">
                <img
                  src={nosotrosp5}
                  alt="Para comida, medicamentos, etc."
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-primary mb-1 text-xl text-center">
                Para comida, <br /> medicamentos, etc.
              </h4>
              <a
                href="https://esponsor.com/pataspirque?fbclid=PAQ0xDSwKLc2lleHRuA2FlbQIxMQABp5s4P8VzyeZqEmrJcYPyfumVUt8X01mImBtwn0Ld-Xc2TlpKNbnYMYTJorZd_aem_t-LCy7_p7r8c0QWuLEcVBA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-primary cursor-pointer text-white mt-3 rounded-full px-8 py-1 font-bold text-xl hover:scale-105 transition">
                  Apoyar
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
