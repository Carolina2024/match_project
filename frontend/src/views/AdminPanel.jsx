import { useState } from "react";
import Pets from "../componets/Pets";
import PetList from "../componets/PetList";
import UserProfiles from "../componets/UserProfiles";
import AdoptionApllication from "../componets/AdoptionApllication";
import Sidebar from "../componets/Sidebar";
import AdminHome from "../componets/AdminHome";

//VISTA DE PERFIL ADMINISTRADOR
const AdminPanel = () => {
  const [activeView, setActiveView] = useState("INICIO");
  const [pets, setPets] = useState([
    {
      id: 1,
      nombre: "Firulais",
      raza: "Labrador",
      edad: "Adulto",
      especie: "Perro",
      tamano: "Grande",
      estado: "en adopción",
    },
    {
      id: 2,
      nombre: "Michi",
      raza: "Siames",
      edad: "Cachorro",
      especie: "Gato",
      tamano: "Pequeño",
      estado: "en adopción",
    },
    {
      id: 3,
      nombre: "Rex",
      raza: "Pastor Alemán",
      edad: "Adulto",
      especie: "Perro",
      tamano: "Grande",
      estado: "en adopción",
    },
    {
      id: 4,
      nombre: "Chileno",
      raza: "Sin raza",
      edad: "Adulto",
      especie: "Perro",
      tamano: "Grande",
      estado: "en adopción",
    },
  ]);

  const [users] = useState([
    {
      id: 1,
      name: "Vanessa Montero",
      email: "vane@example.com",
      role: "Adoptante",
    },
    {
      id: 2,
      name: "Carlos Riquelme",
      email: "admin@example.com",
      role: "Administrador",
    },
    {
      id: 3,
      name: "Francisca Merino",
      email: "fca@example.com",
      role: "Adoptante",
    },
  ]);

  console.log(activeView);

  const [editingPet, setEditingPet] = useState(null);

  const handleDeletePet = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    }
  };

  /* const stats = {
    publicadas: pets.length,
    enAdopcion:
      pets.filter((p) => p.estado && p.estado === "en adopción").length || 3,
    usuarios: users.length,
  }; */

  const renderView = () => {
    switch (activeView) {
      case "INICIO":
        return <AdminHome /* stats={stats} */ />;
      case "MASCOTAS":
        return (
          <PetList
            pets={pets}
            setActiveView={setActiveView}
            setEditingPet={setEditingPet}
            handleDeletePet={handleDeletePet}
          />
        );

      /*
      case "userProfiles":
        return <UserProfiles users={users} />;
      default:
        return null; */

      case "SOLICITUDES DE ADOPCIÓN":
        return <div className="w-3/4 p-10">Solicitudes (pendiente)</div>;
      case "USUARIOS":
        return <UserProfiles users={users} />;
      case "editPet":
        return (
          <Pets
            setActiveView={setActiveView}
            setPets={setPets}
            editingPet={editingPet}
          />
        );
      case "createPet":
        return (
          <Pets
            setActiveView={setActiveView}
            setPets={setPets}
            editingPet={null}
          />
        );
      default:
          return <div className="w-3/4 p-10">Vista no implementada</div>;

        case "AdoptionApllication":
          return <AdoptionApllication />
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-[var(--color-primary)] p-6 text-white space-y-6">
        <h2 className="text-2xl font-bold mb-8">Administrador</h2>

        <button
          onClick={() => setActiveView("listPets")}
          className="block w-full text-left py-2 px-4 hover:bg-orange-500 rounded cursor-pointer"
        >
          Mascotas
        </button>
        <button
          onClick={() => setActiveView("userProfiles")}
          className="block w-full text-left py-2 px-4 hover:bg-orange-500 rounded cursor-pointer"
        >
          Listado de Perfiles
        </button>
        <button
          onClick={() => setActiveView("AdoptionApllication")}
          className="block w-full text-left py-2 px-4 hover:bg-orange-500 rounded cursor-pointer"
        >
          Solicitudes de Adopción
        </button>
      </div>
      <Sidebar onSelect={setActiveView} activeView={activeView} />

      <div className="w-3/4 p-10 overflow-y-auto">{renderView()}</div>
    </div>
  );
};

export default AdminPanel;
