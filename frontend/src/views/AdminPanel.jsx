
import {  useEffect, useState } from "react";
import PetList from "../components/PetList";
import UserProfiles from "../components/UserProfiles";
import AdoptionApllication from "../components/AdoptionApllication";
import Pets from "../components/Pets";
import { getAllPets } from "../api/petService";
import Sidebar from "../components/Sidebar";
import { useOutletContext } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const AdminPanel = () => {
  const { activeView, setActiveView } = useOutletContext();
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const viewTitles = {
    Mascotas: "Gestiona las mascotas",
    Solicitudes: "Solicitudes de adoptantes",
    Adoptantes: "Registros de adoptantes",
  };

  const currentTitle = viewTitles[activeView] || "Panel de administración";

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
      <Sidebar
        onSelect={setActiveView}
        activeView={activeView}
        isVisible={isSidebarVisible}
        setIsVisible={setIsSidebarVisible}
      />

    {/* Navbar fijo */}
    <AdminNavbar
        sectionTitle={currentTitle}
        isSidebarVisible={isSidebarVisible}
      />

      {/* Contenido principal */}
      <div
        className="absolute top-0 right-0 h-full overflow-y-auto transition-all duration-300 mt-30"
        style={{ left: isSidebarVisible ? "180px" : "0px" }}
      >
        <div className="p-6">{renderView()}</div>
      </div>
    </div>
  );
};

export default AdminPanel;
