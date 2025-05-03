import { useState } from "react";
import Pets from "../componets/Pets";
import PetList from "../componets/PetList";
import UserProfiles from "../componets/UserProfiles";
import AdoptionApllication from "../componets/AdoptionApllication";


const AdminPanel = () => {
  const [activeView, setActiveView] = useState(null);
  const [pets, setPets] = useState([
    {
      id: 1,
      nombre: "Firulais",
      raza: "Labrador",
      edad: "Adulto",
      especie: "Perro",
      tamano: "Grande",
    },
    {
      id: 2,
      nombre: "Michi",
      raza: "Siames",
      edad: "Cachorro",
      especie: "Gato",
      tamano: "Pequeño",
    },
    {
      id: 3,
      nombre: "Rex",
      raza: "Pastor Alemán",
      edad: "Adulto",
      especie: "Perro",
      tamano: "Grande",
    },
    {
      id: 4,
      nombre: "Chileno",
      raza: "Sin raza",
      edad: "Adulto",
      especie: "Perro",
      tamano: "Grande",
    },
  ]);

  const [users] = useState([
    { id: 1, name: "Vanessa Montero", email: "vane@example.com", role: "Adoptante" },
    {
      id: 2,
      name: "Carlos Riquelme",
      email: "admin@example.com",
      role: "Administrador",
    },
    { id: 3, name: "Francisca Merino", email: "fca@example.com", role: "Adoptante" },
  ]);

  const [editingPet, setEditingPet] = useState(null);

  const handleDeletePet = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    }
  };

  const renderView = () => {
    switch (activeView) {
      case "createPet":
        return <Pets setActiveView={setActiveView} setPets={setPets} />;
      case "listPets":
        return (
          <PetList
            pets={pets}
            setActiveView={setActiveView}
            setEditingPet={setEditingPet}
            handleDeletePet={handleDeletePet}
          />
        );
      case "editPet":
        return (
          <Pets
            setActiveView={setActiveView}
            setPets={setPets}
            editingPet={editingPet}
          />
        );
      case "userProfiles":
        return <UserProfiles users={users} />;
      default:
        return null;

        case "AdoptionApllication":
          return <AdoptionApllication />;

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

      <div className="w-3/4 p-10 bg-gray-100 overflow-auto">{renderView()}</div>
    </div>
  );
};

export default AdminPanel;
