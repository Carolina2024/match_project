import { useEffect, useState } from "react";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.webp";
import image4 from "../assets/image4.webp";
import image5 from "../assets/image5.webp";
import image6 from "../assets/image6.webp";
import image7 from "../assets/image7.webp";
import image8 from "../assets/image8.webp";
import image9 from "../assets/image9.webp";
import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import slider3 from "../assets/slider3.webp";
import image from "../assets/image.webp";
import imageb from "../assets/imageb.webp";
import { HandHeart } from "lucide-react";
import PetsHome from "../components/PetsHome";
import AuthModalsController from "../components/modals/AuthModalsController";
import { useLocation, useNavigate } from "react-router-dom";
import BackgroundShape from "../assets/icons/svg-components/BackgroundShape";
import BackgroundUserActive from "../assets/icons/svg-components/BackgroundUserActive";
import CurvedLine from "../assets/icons/svg-components/CurvedLine";
import UserPlusIcon from "../assets/icons/svg-components/UserPlusIcon";
import HomePreferenceIcon from "../assets/icons/svg-components/HomePreferenceIcon";
import FindYourMatch from "../assets/icons/svg-components/FindYourMatch";

const Home = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isRegisterbOpen, setRegisterbOpen] = useState(false);
  const [isRecoverOpen, setRecoverOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("openLogin") === "true") {
      setLoginOpen(true);
    }

    if (params.get("openRecovery") === "true") {
      setRecoverOpen(true);
    }

    if (params.has("openLogin") || params.has("openRecovery")) {
      params.delete("openLogin");
      params.delete("openRecovery");
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const [activeSlide, setActiveSlide] = useState(0);
  const sliders = [slider1, slider2, slider3];
  const slides = [
    {
      img: sliders[0],
      quote:
        "“Nunca pensé que un perro podía cambiar tanto mi vida. Rocky me hace compañía, me escucha sin decir nada, y siempre está ahí. Adoptarlo fue la mejor decisión. Ahora tengo un amigo que me espera todos los días con la cola moviéndose como loco.”",
      author: "Mateo Perez",
    },
    {
      img: sliders[1],
      quote:
        "“Nos daba miedo cómo iba a reaccionar Luna con Tomi, pero desde el primer día fue puro amor. Juegan, se cuidan y hasta duermen juntos. Adoptar fue como sumar una hermana peluda a la familia. No sé cómo vivíamos sin ella.”",
      author: "Leonardo Gomez",
    },
    {
      img: sliders[2],
      quote:
        "“Teníamos miedo de cómo iba a reaccionar Toby con un gato en casa, pero fue todo lo contrario. Se hicieron amigos desde el primer día. Ver a nuestros hijos jugando con los dos nos derrite el corazón. Adoptar a Mía nos completó como familia.”",
      author: "Sandra Lopez",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliders.length]);

  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const loggedIn = Boolean(user);

  return (
    <section className="w-full flex flex-col justify-center items-center -mt-20">
      {!loggedIn ? (
        <>
          <div className="relative w-full md:max-w-6xl max-w-lg overflow-hidden md:flex items-center md:ml-10 bg-transparent">
            <BackgroundShape />

            <div className="block md:hidden w-[400px] mt-10 md:ml-6 bg-[#F6E8D8] rounded-[80px] px-4 pt-10 pb-4 mb-16">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold font-secundary leading-tight text-shadow-lg/10 text-center md:text-left">
                  <span className="text-primary">Tu nuevo </span>
                  <br />
                  <span className="text-tertiary">compañero </span>
                  <span className="text-primary">te </span>
                  <br />
                  <span className="text-primary">está esperando</span>
                </h2>

                <button
                  onClick={() => setRegisterOpen(true)}
                  className="bg-white text-primary font-bold text-base cursor-pointer px-10 py-2 mt-6 rounded-full shadow-md/30 hover:bg-gray-100 transition"
                >
                  Regístrate para Adoptar
                </button>

                <img
                  src={image}
                  alt="Perro mirando"
                  className="w-[400px] mt-6 object-cover"
                />
              </div>
            </div>

            <div className="hidden md:flex absolute inset-y-0 right-0 items-center">
              <img
                src={image}
                alt="Perro mirando"
                className="w-[640px] object-cover -mt-10"
              />
            </div>

            <div className="hidden md:flex absolute inset-y-0 left-0 items-center pl-16">
              <div>
                <h2 className="text-6xl font-bold md:leading-16 font-secundary mb-4 ml-4 text-left text-shadow-lg/10">
                  <span className="text-primary">Tu nuevo</span>
                  <br />
                  <span className="text-tertiary">compañero</span>
                  <br />
                  <span className="text-primary">te está</span>
                  <br />
                  <span className="text-primary">esperando</span>
                </h2>

                <button
                  onClick={() => setRegisterOpen(true)}
                  className="bg-white text-primary cursor-pointer mt-8 font-bold text-2xl px-14 py-3 rounded-full shadow-md/30 hover:bg-gray-100 transition"
                >
                  Regístrate para Adoptar
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold font-secundary text-primary text-center md:mt-16 mt-0">
            Conoce a quienes esperan un hogar
          </h2>
          <hr className="w-3/5 border-t-1 border-primary mx-auto mt-4 md:mb-10" />
          <section className="py-10 px-4 flex justify-center w-full">
            <div className="flex flex-wrap justify-center gap-6 md:gap-16 max-w-5xl">
              {[
                image2,
                image3,
                image4,
                image5,
                image6,
                image7,
                image8,
                image9,
              ].map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Perrito ${idx + 1}`}
                  className="w-38 h-38 md:w-50 md:h-50 object-cover hover:scale-105 transition"
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="block md:hidden w-[380px] mt-10 bg-[#F6E8D8] rounded-[80px] px-4 pt-10 pb-6 md:mb-16 relative">
            <section className="absolute top-4 right-4 z-10">
              <a
                href="https://esponsor.com/pataspirque"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-primary w-15 h-15 cursor-pointer rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90">
                  <HandHeart size={35} className="stroke-white" />
                </button>
              </a>
            </section>

            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl font-bold font-secundary leading-tight text-shadow-lg/10">
                <span className="text-primary">Matchea </span> <br />
                <span className="text-tertiary">con tu futura </span>
                <span className="text-primary">mascota</span>
              </h2>

              <img
                src={imageb}
                alt="Perrito mirando"
                className="w-[300px] mt-6 object-cover rounded-[50px]"
              />
            </div>
          </div>

          <div className=" hidden md:flex relative w-full md:max-w-5xl max-w-lg mt-12 overflow-ellipsis items-center md:ml-10">
            <BackgroundUserActive />

            <div className="absolute inset-y-0 -mt-3 right-0 ">
              <img
                src={imageb}
                alt="Perro mirando"
                className="w-[250px] md:w-[400px] object-cover"
              />
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center pl-10 md:pl-30">
              <div>
                <h2 className="text-2xl md:text-6xl font-bold md:leading-16 leading-8 font-secundary md:ml-6 -ml-5 md:mb-4 mb-0 text-left text-shadow-lg/10">
                  <span className="text-primary">Matchea</span>
                  <br />
                  <span className="text-tertiary">con tu futura</span>
                  <br />
                  <span className="text-primary">mascota</span>
                </h2>
              </div>
            </div>

            <section className="absolute top-0 right-0">
              <a href="https://esponsor.com/pataspirque" target="_blank">
                <button className="bg-primary w-20 cursor-pointer h-20 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90">
                  <HandHeart size={44} className="stroke-white" />
                </button>
              </a>
            </section>
          </div>

          <div className="w-full mt-22 flex justify-center">
            <div className="w-full md:max-w-5xl px-4">
              <PetsHome />
            </div>
          </div>
        </>
      )}

      <section className="py-12 px-4 flex flex-col items-center relative md:mb-22 md:mt-18">
        <h2 className="text-2xl md:text-3xl font-medium text-center text-black mb-2">
          Encuentra a tu mascota ideal
        </h2>
        <h2 className="text-primary font-extrabold text-2xl font-tertiary">
          3 simples pasos
        </h2>
        <div className="hidden absolute top-50 left-0 right-0 md:flex justify-center">
          <CurvedLine />
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center md:gap-50 gap-14 relative w-full max-w-6xl z-10">
          <div className="rounded-3xl border-[#DFDFDF] border shadow-md/25 px-1 py-6 flex flex-col items-center text-center md:w-[300px] w-[300px] h-[240px] relative">
            <div className="absolute -top-5 bg-primary text-white font-tertiary w-12 h-12 flex items-center justify-center rounded-full font-medium text-2xl">
              1
            </div>
            <div className="mt-10 flex items-center justify-center h-20">
              <UserPlusIcon />
            </div>
            <p className="mt-4 text-sm text-[#0C0C0C] font-primary font-normal">
              Completar el formulario de registro en unos minutos
            </p>
          </div>

          <div className="rounded-3xl border-[#DFDFDF] border shadow-md/25 px-1 py-6 flex flex-col items-center text-center md:w-[300px] w-[300px] h-[240px] relative">
            <div className="absolute -top-5 bg-primary font-tertiary text-white w-12 h-12 flex items-center justify-center rounded-full font-medium text-2xl">
              2
            </div>
            <div className="mt-10 flex items-center justify-center h-20">
              <HomePreferenceIcon />
            </div>
            <p className="mt-4 text-sm text-[#0C0C0C] font-primary font-normal">
              Describir tu hogar y tus preferencias para que Patas Pirque pueda
              encontrar tus mascotas compatibles
            </p>
          </div>

          <div className="rounded-3xl border-[#DFDFDF] border shadow-md/25 px-1 py-6 flex flex-col items-center text-center md:w-[300px] w-[300px] h-[240px] relative">
            <div className="absolute -top-5 bg-primary font-tertiary text-white w-12 h-12 flex items-center justify-center rounded-full font-medium text-2xl">
              3
            </div>
            <div className="mt-10 flex items-center justify-center h-20">
              <FindYourMatch />
            </div>
            <p className="mt-4 text-sm text-[#0C0C0C] font-primary font-normal">
              Encontrar a tu Match
            </p>
          </div>
        </div>
      </section>

      <section className="w-full px-4 flex flex-col justify-center items-center -mt-8">
        <div id="historias" className="py-10 text-center w-full">
          <h2 className="text-2xl md:text-4xl font-bold text-primary px-4 md:px-20 text-center">
            Historias de adopción
          </h2>
          <hr className="w-3/5 border-t-1 border-primary mx-auto md:mt-4 mt-2 mb-8 md:mb-10" />

          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="relative overflow-hidden rounded-4xl shadow-lg">
              <img
                src={slides[activeSlide].img}
                alt={`Slide ${activeSlide + 1}`}
                className="w-full h-110 object-cover"
              />
              <div className="absolute bottom-0 left-0 md:max-w-4xl bg-[#59514680] p-4 md:py-3 px-4 md:mx-10 md:h-auto h-38 mx-4 my-5 md:my-6 text-left rounded-2xl text-white">
                <p className="font-semibold md:text-2xl text-lg">
                  {slides[activeSlide].author}
                </p>
                <p className="italic mt-2 text-xs md:text-base leading-relaxed">
                  {slides[activeSlide].quote}
                </p>
              </div>
            </div>
            <div className="flex justify-center space-x-3 mt-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full transition ${
                    activeSlide === i ? "bg-primary" : "bg-tertiary"
                  }`}
                  onClick={() => setActiveSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AuthModalsController
        isLoginOpen={isLoginOpen}
        setLoginOpen={setLoginOpen}
        isRegisterOpen={isRegisterOpen}
        setRegisterOpen={setRegisterOpen}
        isRegisterbOpen={isRegisterbOpen}
        setRegisterbOpen={setRegisterbOpen}
        isRecoverOpen={isRecoverOpen}
        setRecoverOpen={setRecoverOpen}
      />
    </section>
  );
};

export default Home;
