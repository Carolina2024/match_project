import React from "react";

// OPCIÓN INICIO DE PERFIL ADMINISTRADOR
const AdminHome = ({ /* stats */ }) => {
  return (
    <div className="w-3/4 p-10 bg-white">
      <h1 className="text-2xl font-bold mb-8">Inicio</h1>
      <div className="flex space-x-0 gap-4">
        <div className="border w-32 h-32 flex flex-col justify-center items-center">
          <p className="text-sm font-bold">Mascotas</p>
          <p className="text-sm font-bold">Publicadas</p>
         {/*  <p className="text-3xl font-bold">{stats.publicadas}</p> */}
        </div>
        <div className="border w-32 h-32 flex flex-col justify-center items-center">
          <p className="text-sm font-bold">En</p>
          <p className="text-sm font-bold">adopción</p>
        {/*   <p className="text-3xl font-bold">{stats.enAdopcion}</p> */}
        </div>
        <div className="border w-32 h-32 flex flex-col justify-center items-center">
          <p className="text-sm font-bold">Usuarios</p>
          <p className="text-sm font-bold">registrados</p>
        {/*   <p className="text-3xl font-bold">{stats.usuarios}</p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
