import { FaTiktok, FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import logo from "../assets/logo.png"; // Asegúrate de que la ruta sea correcta

const Footer = () => {
  return (
    <footer className="bg-primary py-8 px-4 rounded-t-3xl flex flex-col items-center justify-center">
      {/* Logo */}
      <img
        src={logo}
        alt="Logo Patas Pirque"
        className="w-16 h-16 rounded-full object-cover mb-4"
      />

      {/* Íconos Sociales */}
      <div className="flex space-x-6 text-black text-xl">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiFacebook className="hover:text-white transition" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <FaTiktok className="hover:text-white transition" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="hover:text-white transition" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
