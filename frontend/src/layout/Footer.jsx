import { FaTiktok, FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9] text-black">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 gap-6">
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="w-38 h-38  rounded-full"
          />
        </div>

        {/* Contacto */}
        <div className="text-center md:text-left md:mr-32">
          <h3 className="font-semibold text-primary mb-3">Contactanos</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center  gap-2 text-left mb-3">
              <FaMapMarkerAlt className="text-primary text-lg" />
              <span>Calle 123, Santiago, Chile</span>
            </li>
            <li className="flex items-center gap-2 text-left mb-3">
              <FaPhoneAlt className="text-primary text-lg" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center  gap-2 text-left ">
              <IoMdMail className="text-primary text-lg" />
              <span>pataspirque@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="bg-primary text-black  flex flex-col md:flex-row justify-between items-center px-16 py-6 rounded-t-4xl">
        <span className="text-base font-medium">&copy;2025 Pataspirque.cl</span>

        {/* Redes Sociales */}
        <div className="flex space-x-4 text-2xl mt-2 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiFacebook className="hover:text-white transition" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
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
      </div>
    </footer>
  );
};

export default Footer;
