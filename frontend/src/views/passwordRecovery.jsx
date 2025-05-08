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

import  { useState } from 'react';
//import { useNavigate } from "react-router-dom";

function PasswordRecovery() {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errores, setErrores] = useState({});

  const handleCodigoChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const nuevoCodigo = [...codigo];
      nuevoCodigo[index] = value;
      setCodigo(nuevoCodigo);
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (codigo.some((digito) => digito === '')) {
      nuevosErrores.codigo = 'Completa todos los dígitos del código';
    }

    if (nuevaContrasena.length < 6) {
      nuevosErrores.nuevaContrasena = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (nuevaContrasena !== confirmarContrasena) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const codigoCompleto = codigo.join('');
      console.log('Código:', codigoCompleto);
      console.log('Nueva contraseña:', nuevaContrasena);
      
    }

   // const navigate = useNavigate();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="relative bg-secundary p-8 rounded-3xl shadow-lg w-full max-w-md text-center">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <img
            src="src/assets/logo.png"
            alt="Logo Patas Pirque"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <h2 className="mt-12 text-2xl font-bold font-secundary mb-2 text-[#595146]">
          Recuperar contraseña
        </h2>
        <p className="text-base text-[#767575] mb-6">
          Ingresa tu correo electrónico para restablecer tu contraseña.
        </p>

        <div className="mb-6 ml-2">
          <label className="block text-base font-semibold text-left text-[#595146] mb-2">
            Código de recuperación
          </label>
          <div className="flex gap-3">
            {codigo.map((valor, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={valor}
                onChange={(e) => handleCodigoChange(i, e.target.value)}
                className="w-12 h-14 border border-[#76757580] rounded text-center text-lg"
              />
            ))}
          </div>
          {errores.codigo && <p className="text-red-500 text-sm mt-1">{errores.codigo}</p>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base font-semibold text-[#595146] mb-2 text-left">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="w-full px-4 py-2 bg-[#FFFFFFBD] border border-primary rounded-3xl text-sm"
              />
              {errores.nuevaContrasena && <p className="text-red-500 text-sm mt-1">{errores.nuevaContrasena}</p>}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-base font-semibold text-[#595146] mb-2 text-left">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                className="w-full px-4 py-2 border bg-[#FFFFFFBD] border-primary rounded-3xl text-sm"
              />
              {errores.confirmarContrasena && <p className="text-red-500 text-sm mt-1">{errores.confirmarContrasena}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="py-2 px-6 bg-primary text-[#FFFFFF] text-base font-semibold rounded-full shadow-[#00000040] shadow-md">
            Restablecer contraseña
          </button>
        </form>

        <button
          type="button"
          //onClick={() => navigate(-1)}
          className="mt-4 border-2 rounded-full py-2 px-6 font-semibold text-base text-primary">
          Volver atrás
        </button>
      </div>
    </div>
  );
}

export default PasswordRecovery;

