import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white py-3 px-6 rounded-full shadow-md w-full max-w-7xl mx-auto my-10 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="src/assets/logo.png"
          alt="Logo Patas Pirque"
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
      </div>

      {/* Navegación */}
      <nav className="flex items-center space-x-6 text-base font-normal text-black font-primary gap-8">
        <Link href="/" className="hover:text-primary transition">
          Inicio
        </Link>
        <span className="border-r border-2  h-10 border-primary" />
        <Link href="/nosotros" className="hover:text-primary transition">
          Nosotros
        </Link>
        <span className="border-r border-2  h-10 border-primary" />
        <Link
          href="/cuidados"
          className="hover:text-primary transition text-center w-[120px]"
        >
          Cuidados de tu mascota
        </Link>
        <span className="border-r border-2  h-10 border-primary" />
        <Link href="contacto" className="hover:text-primary transition">
          Contacto
        </Link>
        <span className="border-r border-2  h-10 border-primary" />
      </nav>

      {/* Botón de sesión */}
      <button className="ml-4 border border-primary text-black font-semibold px-4 py-2 rounded-full hover:bg-orange-100 transition cursor-pointer">
        Iniciar sesión
      </button>
    </header>
  );
};

export default Navbar;
