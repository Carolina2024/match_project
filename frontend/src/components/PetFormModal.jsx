import { useEffect, useState } from "react";

const PetFormModal = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    

useEffect(() => {
  if (isOpen) {
    setIsVisible(true);
  } else {
    const timeout = setTimeout(() => setIsVisible(false), 700); // espera para que se vea la animación
    return () => clearTimeout(timeout);
  }
}, [isOpen]);



  const [formData, setFormData] = useState({
    nombre: "",
    fechaIngreso: "",
    especie: "",
    raza: "",
    edad: "",
    sexo: "",
    nivelActividad: "",
    peso: "",
    tamano: "",
    estado: "",
    rasgos: [],
    entrega: [],
    historia: "",
    fotos: [null, null, null],
  });

  const rasgosOpciones = [
    "Cariñoso", "Independiente", "Juguetón", "Protector",
    "Amigable con niños", "Amigable con mascotas",
    "Amigable con otras personas", "Me gusta pasear",
    "Me gustan espacios abiertos"
  ];

  const entregaOpciones = ["Desparasitado", "Con chip", "Vacuando", "Esterilizado"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleOption = (listName, option) => {
    setFormData((prev) => {
      const updatedList = prev[listName].includes(option)
        ? prev[listName].filter((item) => item !== option)
        : [...prev[listName], option];
      return { ...prev, [listName]: updatedList };
    });
  };

  const handleFileChange = (index, file) => {
    const updatedFotos = [...formData.fotos];
    updatedFotos[index] = file;
    setFormData({ ...formData, fotos: updatedFotos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado", formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div
  className={`relative w-full max-w-lg bg-white h-full shadow-xl z-50 p-8 overflow-y-auto rounded-xl transform transition-all duration-700 ease-in-out ${
    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
  }`}
>

        <h2 className="text-center font-bold mb-2">Nueva mascota</h2>
        <p className="text-sm mb-6">Completa el formulario para agregar una nueva mascota al refugio.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Mascota", name: "nombre", type: "text", placeholder: "Nombre de la mascota" },
              { label: "Fecha de ingreso", name: "fechaIngreso", type: "date" },
              { label: "Especie", name: "especie", type: "select", options: ["Perro", "Gato"] },
              { label: "Raza", name: "raza", type: "text", placeholder: "Raza de la mascota" },
              { label: "Edad", name: "edad", type: "select", options: ["Cachorro", "Adulto", "Senior"] },
              { label: "Sexo", name: "sexo", type: "select", options: ["Macho", "Hembra"] },
              { label: "Nivel actividad", name: "nivelActividad", type: "select", options: ["Alto", "Medio", "Bajo"] },
              { label: "Peso", name: "peso", type: "text", placeholder: "Añadir peso" },
              { label: "Tamaño", name: "tamano", type: "select", options: ["Pequeño", "Mediano", "Grande"] },
              { label: "Estado", name: "estado", type: "select", options: ["Adopción", "En tratamiento", "Observación"] },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label htmlFor={field.name} className="text-sm font-medium mb-1">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Selecciona</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder || ""}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                )}
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Rasgos de la mascota (Elegir varias opciones):</p>
            <div className="grid grid-cols-2 gap-2">
              {rasgosOpciones.map((rasgo) => (
                <button
                  key={rasgo}
                  type="button"
                  onClick={() => toggleOption("rasgos", rasgo)}
                  className={`w-full text-left px-4 py-2 rounded border ${
                    formData.rasgos.includes(rasgo) ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {rasgo}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Entrega de mascota (Elegir varias opciones):</p>
            <div className="grid grid-cols-2 gap-2">
              {entregaOpciones.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleOption("entrega", item)}
                  className={`w-full text-left px-4 py-2 rounded border ${
                    formData.entrega.includes(item) ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Agregar 3 fotos de la mascota</p>
            <div className="grid grid-cols-3 gap-4">
              {formData.fotos.map((_, index) => (
                <label key={index} className="border p-4 text-center rounded cursor-pointer hover:bg-gray-100">
                  Subir foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Historia de la mascota</label>
            <textarea
              name="historia"
              value={formData.historia}
              onChange={handleChange}
              rows="4"
              className="border p-2 rounded w-full"
              placeholder="Escribe la historia de la mascota"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded hover:bg-gray-100">Cancelar</button>
            <button type="submit" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetFormModal;
