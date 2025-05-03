import { FaTiktok, FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import logo2 from "../assets/logo2.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9] text-black">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 gap-6">
        {/* Logo */}
        <div>
          <img
            src={logo2}
            alt="Logo Patas Pirque"
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* Contacto */}
        <div className="text-left mr-4">
          <h3 className="font-semibold text-primary mb-2">Contactanos</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center  gap-2 text-left">
              <FaMapMarkerAlt className="text-primary" />
              <span>Calle 123, Santiago, Chile</span>
            </li>
            <li className="flex items-center gap-2 text-left">
              <FaPhoneAlt className="text-primary" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center  gap-2 text-left">
              <IoMdMail className="text-primary" />
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
