import { useEffect, useState } from "react";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";
import image from "../assets/image.png";

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliders = [slider1, slider2, slider3];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliders.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sliders.length]);

  return (
    <section className="w-full py-10 px-4 flex flex-col justify-center items-center">
      {/* Hero */}
      <div className="relative w-full max-w-4xl overflow-hidden">
        <img
          src={image}
          alt="Perro mirando"
          className="w-full h-auto object-cover rounded-2xl"
        />
        <div className="absolute top-6 left-6 md:top-10 md:left-10 text-left">
          <h2 className="text-primary text-4xl md:text-6xl font-bold leading-tight">
            Matcheá con
            <br />
            tu futura
            <br />
            mascota
          </h2>
        </div>
      </div>

      {/* Mini galería */}
      <section className="py-10 px-4 flex justify-center mt-10 w-full">
        <div className="flex flex-wrap justify-center gap-6 md:gap-16 max-w-5xl">
          {[image2, image3, image4, image5].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Perrito ${index + 1}`}
              className="w-32 h-32 md:w-44 md:h-44 object-cover hover:scale-105 transition"
            />
          ))}
        </div>
      </section>

      {/* Botón */}
      <button className="bg-white text-primary font-semibold px-8 py-2 m-20 text-lg md:text-2xl rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer">
        Regístrate para Adoptar
      </button>

      {/* Pasos */}
      <section className="py-12 px-4 flex flex-col items-center relative mb-22 mt-18">
        <h2 className="text-2xl md:text-3xl font-normal text-center text-black">
          Adopta una mascota en <br />
          <span className="text-primary font-bold text-2xl">
            3 simples pasos
          </span>
        </h2>

        {/* Líneas curvas SVG entre los pasos */}
        <div className="absolute top-50 left-0 right-0 flex justify-center">
          <svg
            width="650"
            height="104"
            viewBox="0 0 690 104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.02832 2.06604C76.3448 -5.06727 64.2133 95.8158 211.308 102.185"
              stroke="#F4A470"
              strokeWidth="2"
              strokeDasharray="10 5"
            />
            <path
              d="M689.896 2.06604C614.58 -5.06727 626.712 95.8158 479.617 102.185"
              stroke="#F4A470"
              strokeWidth="2"
              strokeDasharray="10 5"
            />
          </svg>
        </div>

        {/* Contenedores de pasos */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-50 relative w-full max-w-6xl z-10">
          {/* Paso 1 */}
          <div className="rounded-3xl border-[#DFDFDF] border shadow-md px-2 py-6 flex flex-col items-center text-center w-full md:w-[250px] h-[240px] relative">
            <div className="absolute -top-5 bg-primary text-[#2E256F] w-10 h-10 flex items-center justify-center rounded-full font-bold">
              1
            </div>
            <div className="mt-10 flex items-center justify-center h-20">
              <svg
                width="80"
                height="55"
                viewBox="0 0 80 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M73.3333 17.5002V10.8335H66.6667V17.5002H60V24.1668H66.6667V30.8335H73.3333V24.1668H80V17.5002H73.3333Z"
                  fill="#F4A470"
                />
                <path
                  d="M26.6667 27.5002C34.0333 27.5002 40 21.5335 40 14.1668C40 6.80016 34.0333 0.833496 26.6667 0.833496C19.3 0.833496 13.3333 6.80016 13.3333 14.1668C13.3333 21.5335 19.3 27.5002 26.6667 27.5002ZM26.6667 7.50016C30.3333 7.50016 33.3333 10.5002 33.3333 14.1668C33.3333 17.8335 30.3333 20.8335 26.6667 20.8335C23 20.8335 20 17.8335 20 14.1668C20 10.5002 23 7.50016 26.6667 7.50016Z"
                  fill="#F4A470"
                />
                <path
                  d="M26.6667 30.8335C17.7667 30.8335 0 35.3002 0 44.1668V54.1668H53.3333V44.1668C53.3333 35.3002 35.5667 30.8335 26.6667 30.8335ZM46.6667 47.5002H6.66667V44.2002C7.33333 41.8002 17.6667 37.5002 26.6667 37.5002C35.6667 37.5002 46 41.8002 46.6667 44.1668V47.5002Z"
                  fill="#F4A470"
                />
                <path
                  d="M41.7 1.00016C44.7667 4.5335 46.6667 9.1335 46.6667 14.1668C46.6667 19.2002 44.7667 23.8002 41.7 27.3335C48.2333 26.5002 53.3333 20.9668 53.3333 14.1668C53.3333 7.36683 48.2333 1.8335 41.7 1.00016Z"
                  fill="#F4A470"
                />
                <path
                  d="M55.1 33.6002C58.0667 36.3668 60 39.8335 60 44.1668V54.1668H66.6667V44.1668C66.6667 39.3335 61.3667 35.8002 55.1 33.6002Z"
                  fill="#F4A470"
                />
              </svg>
            </div>
            <p className="mt-4 text-sm text-[#0C0C0C]">
              Completar el formulario de registro en unos minutos
            </p>
          </div>

          {/* Paso 2 */}
          <div className="rounded-3xl border-[#DFDFDF] border shadow-md px-2 py-6 flex flex-col items-center text-center w-full md:w-[250px] h-[240px] relative">
            <div className="absolute -top-5 bg-primary text-[#2E256F] w-10 h-10 flex items-center justify-center rounded-full font-bold">
              2
            </div>
            <div className="mt-10 flex items-center justify-center h-20">
              <svg
                width="74"
                height="61"
                viewBox="0 0 74 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.333344 26.923V60.2563H20.3333V43.5897H27V60.2563H47V26.923L23.6667 10.2563L0.333344 26.923ZM40.3333 53.5897H33.6667V36.923H13.6667V53.5897H7.00001V30.3563L23.6667 18.4563L40.3333 30.3563V53.5897Z"
                  fill="#F4A470"
                />
                <path
                  d="M60.3333 13.5897H53.6667V20.2563H60.3333V13.5897Z"
                  fill="#F4A470"
                />
                <path
                  d="M60.3333 26.923H53.6667V33.5897H60.3333V26.923Z"
                  fill="#F4A470"
                />
                <path
                  d="M60.3333 40.2563H53.6667V46.923H60.3333V40.2563Z"
                  fill="#F4A470"
                />
                <path
                  d="M30.3333 0.256348V6.82301L37 11.5897V6.92301H67V53.5897H53.6667V60.2563H73.6667V0.256348H30.3333Z"
                  fill="#F4A470"
                />
              </svg>
            </div>
            <p className="mt-4 text-sm text-[#0C0C0C]">
              Describí tu hogar y tus preferencias para que Patas Pirque pueda
              encontrar tu mascota ideal
            </p>
          </div>

          {/* Paso 3 */}
          <div className="rounded-3xl border-[#DFDFDF] border shadow-md px-6 py-6 flex flex-col items-center text-center w-full md:w-[250px] h-[240px] relative">
            <div className="absolute -top-5 bg-primary text-[#2E256F] w-10 h-10 flex items-center justify-center rounded-full font-bold">
              3
            </div>
            <div className="mt-10 flex items-center justify-center h-20">
              <svg
                width="68"
                height="75"
                viewBox="0 0 68 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.33335 14.1668H14V24.1668H47.3334V14.1668H54V30.8335H60.6667V14.1668C60.6667 10.5002 57.6667 7.50016 54 7.50016H40.0667C38.6667 3.6335 35 0.833496 30.6667 0.833496C26.3334 0.833496 22.6667 3.6335 21.2667 7.50016H7.33335C3.66669 7.50016 0.666687 10.5002 0.666687 14.1668V60.8335C0.666687 64.5002 3.66669 67.5002 7.33335 67.5002H24V60.8335H7.33335V14.1668ZM30.6667 7.50016C32.5 7.50016 34 9.00016 34 10.8335C34 12.6668 32.5 14.1668 30.6667 14.1668C28.8334 14.1668 27.3334 12.6668 27.3334 10.8335C27.3334 9.00016 28.8334 7.50016 30.6667 7.50016Z"
                  fill="#F4A470"
                />
                <path
                  d="M58.3334 60.5002C59.6667 58.1668 60.6667 55.5002 60.6667 52.5002C60.6667 44.1668 54 37.5002 45.6667 37.5002C37.3334 37.5002 30.6667 44.1668 30.6667 52.5002C30.6667 60.8335 37.3334 67.5002 45.6667 67.5002C48.6667 67.5002 51.3334 66.5002 53.6667 65.1668L62.6667 74.1668L67.3334 69.5002L58.3334 60.5002ZM45.6667 60.8335C41 60.8335 37.3334 57.1668 37.3334 52.5002C37.3334 47.8335 41 44.1668 45.6667 44.1668C50.3334 44.1668 54 47.8335 54 52.5002C54 57.1668 50.3334 60.8335 45.6667 60.8335Z"
                  fill="#F4A470"
                />
              </svg>
            </div>
            <p className="mt-4 text-sm text-[#0C0C0C]">Encontrar a tu Match</p>
          </div>
        </div>
      </section>

      {/* Historias de adopción */}
      <section className="w-full px-4 flex flex-col justify-center items-center">
        <div className="py-10 text-center mt-12 w-full">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-22 px-4 md:px-20 text-left ">
            Historias de adopción
          </h2>

          {/* Slider funcional automático */}
          <div className="max-w-3xl mx-auto mb-6 px-4 ">
            <img
              src={sliders[activeSlide]}
              alt={`Slide ${activeSlide + 1}`}
              className="shadow-lg w-full h-auto object-cover rounded-4xl"
            />

            <div className="flex justify-center space-x-2 -mt-10 mb-28">
              {sliders.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    activeSlide === i ? "bg-white" : "bg-white"
                  }`}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
          </div>

          {/* Testimonios */}
          <div className="max-w-3xl mx-auto space-y-10 mt-10 text-sm md:text-base text-black font-extralight px-4">
            <div className="text-left">
              <p className="italic">
                “Nunca pensé que un perro podía cambiar tanto mi vida. Rocky me
                hace compañía, me escucha sin decir nada, y siempre está ahí.
                Adoptarlo fue la mejor decisión. Ahora tengo un amigo que me
                espera todos los días con la cola moviéndose como loco!”
              </p>
              <p className="mt-2 font-semibold text-right">Mateo Perez</p>
            </div>
            <div className="text-left">
              <p className="italic">
                “Nos eligió mirando cómo iba la situación. Luno con Tomi, pero
                desde el primer día fue puro amor. Juegan, se cuidan y hasta
                duermen juntos. Adoptar fue como sumar a un hermano peludo a la
                familia. ¡No sé cómo vivíamos sin él!”
              </p>
              <p className="mt-2 font-semibold text-right">Leonardo Gomez</p>
            </div>
            <div className="text-left">
              <p className="italic">
                “Teníamos miedo de cómo iba a reaccionar Toby con un gato en
                casa, pero fue todo lo contrario. Se hicieron amigos desde el
                primer día. Ver el respeto y los juegos de los dos nos llena de
                emoción. Adoptar a Nilo nos cambió como familia.”
              </p>
              <p className="mt-2 font-semibold text-right">Sandra Lopez</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
