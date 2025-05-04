import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import LoginModal from "../components/modals/LoginModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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

      {/* Botón hamburguesa */}
      <button
        className="md:hidden text-primary focus:outline-none cursor-pointer"
        onClick={toggleMenu}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navegación Desktop */}
      <nav className="hidden md:flex items-center space-x-6 text-lg font-normal text-black font-primary gap-8">
        <Link to="/" className="hover:text-primary transition">
          Inicio
        </Link>
        <span className="border-r border-2 h-10 border-primary" />
        <Link to="/Nosotros" className="hover:text-primary transition">
          Nosotros
        </Link>
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
        <span className="border-r border-2 h-10 border-primary" />
      </nav>

      {/* Botón sesión Desktop */}
      <div className="hidden md:block">
        <button 
        onClick={() => setShowLoginModal(true)}
        className="ml-4 border border-primary text-black font-bold px-4 py-2 rounded-full hover:bg-orange-100 transition cursor-pointer">
          Iniciar sesión
        </button>
      </div>



      {/* Menú Mobile */}
      {menuOpen && (
        <div className="absolute top-24 left-6 right-6 bg-white border border-primary rounded-2xl p-6 shadow-md flex flex-col items-center gap-4 z-50 md:hidden">
          <Link to="/" className="hover:text-primary transition">
            Inicio
          </Link>
          <Link to="/Nosotros" className="hover:text-primary transition">
            Nosotros
          </Link>
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
          onClick={() => setShowLoginModal(true)}
          className="mt-2 border border-primary text-black font-bold px-4 py-2 rounded-full hover:bg-orange-100 transition cursor-pointer">
            Iniciar sesión
          </button>
        </div>
      )}

      {/* Renderizamos el modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

    </header>
  );
};

export default Navbar;
