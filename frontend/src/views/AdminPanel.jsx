import { useEffect, useState } from "react";

import PetList from "../components/PetList";
import UserProfiles from "../components/UserProfiles";
import AdoptionApllication from "../components/AdoptionApllication";
import Sidebar from "../components/Sidebar";
import AdminHome from "../components/AdminHome";
import Pets from "../components/Pets";
import { getAllPets } from "../api/petService";

//VISTA DE PERFIL ADMINISTRADOR

const AdminPanel = () => {
  const [activeView, setActiveView] = useState("INICIO");
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getAllPets();
        setPets(response.items || []); // asegúrate que usas `.items`
      } catch (error) {
        console.error("Error al cargar mascotas:", error.message);
      }
    };
  
    fetchPets();
  }, []);
  
  

  console.log(activeView);



  const handleDeletePet = (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta mascota?");
    if (confirm) {
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    }
  };
  

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
  handleDeletePet={handleDeletePet}
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
            handleSavePet={handleSavePet}
          />
        );

      case "createPet":
        return (
          <Pets
            setActiveView={setActiveView}
            setPets={setPets}
            editingPet={null}
            handleSavePet={handleSavePet}
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
