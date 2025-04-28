const CreateCaretaker = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-orange-400 mb-8 ">Crear Cuidador</h2>
        <form className="space-y-6">
          <input 
            type="text" 
            placeholder="Nombre completo" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input 
            type="text" 
            placeholder="Teléfono" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex space-x-4 pt-6">
            <button 
              type="submit" 
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded w-full cursor-pointer"
            >
              Crear Cuidador
            </button>
            <button 
              type="button" 
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded w-full cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default CreateCaretaker;
  