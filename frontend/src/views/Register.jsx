
 import { useState } from 'react';  

 /*const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    birthDate: "",
    run: "",
    address: "",
    homeType: "",
    allowsPets: "",
    hasDogs: "",
    hasCats: "",
    hasChildren: "",
    petsExperience: "",
    isVaccinated: "",
    isSterilized: "",
    hoursAlone: "",
    petDestroy: "",
    hasVeterinarian: "",
    allowsVisit: "",
    isResponsibleAdoption: "",
  }); */

  const opciones = [
    "Departamento pequeño/mediano",
    "Departamento grande (con balcón) o casa chica (con patio y/o antejardín)",
    "Mediana/grande (con patio y/o antejardín)",
  ];


const Register = () => {
  const [selected, setSelected] = useState("");
  
   return (
    <div className="max-w-3xl mx-auto my-7 p-6 bg-white rounded-2xl shadow-md">
      <div className="flex justify-end">
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="text-center mb-6 mt-1">
        <img
          src="src/assets/logo.png"
          alt="Logo Patas Pirque"
          className="mx-auto mb-4 h-20 w-auto"
        />
        <p className="text-black text-lg mt-1 px-20">
          Queremos saber
          <strong>
            qué tipo de compañero estás buscando y qué te motiva a adoptar.
          </strong>
          Así podemos asegurarnos de que haya una buena conexión entre ustedes.
        </p>
        <h2 className="text-xl font-semibold text-primary mt-2">
          Crear Cuenta
        </h2>
      </div>
      <form className="space-y-6 px-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block font-medium">
              Nombre y Apellido
            </label>
            <input
              name="fullName"
              type="text"
              className="w-full rounded-3xl p-2  border-primary border-1 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="block font-medium">
              Fecha de nacimiento
            </label>
            <input
              name="birthDate"
              type="date"
              className="w-full  border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Correo Electrónico
            </label>
            <input
              name="email"
              type="email"
              className="w-full border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              className="w-full border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="run" className="block font-medium">
              Documento de identidad
            </label>
            <input
              name="run"
              type="text"
              className="w-full  border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="address" className="block font-medium">
              Dirección y comuna en la que vive
            </label>
            <input
              name="address"
              type="text"
              className="w-full  border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
      <label htmlFor="homeType" className="block font-medium mb-2">
        ¿Qué espacio tiene disponible para su nuevo compañero?
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {opciones.map((opcion) => (
          <button
            name="homeType"
            key={opcion}
            type="button"
            onClick={() => setSelected(opcion)}
            className={`px-4 py-1 rounded-2xl border-1 ${
              selected === opcion
                ? "bg-primary border-primary"
                : "border-primary hover:bg-primary"
            }`}
          >
            {opcion}
          </button>
        ))}
      </div>
    </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">
              ¿Su condominio o edificio permite mascotas?
            </label>
            <div className="flex gap-4 mt-1">
              <label
                htmlFor="allowsPetsYes"
                className="flex items-center border-1 border-primary rounded-3xl px-2 gap-5">
                Si
                <input
                  type="radio"
                  name="allowsPets"
                  value="true"
                  className="accent-black"
                />{" "}
              </label>
              <label
                htmlFor="allowsPetsNo"
                className="flex items-center border-1 border-primary rounded-3xl px-2 gap-5">
                No
                <input
                  type="radio"
                  name="allowsPets"
                  value="false"
                  className="accent-black"
                />{" "}
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium">
              ¿Tiene perros en su hogar?
            </label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
                Si
                <input type="radio" name="tenidoPerros" className="accent-black" />
              </label>
              <label className="flex items-center  border-primary border-1 rounded-3xl px-2 gap-5">
                No
                <input
                  type="radio"
                  name="tenidoPerros"
                  className="accent-black border rounded-3xl px-2 gap-5"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium">
              ¿Tiene gatos en su hogar?
            </label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              Si
                <input type="radio" name="tenidoGatos" className="accent-black" />
              </label>
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              No
                <input type="radio" name="tenidoGatos" className="accent-black" /> 
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium">¿Estan vacunadas?</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              Si
                <input type="radio" name="vacunadas" className="accent-black" />
              </label>
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              No
                <input type="radio" name="vacunadas" className="accent-black" /> 
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium">¿Estan castradas?</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              Si
                <input type="radio" name="castradas" className="accent-black" /> 
              </label>
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              No
                <input type="radio" name="castradas" className="accent-black" />
              </label>
            </div>
          </div>
          <div>
            <label className="block font-medium">
              ¿Tiene niños en su hogar?
            </label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              Si
                <input type="radio" name="tieneNiños" className="accent-black" /> 
              </label>
              <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              No
                <input type="radio" name="tieneNiños" className="accent-black" /> 
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">
              ¿Cuántas horas al día estará sola la mascota?
            </label>
            <input
              type="number"
              min="1"
              max="24"
              step="1"
              className="w-auto border-primary border-1 rounded-3xl p-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-medium">
              ¿Qué harías si la mascota rompe algo o tiene problemas de
              comportamiento?
            </label>
            <input type="text" className="w-full border-1 border-primary rounded-2xl p-2 h-18 focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-primary hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-3xl">
            Siguiente
          </button>
        </div>
      </form>
    </div> 
 
  //PAGINA DOS*****************


 /* const opcionesTamaño = ["Chico", "Mediano", "Grande"];
  const opcionesEdad = ["Joven", "Adulto", "Sin preferencia"];
  const opcionesCaracter = ["Cariñoso", "Independiente", "Protector", "Juguetón"];
  const opcionesPreferencia = ["Con niños", "Con perros", "Con gatos"];
  


  const Register = () => {
    const [tamañoSeleccionado, setTamañoSeleccionado] = useState("");
    const [edadSeleccionada, setEdadSeleccionada] = useState("");
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [seleccion, setSeleccion] = useState("");
    

    const toggleSeleccion = (opcion) => {
      setSeleccionadas((prev) =>
        prev.includes(opcion)
          ? prev.filter((item) => item !== opcion) // quitar si ya está
          : [...prev, opcion] // agregar si no está
      );
    };
   return (
    <form className="max-w-3xl mx-auto my-7 px-12 py-6 bg-white rounded-2xl shadow-md">
      <div className="flex justify-end px-7">
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="text-center mb-6 mt-1">
        <img
          src="src/assets/logo.png"
          alt="Logo Patas Pirque"
          className="mx-auto mb-4 h-20 w-auto"
        />
        <p className="text-black text-base mt-1 px-20">
          Queremos saber
          <strong>
            qué tipo de compañero estás buscando y qué te motiva a adoptar.
          </strong>
          Así podemos asegurarnos de que haya una buena conexión entre ustedes.
        </p>
        <h2 className="text-xl font-semibold text-primary mt-2">
          Crear Cuenta
        </h2>
      </div>

      <div className="px-7 text-base">
        <div className="mb-4">
          <label className="block mb-2">
            ¿Está dispuesto/a a llevarlo al veterinario cuando sea necesario?
            (vacunarlo y desparasitarlo regularmente, castrarlo o esterilizar)?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              Si
              <input
                type="radio"
                name="tenidoPerros"
                className="accent-black"
              />
            </label>
            <label className="flex items-center  border-primary border-1 rounded-3xl px-2 gap-5">
              No
              <input
                type="radio"
                name="tenidoPerros"
                className="accent-black border rounded-3xl px-2 gap-5"
              />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            ¿Está dispuesto/a a recibir una visita o llamado de seguimiento
            después de la adopción?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              Si
              <input
                type="radio"
                name="tenidoPerros"
                className="accent-black"
              />
            </label>
            <label className="flex items-center  border-primary border-1 rounded-3xl px-2 gap-5">
              No
              <input
                type="radio"
                name="tenidoPerros"
                className="accent-black border rounded-3xl px-2 gap-5"
              />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            ¿Está dispuesto/a a firmar un compromiso de adopción responsable? 
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center border-primary border-1 rounded-3xl px-2 gap-5">
              Si
              <input
                type="radio"
                name="tenidoPerros"
                className="accent-black"
              />
            </label>
            <label className="flex items-center  border-primary border-1 rounded-3xl px-2 gap-5">
              No
              <input
                type="radio"
                name="tenidoPerros"
                className="accent-black border rounded-3xl px-2 gap-5"
              />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            ¿Qué tipo de mascota está buscando? 
          </label>
          <div className="mb-2">
            <label className="block font-bold mb-1">
              Tamaño
            </label>
            <div className="flex space-x-2">
      {opcionesTamaño.map((tamaño) => (
        <button
          key={tamaño}
          type="button"
          onClick={() => setTamañoSeleccionado(tamaño)}
          className={`px-4 py-1 rounded-full border-1 ${
            tamañoSeleccionado === tamaño
              ? "bg-primary border-primary"
              : "border-primary hover:bg-primary"
          }`}
        >
          {tamaño}
        </button>
      ))}
    </div>
          </div>

          <div className="mb-2">
            <label className="block font-bold mb-1">
              Edad
            </label>
            <div className="flex space-x-2">
      {opcionesEdad.map((opcion) => (
        <button
          key={opcion}
          type="button"
          onClick={() => setEdadSeleccionada(opcion)}
          className={`px-4 py-1 rounded-full border-1 ${
            edadSeleccionada === opcion
              ? "bg-primary border-primary"
              : "border-primary hover:bg-primary"
          }`}
        >
          {opcion}
        </button>
      ))}
    </div>
          </div>

          <div className="mb-2">
            <label className="block font-bold mb-1">
              Carácter
            </label>
            <div className="flex flex-wrap gap-2">
      {opcionesCaracter.map((opcion) => (
        <button
          key={opcion}
          type="button"
          onClick={() => toggleSeleccion(opcion)}
          className={`px-4 py-1 rounded-full border-1 ${
            seleccionadas.includes(opcion)
              ? "bg-primary border-primary"
              : "border-primary hover:bg-primary"
          }`}
        >
          {opcion}
        </button>
      ))}
    </div>
          </div>

          <div className="mb-2">
            <label className="block font-bold mb-1">
              Compatibilidad
            </label>
            <div className="flex space-x-2">
      {opcionesPreferencia.map((opcion) => (
        <button
          key={opcion}
          type="button"
          onClick={() => setSeleccion(opcion)}
          className={`px-4 py-1 rounded-full border-1 ${
            seleccion === opcion
              ? "bg-primary border-primary"
              : "border-primary hover:bg-primary"
          }`}
        >
          {opcion}
        </button>
      ))}
    </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 accent-primary"
              name="termsAccepted"
            />
            <span className="ml-2 text-sm">
              Acepto los términos y condiciones
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-transparent hover:bg-gray-300 text-gray-700  py-1 px-10 border-1 border-primary rounded-3xl focus:outline-none focus:shadow-primary"
            type="button">
            Atrás
          </button>
          <button
            className="bg-primary hover:bg-gray-500  text-white font-semibold py-2 px-6 rounded-3xl"
            type="submit">
            Enviar
          </button>
        </div>
      </div>
    </form> */ 
  );
  };



export default Register;
