import { useEffect, useState } from "react";
import PetList from "../components/PetList";
import UserProfiles from "../components/UserProfiles";
import AdoptionApllication from "../components/AdoptionApllication";
import Pets from "../components/Pets";
import { getAllPets } from "../api/petService";
import Sidebar from "../components/Sidebar";
import { useOutletContext } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { activeView, setActiveView } = useOutletContext();
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const viewTitles = {
    Mascotas: (
      <span className="font-raleway font-bold text-[20px] text-tertiary mr-2">
        Gestiona las mascotas
      </span>
    ),
    Solicitudes: (
      <span className="font-raleway font-bold text-[20px] text-tertiary">
        Solicitudes de adoptantes
      </span>
    ),
    Adoptantes: (
      <span className="font-raleway font-bold text-[20px] text-tertiary">
        Registro de adoptantes
      </span>
    ),
  };

  const currentTitle = viewTitles[activeView];

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
    const navigate = useNavigate();

    switch (activeView) {
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
        navigate("/Mascotas");
        return null;
    }
  };

  return (
    <div>
      <Sidebar
        onSelect={setActiveView}
        activeView={activeView}
        isVisible={isSidebarVisible}
        setIsVisible={setIsSidebarVisible}
      />

      <div>
        <div>
          <AdminNavbar
            sectionTitle={currentTitle}
            isSidebarVisible={isSidebarVisible}
            setSidebarVisible={setIsSidebarVisible}
          />
        </div>

        <div
          className={`w-full flex-1 min-h-screen transition-all duration-300
    ${isSidebarVisible ? "sm:ml-[0px]" : "sm:ml-0"}
    absolute sm:relative right-0`}
          style={{
            top: "90px",
            height: "calc(100vh - 100px)",
          }}
        >
          <div>{renderView()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
