import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import AuthModalsController from "../components/modals/AuthModalsController";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isRegisterbOpen, setRegisterbOpen] = useState(false);

  // Dropdown para “Nosotros”
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);
  const hideTimeout = useRef(null);

  const handleMouseEnterNosotros = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setIsNosotrosOpen(true);
  };

  const handleMouseLeaveNosotros = () => {
    hideTimeout.current = setTimeout(() => {
      setIsNosotrosOpen(false);
    }, 150);
  };

  return (
    <header className="bg-white py-3 px-10 rounded-full shadow-md w-full max-w-7xl mx-auto my-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo Patas Pirque"
          className="w-[60px] h-[60px] rounded-full"
        />
      </div>

      {/* Botón móvil */}
      <button
        className="md:hidden text-primary focus:outline-none cursor-pointer"
        onClick={toggleMenu}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navbar Desktop */}
      <nav className="hidden md:flex items-center space-x-6 text-lg font-normal text-black font-primary gap-8">
        <Link to="/" className="hover:text-primary transition">
          Inicio
        </Link>
        <span className="border-r border-2 h-10 border-primary" />

        {/* DESPLEGABLE de “Nosotros” */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnterNosotros}
          onMouseLeave={handleMouseLeaveNosotros}
        >
          <div className="flex items-center cursor-pointer hover:text-primary transition">
            <span>Nosotros</span>
            <ChevronDown size={16} className="ml-1 stroke-primary" />
          </div>
          {isNosotrosOpen && (
            <div className="absolute top-full text-center left-0 mt-2 w-48 bg-white rounded-lg shadow-lg flex flex-col z-50">
              <Link
                to="/Nosotros#historia"
                className="px-4 py-2 text-sm font-normal font-tertiary hover:text-primary transition w-full"
              >
                Historia del refugio
              </Link>
              <Link
                to="/Nosotros#proposito"
                className="px-4 py-2 text-sm font-normal font-tertiary  hover:text-primary transition w-full"
              >
                Nuestro propósito
              </Link>
              <Link
                to="/Nosotros#colaborar"
                className="px-4 py-2 text-sm font-normal font-tertiary  hover:text-primary transition w-full"
              >
                Cómo colaborar
              </Link>
            </div>
          )}
        </div>

        <span className="border-r border-2 h-10 border-primary" />
        <Link
          to="/CuidadosMascota"
          className="hover:text-primary transition text-center w-[130px]"
        >
          Cuidados de tu mascota
        </Link>
        <span className="border-r border-2 h-10 border-primary" />
        <Link to="/Contacto" className="hover:text-primary transition">
          Contacto
        </Link>
      </nav>

      {/* Botón Iniciar Sesión Desktop */}
      <div className="hidden md:block">
        <button
          onClick={() => setLoginOpen(true)}
          className="ml-4 border border-primary text-black font-bold px-4 py-2 rounded-full hover:bg-orange-100 transition cursor-pointer"
        >
          Iniciar sesión
        </button>
      </div>

      {/* Navbar Mobile */}
      {menuOpen && (
        <div className="absolute top-24 left-6 right-6 bg-white border border-primary rounded-2xl p-6 shadow-md flex flex-col items-center gap-4 z-50 md:hidden">
          <Link to="/" className="hover:text-primary transition">
            Inicio
          </Link>

          {/* — Toggle “Nosotros” en Mobile — */}
          <button
            onClick={() => setIsNosotrosOpen(!isNosotrosOpen)}
            className="w-full flex items-center justify-center hover:text-primary transition cursor-pointer"
          >
            <span>Nosotros</span>
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform ${
                isNosotrosOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* — Sub-menú colapsable — */}
          {isNosotrosOpen && (
            <div className="flex flex-col items-center gap-2 mt-2">
              <Link
                to="/Nosotros#historia"
                className="hover:text-primary transition"
              >
                Historia del refugio
              </Link>
              <Link
                to="/Nosotros#proposito"
                className="hover:text-primary transition"
              >
                Nuestro propósito
              </Link>
              <Link
                to="/Nosotros#colaborar"
                className="hover:text-primary transition"
              >
                Cómo colaborar
              </Link>
            </div>
          )}

          <Link
            to="/CuidadosMascota"
            className="hover:text-primary transition text-center"
          >
            Cuidados de tu mascota
          </Link>
          <Link to="/Contacto" className="hover:text-primary transition">
            Contacto
          </Link>
          <button
            onClick={() => setLoginOpen(true)}
            className="mt-2 border border-primary text-black font-bold px-4 py-2 rounded-full hover:bg-orange-100 transition cursor-pointer"
          >
            Iniciar sesión
          </button>
        </div>
      )}

      {/* Control de Modales */}
      <AuthModalsController
        isLoginOpen={isLoginOpen}
        setLoginOpen={setLoginOpen}
        isRegisterOpen={isRegisterOpen}
        setRegisterOpen={setRegisterOpen}
        isRegisterbOpen={isRegisterbOpen}
        setRegisterbOpen={setRegisterbOpen}
      />
    </header>
  );
};

export default Navbar;
