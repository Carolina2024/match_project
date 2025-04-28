import { useState } from "react";


import CreateCaretaker from "../componets/CreateCaretaker";
import Pets from "../componets/Pets";

const AdminPanel = () => {
  const [activeView, setActiveView] = useState("createCaretaker"); 

  const renderView = () => {
    switch (activeView) {
      case "createCaretaker":
        return <CreateCaretaker />;
      case "createPet":
        return <Pets />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
     

      <div className="w-1/3 h-3/4 bg-orange-400 p-6 text-white space-y-6">
        <h2 className="text-2xl font-bold mb-8">Administrador</h2>
        <button 
          onClick={() => setActiveView("createCaretaker")} 
          className="block w-full text-left py-2 px-4 hover:bg-orange-500 rounded cursor-pointer"
        >
          Crear Cuidador
        </button>
        <button 
          onClick={() => setActiveView("createPet")} 
          className="block w-full text-left py-2 px-4 hover:bg-orange-500 rounded cursor-pointer"
        >
          Crear Mascota
        </button>
      </div>

      <div className="w-3/4 p-10 bg-gray-100 overflow-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default AdminPanel;
