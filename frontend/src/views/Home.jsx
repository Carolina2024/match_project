import { useEffect, useState } from "react";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";

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
          src="src/assets/image.png"
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
      <button className="bg-white text-black font-semibold px-8 py-2 mt-12 text-lg md:text-2xl rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer">
        Regístrate para Adoptar
      </button>

      {/* Historias de adopción */}
      <section className="w-full px-4 flex flex-col justify-center items-center">
        <div className="py-10 text-center mt-12 w-full">
          <h2 className="text-2xl md:text-4xl font-bold text-primary mb-10 px-4 md:px-20">
            Historias de adopción
          </h2>

          {/* Slider funcional automático */}
          <div className="max-w-3xl mx-auto mb-6 px-4">
            <img
              src={sliders[activeSlide]}
              alt={`Slide ${activeSlide + 1}`}
              className="shadow-lg w-full h-auto object-cover"
            />
            <div className="flex justify-center mt-4 space-x-2">
              {sliders.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    activeSlide === i ? "bg-black" : "bg-gray-300"
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
