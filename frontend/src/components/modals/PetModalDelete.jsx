const PetModalDelete = ({ isOpen, onClose, onConfirm, pet }) => {
  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo desenfocado */}
      <div
        onClick={onClose} // Cerrar modal si se hace clic fuera
        className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10"
      ></div>

      {/* Cuadro del modal */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[500px] z-20">
        {/* Botón de cierre "X" */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          X
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">
          ¿Estás seguro de eliminar a {pet.name}?
        </h2>
        <h3 className="text-center text-gray-600">
          Esta acción no se puede deshacer. Esta acción eliminara
        </h3>
        <h3 className="text-center text-gray-600">
          permanentemente a {pet.name} del registro
        </h3>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="w-36 px-4 py-2 bg-white rounded-lg hover:bg-gray-400 border-b-4 border-2 border-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-36 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetModalDelete;
