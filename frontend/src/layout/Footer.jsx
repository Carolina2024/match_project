import { FiMail } from "react-icons/fi";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

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
              <svg
                width="28"
                height="31"
                viewBox="0 0 28 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5308 11.634C10.7243 11.0954 8.79409 11.1397 7.01425 11.7606C5.23441 12.3815 3.69547 13.5475 2.61603 15.0929C1.53658 16.6382 0.971521 18.4845 1.00111 20.3693C1.03069 22.2541 1.65341 24.0816 2.78083 25.5924C3.90824 27.1031 5.48301 28.2202 7.28146 28.7849C9.07991 29.3497 11.0106 29.3334 12.7993 28.7384C14.5879 28.1434 16.1436 26.9999 17.2454 25.4704C18.3472 23.9408 18.939 22.103 18.9368 20.218V11.2496C20.6451 12.9579 23.2075 13.812 26.624 13.812V7.406C23.2075 7.406 20.6451 5.27066 18.9368 1H12.5308V20.218M12.5308 20.218C12.5308 19.7112 12.3805 19.2158 12.0989 18.7944C11.8174 18.373 11.4172 18.0446 10.949 17.8506C10.4808 17.6567 9.96555 17.606 9.46849 17.7048C8.97144 17.8037 8.51486 18.0477 8.1565 18.4061C7.79814 18.7645 7.5541 19.221 7.45523 19.7181C7.35636 20.2151 7.4071 20.7304 7.60104 21.1986C7.79499 21.6668 8.12341 22.067 8.5448 22.3485C8.96618 22.6301 9.4616 22.7804 9.96839 22.7804C10.648 22.7804 11.2997 22.5104 11.7803 22.0299C12.2608 21.5493 12.5308 20.8976 12.5308 20.218Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/p/Patas-Pirque-61550508151197/"
              target="_blank"
            >
              <svg
                width="18"
                height="31"
                viewBox="0 0 18 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5833 1H12.3333C10.4547 1 8.65304 1.74628 7.32466 3.07466C5.99628 4.40304 5.25 6.20472 5.25 8.08333V12.3333H1V18H5.25V29.3333H10.9167V18H15.1667L16.5833 12.3333H10.9167V8.08333C10.9167 7.70761 11.0659 7.34728 11.3316 7.0816C11.5973 6.81592 11.9576 6.66667 12.3333 6.66667H16.5833V1Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a href="https://www.instagram.com/pataspirque/" target="_blank">
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 15.1667C1 8.48895 1 5.1486 3.0743 3.0743C5.1486 1 8.48746 1 15.1667 1C21.8444 1 25.1847 1 27.259 3.0743C29.3333 5.1486 29.3333 8.48746 29.3333 15.1667C29.3333 21.8444 29.3333 25.1847 27.259 27.259C25.1847 29.3333 21.8459 29.3333 15.1667 29.3333C8.48895 29.3333 5.1486 29.3333 3.0743 27.259C1 25.1847 1 21.8459 1 15.1667Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.3804 6.96484H23.3655M21.8772 15.1666C21.8772 16.9463 21.1702 18.6532 19.9118 19.9117C18.6533 21.1701 16.9464 21.8771 15.1667 21.8771C13.387 21.8771 11.6801 21.1701 10.4216 19.9117C9.16318 18.6532 8.45618 16.9463 8.45618 15.1666C8.45618 13.3869 9.16318 11.68 10.4216 10.4215C11.6801 9.16307 13.387 8.45607 15.1667 8.45607C16.9464 8.45607 18.6533 9.16307 19.9118 10.4215C21.1702 11.68 21.8772 13.3869 21.8772 15.1666Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
