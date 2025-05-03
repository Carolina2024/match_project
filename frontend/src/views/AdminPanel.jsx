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

  console.log(activeView);

  const [editingPet, setEditingPet] = useState(null);

  const handleSavePet = (id) => {
    if (window.confirm("¿Estás seguro de guardar esta mascota?")) {
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
            handleSavePet={handleSavePet}
          />
        );

      case "SOLICITUDES DE ADOPCIÓN":
        return <AdoptionApllication />;

      case "USUARIOS":
        return <UserProfiles />;
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
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setActiveView} activeView={activeView} />

      <div className="w-3/4 p-10 overflow-y-auto">{renderView()}</div>
    </div>
  );
};

export default AdminPanel;
