const Pets = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-orange-400 mb-8">Crear Mascota</h2>
        <form className="space-y-6">
          <input 
            type="text" 
            placeholder="Nombre" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input 
            type="text" 
            placeholder="Raza" 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">Selecciona edad</option>
            <option value="cachorro">Cachorro</option>
            <option value="adulto">Adulto</option>
            <option value="senior">Senior</option>
          </select>
          <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">Selecciona especie</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="otro">Otro</option>
          </select>
          <select className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option value="">Selecciona tamaño</option>
            <option value="pequeno">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
          <div className="flex space-x-4 pt-6">
            <button 
              type="submit" 
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded w-full"
            >
              Guardar Mascota
            </button>
            <button 
              type="button" 
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded w-full"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default Pets;
  