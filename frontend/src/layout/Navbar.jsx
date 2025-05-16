import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, ChevronDown, User } from "lucide-react";
import logo from "../assets/logo.png";
import AuthModalsController from "../components/modals/AuthModalsController";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isRegisterbOpen, setRegisterbOpen] = useState(false);
  const [isRecoverOpen, setRecoverOpen] = useState(false);

  const [isInicioOpen, setIsInicioOpen] = useState(false);
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const inicioContainerRef = useRef(null);
  const nosotrosContainerRef = useRef(null);
  const userContainerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setIsInicioOpen(false);
        setIsNosotrosOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="flex md:hidden justify-between items-center px-4 py-2">
        <Link to="/">
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="w-12 h-12 rounded-full"
          />
        </Link>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="w-12 h-12 rounded-full bg-white cursor-pointer shadow-md flex items-center justify-center text-primary"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div
          ref={menuRef}
          onMouseLeave={() => {
            setMenuOpen(false);
            setIsInicioOpen(false);
            setIsNosotrosOpen(false);
            setIsUserMenuOpen(false);
          }}
          className="md:hidden fixed top-20 right-4 w-64 bg-white rounded-3xl shadow-xl z-50 py-4 px-3 text-sm text-[#0C0C0C]"
        >
          {isAuthenticated ? (
            <div>
              <button
                onClick={() => setIsInicioOpen((o) => !o)}
                className="w-full flex justify-between items-center px-2 py-2 font-medium text-[#0C0C0C] hover:text-primary"
              >
                Inicio
                <ChevronRight
                  size={16}
                  className={`cursor-pointer transition-transform ${
                    isInicioOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              {isInicioOpen && (
                <div
                  className="ml-4 mt-1 space-y-1"
                  onMouseLeave={() => setIsInicioOpen(false)}
                >
                  <Link to="/seguimiento" className="block hover:text-primary">
                    Seguimiento de tu match
                  </Link>
                  <Link to="/#historias" className="block hover:text-primary">
                    Historias de adopción
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/"
              className="block px-2 py-2 font-medium hover:text-primary"
            >
              Inicio
            </Link>
          )}

          <div>
            <button
              onClick={() => setIsNosotrosOpen((o) => !o)}
              className="w-full flex justify-between items-center px-2 py-2 font-medium text-[#0C0C0C] hover:text-primary"
            >
              Nosotros
              <ChevronRight
                size={16}
                className={`cursor-pointer transition-transform ${
                  isNosotrosOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            {isNosotrosOpen && (
              <div
                className="ml-4 mt-1 space-y-1"
                onMouseLeave={() => setIsNosotrosOpen(false)}
              >
                <Link
                  to="/Nosotros#historia"
                  className="block hover:text-primary"
                >
                  Historia del refugio
                </Link>
                <Link
                  to="/Nosotros#proposito"
                  className="block hover:text-primary"
                >
                  Nuestro propósito
                </Link>
                <Link
                  to="/Nosotros#colaborar"
                  className="block hover:text-primary"
                >
                  Cómo colaborar
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/CuidadosMascota"
            className="block px-2 py-2 font-medium hover:text-primary"
          >
            Cuidados de tu mascota
          </Link>
          <Link
            to="/Contacto"
            className="block px-2 py-2 font-medium hover:text-primary"
          >
            Contacto
          </Link>

          {isAuthenticated ? (
            <div>
              <button
                onClick={() => setIsUserMenuOpen((o) => !o)}
                className="w-full flex justify-between items-center px-2 py-2 font-bold hover:text-primary text-[#0C0C0C]"
              >
                <div className="flex items-center gap-2">
                  <User size={18} className="stroke-primary" />
                  <span>{user.fullname}</span>
                </div>
                <ChevronRight
                  size={16}
                  className={`cursor-pointer transition-transform ${
                    isUserMenuOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              {isUserMenuOpen && (
                <div
                  className="ml-4 mt-1 space-y-2"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <Link
                    to="/editprofile"
                    className="block hover:text-primary text-sm"
                  >
                    Actualizar información
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-red-500 hover:text-red-600 cursor-pointer text-sm font-medium"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                setLoginOpen(true);
              }}
              className="w-full mt-3 border cursor-pointer border-primary px-4 py-2 rounded-full font-bold hover:bg-orange-100 transition text-black"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      )}

      {/* Navbar Desktop */}
      <header className="hidden md:flex bg-white py-3 px-10 rounded-full shadow-md w-full max-w-7xl mx-auto my-6 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="w-[60px] h-[60px] rounded-full"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-lg font-normal text-black font-primary">
          {isAuthenticated ? (
            <div
              ref={inicioContainerRef}
              onMouseLeave={() => setIsInicioOpen(false)}
              className="relative"
            >
              <button
                onClick={() => setIsInicioOpen((o) => !o)}
                className="flex items-center hover:text-primary transition cursor-pointer"
              >
                <span>Inicio</span>
                <ChevronDown
                  size={16}
                  className={`ml-1 stroke-[#767575] cursor-pointer transition-transform ${
                    isInicioOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isInicioOpen && (
                <div className="absolute top-full left-0 mt-0 w-52 bg-white rounded-lg shadow-lg flex flex-col text-center z-50">
                  <Link
                    to="/seguimiento"
                    className="px-4 py-2 hover:text-primary transition text-sm font-tertiary font-normal"
                  >
                    Seguimiento de tu match
                  </Link>
                  <Link
                    to="/#historias"
                    className="px-4 py-2 hover:text-primary transition text-sm font-tertiary font-normal"
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

          <div
            ref={nosotrosContainerRef}
            onMouseLeave={() => setIsNosotrosOpen(false)}
            className="relative"
          >
            <button
              onClick={() => setIsNosotrosOpen((o) => !o)}
              className="flex items-center hover:text-primary transition cursor-pointer"
            >
              <span>Nosotros</span>
              <ChevronDown
                size={16}
                className={`ml-1 stroke-[#767575] cursor-pointer transition-transform ${
                  isNosotrosOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isNosotrosOpen && (
              <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-lg shadow-lg flex flex-col text-center z-50">
                <Link
                  to="/Nosotros#historia"
                  className="px-4 py-2 hover:text-primary transition text-sm font-tertiary font-normal"
                >
                  Historia del refugio
                </Link>
                <Link
                  to="/Nosotros#proposito"
                  className="px-4 py-2 hover:text-primary transition text-sm font-tertiary font-normal"
                >
                  Nuestro propósito
                </Link>
                <Link
                  to="/Nosotros#colaborar"
                  className="px-4 py-2 hover:text-primary transition text-sm font-tertiary font-normal"
                >
                  Cómo colaborar
                </Link>
              </div>
            )}
          </div>
          <span className="border-r border-2 h-10 border-primary" />

          <Link to="/CuidadosMascota" className="hover:text-primary transition">
            Cuidados de tu mascota
          </Link>
          <span className="border-r border-2 h-10 border-primary" />
          <Link to="/Contacto" className="hover:text-primary transition">
            Contacto
          </Link>
        </nav>

        <div className="hidden md:block">
          {isAuthenticated ? (
            <div
              ref={userContainerRef}
              onMouseLeave={() => setIsUserMenuOpen(false)}
              className="relative inline-block"
            >
              <button
                onClick={() => setIsUserMenuOpen((o) => !o)}
                className="flex items-center font-bold border border-primary px-4 py-2 rounded-full hover:bg-orange-50 transition"
              >
                <User size={20} className="mr-2 stroke-primary" />
                <span>{user.fullname}</span>
                <ChevronDown
                  size={16}
                  className={`ml-2 stroke-[#767575] cursor-pointer transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg flex flex-col text-center z-50">
                  <Link
                    to="/editprofile"
                    className="px-4 py-2 hover:text-primary transition text-sm font-tertiary font-normal"
                  >
                    Actualizar información
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 cursor-pointer hover:text-primary transition text-sm font-tertiary font-normal"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="ml-4 border border-primary cursor-pointer px-4 py-2 rounded-full font-bold hover:bg-orange-100 transition"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </header>
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
    </>
  );
};

export default Navbar;
