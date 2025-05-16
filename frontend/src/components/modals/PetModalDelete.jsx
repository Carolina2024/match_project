const PetModalDelete = ({ isOpen, onClose, onConfirm, pet }) => {
  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10"
      ></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full sm:w-[500px] mx-4 z-20">
        <h2 className="text-lg font-bold font-Monserrat Alternates text-[20px] text-[#595146] mb-4 text-center">
          ¿Estás seguro de eliminar a {pet.name}?
        </h2>
        <h3 className="text-center text-gray-600 font-raleway text-[14px] text-[#767575]">
          Esta acción no se puede deshacer. Esta acción eliminara
        </h3>
        <h3 className="text-center text-gray-600">
          permanentemente a {pet.name} del registro
        </h3>
        <div className="font-raleway text-[16px] text-[#595146] font-bold flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-36 px-4 py-2 bg-white rounded-lg hover:bg-gray-400 border-b-4 border-2 border-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-36 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetModalDelete;
