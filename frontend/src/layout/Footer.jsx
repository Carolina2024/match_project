import { FiMail } from "react-icons/fi";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import TiktokIcon from "../assets/icons/svg-components/TiktokIcon";
import FacebookIcon from "../assets/icons/svg-components/FacebookIcon";
import InstagramIcon from "../assets/icons/svg-components/InstagramIcon";

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9] text-black font-tertiary">
      <div className="text-center text-primary font-semibold italic text-2xl pt-6 pb-2">
        Un hogar para cada patita
      </div>
      <hr className="border-t border-1 border-primary mx-14 mb-6" />

      <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-40 pt-4 pb-10 text-sm md:text-base gap-8">
        <div className="text-center text-xl md:text-left font-primary">
          <h3 className="font-bold mb-3 text-black">Menú principal</h3>
          <ul className="space-y-2 font-medium flex flex-col">
            <Link to="/">Inicio</Link>
            <Link to="/Nosotros#historia">Nosotros</Link>
            <Link to="/CuidadosMascota">Cuidados de tu mascota</Link>
            <Link to="/Contacto">Contacto</Link>
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="w-46 h-46 rounded-full"
          />
          <div className="flex space-x-5 text-2xl cursor-pointer">

            <a href="https://www.tiktok.com/@pataspirque_" target="_blank">
<TiktokIcon />
            </a>

            <a
              href="https://www.facebook.com/p/Patas-Pirque-61550508151197/"
              target="_blank"
            >

<FacebookIcon />

            </a>

            <a href="https://www.instagram.com/pataspirque/" target="_blank">
<InstagramIcon />

            </a>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-bold text-primary text-xl mb-1 font-primary">
            Contáctanos
          </h3>
          <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
            <FiMail className="text-primary text-xl" />
            <span className="font-primary text-xl font-medium">
              pataspirque@gmail.com
            </span>
          </div>
        </div>
      </div>

      <div className="bg-primary text-black flex justify-center items-center px-8 py-6 rounded-t-4xl">
        <span className="text-base font-medium text-center font-tertiary">
          &copy;2025 Patas Pirque
        </span>
      </div>
    </footer>
  );
};

export default Footer;
