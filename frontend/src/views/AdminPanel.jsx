
import {  useEffect, useState } from "react";
import PetList from "../components/PetList";
import UserProfiles from "../components/UserProfiles";
import AdoptionApllication from "../components/AdoptionApllication";
import Pets from "../components/Pets";
import { getAllPets } from "../api/petService";
import Sidebar from "../components/Sidebar";
import { useOutletContext } from "react-router-dom";

const AdminPanel = () => {
  const { activeView, setActiveView } = useOutletContext();
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getAllPets();
        setPets(response.items || []);
      } catch (error) {
        console.error("Error al cargar mascotas:", error.message);
      }
    };

    fetchPets();
  }, []);

  const handleDeletePet = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
      setPets((prev) => prev.filter((pet) => pet.id !== id && pet._id !== id));
    }
  };

  const handleSavePet = (id) => {
    if (window.confirm("¿Estás seguro de guardar esta mascota?")) {
      setPets((prev) => prev.filter((pet) => pet.id !== id && pet._id !== id));
    }
  };

  const addPet = (newPet) => {
    setPets((prev) => [...prev, newPet]);
  };

  const renderView = () => {
    switch (activeView) {
     /*  case "Dashboard":
        return <AdminHome />; */
      case "Mascotas":
        return (
          <PetList
            pets={pets}
            setActiveView={setActiveView}
            setEditingPet={setEditingPet}
            handleSavePet={handleSavePet}
            handleDeletePet={handleDeletePet}
          />
        );
      case "Solicitudes":
        return <AdoptionApllication />;
      case "Adoptantes":
        return <UserProfiles />;
      case "editPet":
        return (
          <Pets
            setActiveView={setActiveView}
            setPets={setPets}
            editingPet={activeView === "editPet" ? editingPet : null}
            handleSavePet={handleSavePet}
            addPet={addPet}
          />
        );
      case "createPet":
        return (
          <Pets
            setActiveView={setActiveView}
            setPets={setPets}
            editingPet={activeView === "editPet" ? editingPet : null}
            handleSavePet={handleSavePet}
            addPet={addPet}
          />
        );
      default:
        return <div className="p-6">Vista no implementada</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSelect={setActiveView} activeView={activeView} />

      {/* Contenido principal */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isVisible ? "ml-64" : "ml-0"
        }`}
      >
        {/* Vista seleccionada */}
        <div className="p-6">{renderView()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
