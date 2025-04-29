import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-4xl font-bold">Home</h1>
      <Link
        to="/Admin"
        className="bg-orange-400 text-white px-6 py-3 rounded hover:bg-orange-500"
      >
        Ir al Panel de Administrador
      </Link>
    </div>
  );
}

export default Home;
