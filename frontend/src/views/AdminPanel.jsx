import { useState } from "react";
import Pets from "../componets/Pets";
import PetList from "../componets/PetList";

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
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-orange-400 p-6 text-white space-y-6">
        <h2 className="text-2xl font-bold mb-8">Administrador</h2>
        <button
          onClick={() => setActiveView("createPet")}
          className="block w-full text-left py-2 px-4 hover:bg-orange-500 rounded cursor-pointer"
        >
          Crear Mascota
        </button>
        <button
          onClick={() => setActiveView("listPets")}
          className="block w-full text-left py-2 px-4 hover:bg-orange-500 rounded cursor-pointer"
        >
          Listado de Mascotas
        </button>
      </div>

      <div className="w-3/4 p-10 bg-gray-100 overflow-auto">{renderView()}</div>
    </div>
  );
};

export default AdminPanel;
