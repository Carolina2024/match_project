import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import logo from "../assets/logo.png";
import AuthModalsController from "../components/modals/AuthModalsController";

const Navbar = () => {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const loggedIn = Boolean(user);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Menú general
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Modales
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isRegisterbOpen, setRegisterbOpen] = useState(false);

  // Dropdown “Inicio”
  const [isInicioOpen, setIsInicioOpen] = useState(false);
  const hideTimeoutInicio = useRef(null);
  const handleMouseEnterInicio = () => {
    clearTimeout(hideTimeoutInicio.current);
    setIsInicioOpen(true);
  };
  const handleMouseLeaveInicio = () => {
    hideTimeoutInicio.current = setTimeout(() => setIsInicioOpen(false), 150);
  };

  // Dropdown “Nosotros”
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);
  const hideTimeoutNos = useRef(null);
  const handleMouseEnterNosotros = () => {
    clearTimeout(hideTimeoutNos.current);
    setIsNosotrosOpen(true);
  };
  const handleMouseLeaveNosotros = () => {
    hideTimeoutNos.current = setTimeout(() => setIsNosotrosOpen(false), 150);
  };

  // Dropdown “Usuario”
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const hideTimeoutUser = useRef(null);
  const handleMouseEnterUser = () => {
    clearTimeout(hideTimeoutUser.current);
    setIsUserMenuOpen(true);
  };
  const handleMouseLeaveUser = () => {
    hideTimeoutUser.current = setTimeout(() => setIsUserMenuOpen(false), 150);
  };

  return (
    <header className="bg-white py-3 px-10 rounded-full shadow-md w-full max-w-7xl mx-auto my-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo Patas Pirque"
          className="w-[60px] h-[60px] rounded-full"
        />
      </Link>

      {/* Botón móvil */}
      <button
        className="md:hidden text-primary focus:outline-none cursor-pointer"
        onClick={toggleMenu}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop */}
      <nav className="hidden md:flex items-center gap-8 text-lg font-normal text-black font-primary">
        {/* Inicio sin Logueo y dropdown cuando se loguea */}
        {loggedIn ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnterInicio}
            onMouseLeave={handleMouseLeaveInicio}
          >
            <Link
              to="/"
              className="flex items-center cursor-pointer hover:text-primary transition"
            >
              <span>Inicio</span>
              <ChevronDown size={16} className="ml-1 stroke-[#767575]" />
            </Link>
            {isInicioOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg flex flex-col text-center z-50">
                <Link
                  to="/#seguimiento"
                  className="px-4 py-2 text-sm hover:text-primary transition"
                >
                  Seguimiento de tu match
                </Link>
                <Link
                  to="/#historias"
                  className="px-4 py-2 text-sm hover:text-primary transition"
                >
                  Historias de adopción
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/" className="hover:text-primary transition">
            Inicio
          </Link>
        )}
        <span className="border-r border-2 h-10 border-primary" />

        {/* Nosotros con dropdown */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnterNosotros}
          onMouseLeave={handleMouseLeaveNosotros}
        >
          <div className="flex items-center cursor-pointer hover:text-primary transition">
            <span>Nosotros</span>
            <ChevronDown size={16} className="ml-1 stroke-[#767575]" />
          </div>
          {isNosotrosOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg flex flex-col text-center z-50">
              <Link
                to="/Nosotros#historia"
                className="px-4 py-2 text-sm hover:text-primary transition"
              >
                Historia del refugio
              </Link>
              <Link
                to="/Nosotros#proposito"
                className="px-4 py-2 text-sm hover:text-primary transition"
              >
                Nuestro propósito
              </Link>
              <Link
                to="/Nosotros#colaborar"
                className="px-4 py-2 text-sm hover:text-primary transition"
              >
                Cómo colaborar
              </Link>
            </div>
          )}
        </div>
        <span className="border-r border-2 h-10 border-primary" />

        {/* Otras Vistas */}
        <Link to="/CuidadosMascota" className="hover:text-primary transition">
          Cuidados de tu mascota
        </Link>
        <span className="border-r border-2 h-10 border-primary" />
        <Link to="/Contacto" className="hover:text-primary transition">
          Contacto
        </Link>
      </nav>

      {/* Botón Desktop */}
      <div className="hidden md:block">
        {loggedIn ? (
          <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnterUser}
            onMouseLeave={handleMouseLeaveUser}
          >
            <button className="flex items-center border border-primary px-4 py-2 rounded-full hover:bg-orange-50 transition">
              <User size={20} className="mr-2 stroke-primary" />
              <span>{user.fullname}</span>
              <ChevronDown size={16} className="ml-2 stroke-primary" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg flex flex-col z-50">
                <Link
                  to="/profile"
                  className="px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Actualizar información
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setLoginOpen(true)}
            className="ml-4 border border-primary px-4 py-2 rounded-full font-bold hover:bg-orange-100 transition"
          >
            Iniciar sesión
          </button>
        )}
      </div>

      {/* Mobile */}
      {menuOpen && (
        <div className="absolute top-24 left-6 right-6 bg-white border border-primary rounded-2xl p-6 shadow-md flex flex-col items-center gap-4 z-50 md:hidden">
          {/* Inicio */}
          {loggedIn ? (
            <>
              <button
                onClick={() => setIsInicioOpen(!isInicioOpen)}
                className="w-full flex items-center justify-center hover:text-primary transition cursor-pointer"
              >
                <span>Inicio</span>
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${
                    isInicioOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isInicioOpen && (
                <div className="flex flex-col items-center gap-2 mt-2">
                  <Link
                    to="/#seguimiento"
                    className="hover:text-primary transition"
                  >
                    Seguimiento de tu match
                  </Link>
                  <Link
                    to="/#historias"
                    className="hover:text-primary transition"
                  >
                    Historias de adopción
                  </Link>
                </div>
              )}
            </>
          ) : (
            <Link to="/" className="hover:text-primary transition">
              Inicio
            </Link>
          )}

          {/* Nosotros */}
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

          {/* Otras Vistas */}
          <Link to="/CuidadosMascota" className="hover:text-primary transition">
            Cuidados de tu mascota
          </Link>
          <Link to="/Contacto" className="hover:text-primary transition">
            Contacto
          </Link>

          {/* Botón mobile */}
          {loggedIn ? (
            <>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-full flex items-center justify-center hover:text-primary transition cursor-pointer"
              >
                <User size={20} className="mr-2 stroke-primary" />
                <span>{user.fullname}</span>
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isUserMenuOpen && (
                <div className="flex flex-col items-center gap-2 mt-2">
                  <Link to="/profile" className="hover:text-primary transition">
                    Actualizar información
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hover:text-primary transition"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="mt-2 border border-primary px-4 py-2 rounded-full font-bold hover:bg-orange-100 transition"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      )}

      {/* Modales */}
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
