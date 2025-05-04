import { FaPaw } from "react-icons/fa";

const Contacto = () => {
  return (
    <section className="max-w-3xl mx-auto flex flex-col items-center pb-22 pt-16 px-4 mt-14 bg-[#F9F9F9] rounded-4xl">
      {/* Título */}
      <h2 className="text-primary text-3xl md:text-4xl font-bold font-secundary mb-8">
        Contacto
      </h2>

      {/* Card del formulario */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg/20 p-8">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6 text-primary font-semibold font-secundary">
          <FaPaw className="text-2xl" />
          <span>¡Escríbenos!</span>
        </div>

        {/* Formulario */}
        <form className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-lg font-normal text-[#0C0C0C] mb-1">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full px-4 py-2 border border-primary rounded-full placeholder-[#CBCBCB] font-medium text-sm outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-normal text-[#0C0C0C] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Tu e-mail"
              className="w-full px-4 py-2 border border-primary rounded-full placeholder-[#CBCBCB] font-medium text-sm outline-none"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-lg font-normal text-[#0C0C0C] mb-1">
              Número de teléfono
            </label>
            <select className="w-full px-4 py-2 border border-primary rounded-full placeholder-[#CBCBCB] font-medium text-sm outline-none">
              <option>Ch +56 ...</option>
              <option>Ar +54 ...</option>
              <option>Pe +51 ...</option>
            </select>
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-lg font-normal text-[#0C0C0C] mb-1">
              Mensaje
            </label>
            <textarea
              rows="10"
              placeholder="Escribe aquí tu mensaje"
              className="w-full px-4 py-2 border border-primary rounded-3xl placeholder-[#CBCBCB] font-medium text-sm outline-none resize-none"
            ></textarea>
          </div>

          {/* Botón enviar */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-primary text-white font-bold text-base my-2 px-14 py-2 rounded-full hover:bg-tertiary transition cursor-pointer"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contacto;
