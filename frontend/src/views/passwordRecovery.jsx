/*import { useState } from 'react';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleVolverAtras = () => {
    console.log("Botón 'Volver atrás' clickeado");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEnviar = (event) => {
    event.preventDefault();
    setEmailError(''); 

    if (!email) {
      setEmailError('Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
      <div className="relative bg-secundary p-16 rounded-3xl shadow-lg w-full max-w-lg text-center">
      
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <img
            src="src/assets/logo.png"
            alt="Logo Patas Pirque"
            className="w-30 h-30   rounded-full"
          />
        </div>

        <h2 className="mt-10 text-2xl font-bold mb-2 font-secundary text-[#595146]">
          Recuperar contraseña
        </h2>
        <p className="text-base font-medium text-[#767575] mb-10 ">
          Ingresa tu correo electrónico para restablecer tu contraseña.
        </p>

        <div>
          <label className="block text-lg mb-1 font-medium text-left text-[#595146]">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="admin@correo.com"
            className={`w-full px-4 py-2 bg-[#FFFFFF] text-[#767575] rounded-full border-2 border-primary font-normal outline-none text-lg`}
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="text-red-500 text-left text-sm mt-1">{emailError}</p>}
        </div>

        <form onSubmit={handleEnviar}>
          <div className="flex justify-between mt-12 gap-10">
            <button
              type="button"
              onClick={handleVolverAtras}
              className="flex-1 py-2 border-2 text-lg border-primary text-primary font-semibold rounded-full shadow-sm shadow-[#00000040]"
            >
              Volver atrás
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-primary text-lg text-[#FFFFFF] font-semibold rounded-full shadow-md shadow-[#00000040]"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;*/

//PAGINA DOS******************************************************************************

import { useState } from "react";

function PasswordRecovery() {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [errores, setErrores] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleCodigoChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const nuevoCodigo = [...codigo];
      nuevoCodigo[index] = value;
      setCodigo(nuevoCodigo);
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (codigo.some((digito) => digito === "")) {
      nuevosErrores.codigo = "Completa todos los dígitos del código";
    }
    if (nuevaContrasena.length < 8) {
      nuevosErrores.nuevaContrasena =
        "La contraseña debe tener al menos 8 caracteres";
    }
    if (nuevaContrasena !== confirmarContrasena) {
      nuevosErrores.confirmarContrasena = "Las contraseñas no coinciden";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const codigoCompleto = codigo.join("");
      console.log("Código:", codigoCompleto);
      console.log("Nueva contraseña:", nuevaContrasena);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-[4px] px-4 py-10 flex justify-center pt-24">
      <div className="relative bg-[#FCFCF7] w-full max-w-md min-h-screen rounded-3xl shadow-xl flex flex-col items-center border border-[#CBCBCB] px-6 pb-10 pt-24">
        {/* Logo flotante */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <img
            src="src/assets/logo.png"
            alt="Logo Patas Pirque"
            className="w-24 h-24 rounded-full object-containt drop-shadow-lg"
          />
        </div>

        <h2 className="text-lg font-bold mb-2 text-center font-secundary text-[#393939]">
          Recuperar contraseña
        </h2>
        <p className="text-sm text-[#767575] mb-6 text-center">
          Ingresa el código y define una nueva contraseña para tu cuenta.
        </p>

        <div className="mb-6 w-full">
          <label className="block text-sm font-semibold text-left text-[#595146] mb-2">
            Código de recuperación
          </label>
          <div className="flex justify-center gap-2">
            {codigo.map((valor, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={valor}
                onChange={(e) => handleCodigoChange(i, e.target.value)}
                className="w-10 h-12 border border-[#76757580] rounded text-center text-lg focus:outline-none focus:border-1 focus:border-primary"
              />
            ))}
          </div>
          <p className="text-xs text-[#A4A4A4] text-center mt-2">
            El código será validado automáticamente.
          </p>
          {errores.codigo && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {errores.codigo}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#595146] mb-2">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-primary rounded-full text-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              >
                👁️
              </span>
              {errores.nuevaContrasena && (
                <p className="text-red-500 text-sm mt-1">
                  {errores.nuevaContrasena}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#595146] mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-primary rounded-full text-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              >
                👁️
              </span>
              {errores.confirmarContrasena && (
                <p className="text-red-500 text-sm mt-1">
                  {errores.confirmarContrasena}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center mt-6">
            <button
              type="submit"
              className="w-auto px-7 text-lg py-2 bg-primary text-white font-semibold rounded-full shadow-md transition"
            >
              Restablecer contraseña
            </button>
            <button
              type="button"
              className="w-auto px-6 text-lg py-1 border-2 border-primary text-primary font-semibold rounded-full"
            >
              Volver atrás
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordRecovery;
