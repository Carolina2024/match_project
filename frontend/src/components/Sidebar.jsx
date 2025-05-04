import React from "react";

// BARRA LATERAL
const Sidebar = ({ onSelect, activeView }) => {
  const items = ["INICIO", "MASCOTAS", "SOLICITUDES DE ADOPCIÓN", "USUARIOS"];

  return (
    <div className="w-1/4 p-4 space-y-2">
      <h2 className="text-center font-bold text-xl bg-gray-300 py-4 mb-2">
        Administrador
      </h2>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`block w-full text-left px-4 py-2 border rounded font-bold text-xs
            ${activeView === item ? "bg-gray-300" : "hover:bg-gray-200"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
