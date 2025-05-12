import { useState, useRef, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import logo from "../assets/logo.png";
import AuthModalsController from "../components/modals/AuthModalsController";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  //Context
  const { user, isAuthenticated, logout } = useAuth(); 

const navigate = useNavigate();

  // Menú móvil
  const [menuOpen, setMenuOpen] = useState(false);

  // Modales
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isRegisterbOpen, setRegisterbOpen] = useState(false);
  const [isRecoverOpen, setRecoverOpen] = useState(false);

  // Dropdowns (click-to-toggle)
  const [isInicioOpen, setIsInicioOpen] = useState(false);
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Refs para detectar clic afuera
  const inicioRef = useRef(null);
  const nosotrosRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (inicioRef.current && !inicioRef.current.contains(e.target)) {
        setIsInicioOpen(false);
      }
      if (nosotrosRef.current && !nosotrosRef.current.contains(e.target)) {
        setIsNosotrosOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
  logout();
  navigate("/");
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
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navegación desktop */}
      <nav className="hidden md:flex items-center gap-8 text-lg font-normal text-black font-primary">
        {/* Inicio */}
        {isAuthenticated ? (
          <div ref={inicioRef} className="relative">
            <button
              onClick={() => setIsInicioOpen((o) => !o)}
              className="flex items-center hover:text-primary transition"
            >
              <span>Inicio</span>
              <ChevronDown
                size={16}
                className="ml-1 stroke-[#767575] cursor-pointer"
              />
            </button>
            {isInicioOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-lg flex flex-col text-center z-50">
                <Link
                  to="/#seguimiento"
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

        {/* Nosotros */}
        <div ref={nosotrosRef} className="relative">
          <button
            onClick={() => setIsNosotrosOpen((o) => !o)}
            className="flex items-center hover:text-primary transition"
          >
            <span>Nosotros</span>
            <ChevronDown
              size={16}
              className="ml-1 stroke-[#767575] cursor-pointer"
            />
          </button>
          {isNosotrosOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg flex flex-col text-center z-50">
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

        {/* Otras secciones */}
        <Link to="/CuidadosMascota" className="hover:text-primary transition">
          Cuidados de tu mascota
        </Link>
        <span className="border-r border-2 h-10 border-primary" />
        <Link to="/Contacto" className="hover:text-primary transition">
          Contacto
        </Link>
      </nav>

      {/* Menú usuario desktop */}
      <div className="hidden md:block">
        {isAuthenticated ? (
          <div ref={userMenuRef} className="relative inline-block">
            <button
              onClick={() => setIsUserMenuOpen((o) => !o)}
              className="flex items-center font-bold border border-primary px-4 py-2 rounded-full hover:bg-orange-50 transition"
            >
              <User size={20} className="mr-2 stroke-primary" />
              <span>{user.fullname}</span>
              <ChevronDown
                size={16}
                className="ml-2 stroke-[#767575] cursor-pointer"
              />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg flex flex-col text-center z-50">
                <Link
                  to="/profile"
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

      {/* Menú móvil */}
      {menuOpen && (
        <div className="absolute top-24 left-6 right-6 bg-white border border-primary rounded-2xl p-6 shadow-md flex flex-col items-center gap-4 z-50 md:hidden">
          {/* Inicio móvil */}
          {isAuthenticated ? (
            <div ref={inicioRef} className="w-full">
              <button
                onClick={() => setIsInicioOpen((o) => !o)}
                className="w-full flex items-center justify-center hover:text-primary transition"
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
            </div>
          ) : (
            <Link to="/" className="hover:text-primary transition">
              Inicio
            </Link>
          )}

          {/* Nosotros móvil */}
          <div ref={nosotrosRef} className="w-full">
            <button
              onClick={() => setIsNosotrosOpen((o) => !o)}
              className="w-full flex items-center justify-center hover:text-primary transition"
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
          </div>

          {/* Otras vistas */}
          <Link to="/CuidadosMascota" className="hover:text-primary transition">
            Cuidados de tu mascota
          </Link>
          <Link to="/Contacto" className="hover:text-primary transition">
            Contacto
          </Link>

          {/* Usuario móvil */}
          <div ref={userMenuRef} className="w-full">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setIsUserMenuOpen((o) => !o)}
                  className="w-full flex items-center justify-center hover:text-primary transition"
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
                    <Link
                      to="/profile"
                      className="hover:text-primary transition"
                    >
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
        isRecoverOpen={isRecoverOpen}
        setRecoverOpen={setRecoverOpen}
      />
    </header>
  );
};

export default Navbar;
