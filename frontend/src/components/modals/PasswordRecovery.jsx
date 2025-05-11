import { useState } from 'react';

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

export default PasswordRecovery;