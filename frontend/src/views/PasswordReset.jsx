import { useState } from "react";
import AuthModalsController from "../components/modals/AuthModalsController";

function PasswordReset(isOpen) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modales
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isRegisterbOpen, setRegisterbOpen] = useState(false);
  const [isRecoverOpen, setRecoverOpen] = useState(false);

  const handleCodigoChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const validarFormulario = () => {
    const newErrors = {};
    if (code.some((digito) => digito === "")) {
      newErrors.code = "Completa todos los dígitos del código";
    }
    if (newPassword.length < 8) {
      newErrors.newPassword = "La contraseña debe tener al menos 8 caracteres";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const completeCode = code.join("");
      console.log("Código:", completeCode);
      console.log("Nueva contraseña:", newPassword);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-10 flex justify-center">
      <div className="relative bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl min-h-screen rounded-3xl shadow-xl flex flex-col items-center border border-[#CBCBCB] px-6 sm:px-10 md:px-16 pt-20 pb-10">
        {/* Logo flotante */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <img
            src="src/assets/logo.png"
            alt="Logo Patas Pirque"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-fill drop-shadow-lg"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-bold mb-2 mt-3 text-center font-secundary text-tertiary">
          Recuperar contraseña
        </h2>
        <p className="text-base sm:text-base px-6 sm:px-10 md:px-16 font-normal text-[#767575] mb-6 text-center">
          Ingresa tu correo electrónico para restablecer tu contraseña.
        </p>

        {/* Código de recuperación */}
        <div className="mb-6 w-full">
          <label className="block text-base font-semibold mb-2 text-tertiary px-6 sm:px-10 md:px-16">
            Código de recuperación
          </label>
          <div className="flex justify-center gap-2 sm:gap-4">
            {code.map((valor, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={valor}
                onChange={(e) => handleCodigoChange(i, e.target.value)}
                className="w-10  sm:w-12 h-12 mr-2 sm:h-14 border border-[#76757580] rounded-xl text-center text-lg focus:outline-none focus:border-primary"
              />
            ))}
          </div>
          <p className="text-base sm:text-sm text-[#76757580] text-center mt-3">
            El código será validado automáticamente.
          </p>
          {errors.code && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {errors.code}
            </p>
          )}
        </div>

        {/* Formulario de contraseña */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Nueva contraseña */}
          <div>
            <label className="block text-base font-semibold mb-2 text-tertiary px-6 sm:px-10 md:px-16">
              Nueva contraseña
            </label>
            <div className="block relative w-full sm:w-96 mx-auto">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className=" w-full px-8 py-2 bg-white border border-primary rounded-full text-sm focus:outline-none focus:border-2 focus:border-primary"
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-primary cursor-pointer"
              >
                {showNewPassword ? (
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.92 7.6C17.9 2.91 14.1 0 10 0C5.90001 0 2.10001 2.91 0.0800058 7.6C0.0249425 7.72617 -0.003479 7.86234 -0.003479 8C-0.003479 8.13766 0.0249425 8.27383 0.0800058 8.4C2.10001 13.09 5.90001 16 10 16C14.1 16 17.9 13.09 19.92 8.4C19.9751 8.27383 20.0035 8.13766 20.0035 8C20.0035 7.86234 19.9751 7.72617 19.92 7.6ZM10 14C6.83001 14 3.83001 11.71 2.10001 8C3.83001 4.29 6.83001 2 10 2C13.17 2 16.17 4.29 17.9 8C16.17 11.71 13.17 14 10 14ZM10 4C9.20888 4 8.43552 4.2346 7.77773 4.67412C7.11993 5.11365 6.60724 5.73836 6.30449 6.46927C6.00174 7.20017 5.92252 8.00444 6.07686 8.78036C6.2312 9.55628 6.61217 10.269 7.17158 10.8284C7.73099 11.3878 8.44372 11.7688 9.21964 11.9231C9.99557 12.0775 10.7998 11.9983 11.5307 11.6955C12.2616 11.3928 12.8864 10.8801 13.3259 10.2223C13.7654 9.56448 14 8.79113 14 8C14 6.93913 13.5786 5.92172 12.8284 5.17157C12.0783 4.42143 11.0609 4 10 4ZM10 10C9.60444 10 9.21776 9.8827 8.88887 9.66294C8.55997 9.44318 8.30362 9.13082 8.15225 8.76537C8.00087 8.39991 7.96126 7.99778 8.03843 7.60982C8.11561 7.22186 8.30609 6.86549 8.58579 6.58579C8.8655 6.30608 9.22186 6.1156 9.60983 6.03843C9.99779 5.96126 10.3999 6.00087 10.7654 6.15224C11.1308 6.30362 11.4432 6.55996 11.6629 6.88886C11.8827 7.21776 12 7.60444 12 8C12 8.53043 11.7893 9.03914 11.4142 9.41421C11.0391 9.78929 10.5304 10 10 10Z"
                      fill="#f4a470"
                    />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.4424 18.1653L18.7402 18.8674L15.6738 15.801L15.4414 15.5696L15.1357 15.6897C13.8534 16.1969 12.456 16.4749 11 16.4749C6.28259 16.4749 2.24281 13.5833 0.540039 9.47388C1.28379 7.6673 2.48801 6.10477 3.99902 4.91821L4.44238 4.57056L4.04395 4.17114L1.71582 1.84399L2.4209 1.13306L19.4424 18.1653ZM4.80762 5.54712C3.54109 6.5101 2.46765 7.74917 1.73047 9.25513L1.62305 9.47485L1.73047 9.69458C3.46401 13.2352 7.01821 15.4749 11 15.4749C11.9994 15.4749 12.9641 15.3277 13.8818 15.0774L14.7129 14.8508L12.8848 13.0227L12.5742 13.1555C12.0946 13.3598 11.5609 13.4749 11 13.4749C8.79614 13.4749 7 11.6787 7 9.47485C7.00003 8.91452 7.11554 8.37996 7.32129 7.88794L7.4502 7.57837L7.21387 7.34106L5.15527 5.28247L4.80762 5.54712ZM11 2.47485C15.7171 2.47485 19.7561 5.36675 21.459 9.47583C20.8562 10.9362 19.9558 12.2334 18.833 13.3108L18.1348 12.6125C18.9993 11.789 19.7305 10.8092 20.2705 9.69263L20.376 9.47388L20.2695 9.25513C18.536 5.71449 14.9818 3.47485 11 3.47485C10.3714 3.47485 9.76505 3.54879 9.17773 3.65552L8.31738 2.79517C9.1782 2.58644 10.075 2.47485 11 2.47485Z"
                      fill="#f4a470"
                      stroke="#F4A470"
                    />
                  </svg>
                )}
              </span>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1 text-center px-6 sm:px-10 md:px-16">
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-base font-semibold mb-2 text-tertiary px-6 sm:px-10 md:px-16">
              Confirmar contraseña
            </label>
            <div className="relative w-full sm:w-96 mx-auto">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-primary rounded-full text-sm focus:outline-none focus:border-2 focus:border-primary"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-primary cursor-pointer"
              >
                {showConfirmPassword ? (
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.92 7.6C17.9 2.91 14.1 0 10 0C5.90001 0 2.10001 2.91 0.0800058 7.6C0.0249425 7.72617 -0.003479 7.86234 -0.003479 8C-0.003479 8.13766 0.0249425 8.27383 0.0800058 8.4C2.10001 13.09 5.90001 16 10 16C14.1 16 17.9 13.09 19.92 8.4C19.9751 8.27383 20.0035 8.13766 20.0035 8C20.0035 7.86234 19.9751 7.72617 19.92 7.6ZM10 14C6.83001 14 3.83001 11.71 2.10001 8C3.83001 4.29 6.83001 2 10 2C13.17 2 16.17 4.29 17.9 8C16.17 11.71 13.17 14 10 14ZM10 4C9.20888 4 8.43552 4.2346 7.77773 4.67412C7.11993 5.11365 6.60724 5.73836 6.30449 6.46927C6.00174 7.20017 5.92252 8.00444 6.07686 8.78036C6.2312 9.55628 6.61217 10.269 7.17158 10.8284C7.73099 11.3878 8.44372 11.7688 9.21964 11.9231C9.99557 12.0775 10.7998 11.9983 11.5307 11.6955C12.2616 11.3928 12.8864 10.8801 13.3259 10.2223C13.7654 9.56448 14 8.79113 14 8C14 6.93913 13.5786 5.92172 12.8284 5.17157C12.0783 4.42143 11.0609 4 10 4ZM10 10C9.60444 10 9.21776 9.8827 8.88887 9.66294C8.55997 9.44318 8.30362 9.13082 8.15225 8.76537C8.00087 8.39991 7.96126 7.99778 8.03843 7.60982C8.11561 7.22186 8.30609 6.86549 8.58579 6.58579C8.8655 6.30608 9.22186 6.1156 9.60983 6.03843C9.99779 5.96126 10.3999 6.00087 10.7654 6.15224C11.1308 6.30362 11.4432 6.55996 11.6629 6.88886C11.8827 7.21776 12 7.60444 12 8C12 8.53043 11.7893 9.03914 11.4142 9.41421C11.0391 9.78929 10.5304 10 10 10Z"
                      fill="#f4a470"
                    />
                  </svg>
                ) : (
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.4424 18.1653L18.7402 18.8674L15.6738 15.801L15.4414 15.5696L15.1357 15.6897C13.8534 16.1969 12.456 16.4749 11 16.4749C6.28259 16.4749 2.24281 13.5833 0.540039 9.47388C1.28379 7.6673 2.48801 6.10477 3.99902 4.91821L4.44238 4.57056L4.04395 4.17114L1.71582 1.84399L2.4209 1.13306L19.4424 18.1653ZM4.80762 5.54712C3.54109 6.5101 2.46765 7.74917 1.73047 9.25513L1.62305 9.47485L1.73047 9.69458C3.46401 13.2352 7.01821 15.4749 11 15.4749C11.9994 15.4749 12.9641 15.3277 13.8818 15.0774L14.7129 14.8508L12.8848 13.0227L12.5742 13.1555C12.0946 13.3598 11.5609 13.4749 11 13.4749C8.79614 13.4749 7 11.6787 7 9.47485C7.00003 8.91452 7.11554 8.37996 7.32129 7.88794L7.4502 7.57837L7.21387 7.34106L5.15527 5.28247L4.80762 5.54712ZM11 2.47485C15.7171 2.47485 19.7561 5.36675 21.459 9.47583C20.8562 10.9362 19.9558 12.2334 18.833 13.3108L18.1348 12.6125C18.9993 11.789 19.7305 10.8092 20.2705 9.69263L20.376 9.47388L20.2695 9.25513C18.536 5.71449 14.9818 3.47485 11 3.47485C10.3714 3.47485 9.76505 3.54879 9.17773 3.65552L8.31738 2.79517C9.1782 2.58644 10.075 2.47485 11 2.47485Z"
                      fill="#f4a470"
                      stroke="#F4A470"
                    />
                  </svg>
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 text-center px-6 sm:px-10 md:px-16">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className=" sm:w-[1/2] w-[1/2] text-lg px-7 py-2 bg-primary text-white font-bold rounded-full shadow-xl cursor-pointer transition"
            >
              Restablecer contraseña
            </button>
            <button
              type="button"
              onClick={() => setRecoverOpen(true)}
              className="sm:w-[1/2] w-[1/2]  px-8 cursor-pointer py-1 border-2 text-lg border-primary text-primary font-bold rounded-full shadow-sm transition"
            >
              Volver atrás
            </button>
          </div>
        </form>
      </div>
      {/* Modales */}
      <AuthModalsController
        isLoginOpen={isLoginOpen}
        setLoginOpen={setLoginOpen}
        isRegisterOpen={isRegisterOpen}
        setRegisterOpen={setRegisterOpen}
        isRegisterbOpen={isRegisterbOpen}
        setRegisterbOpen={setRegisterbOpen}
        isRecoverOpen={isRecoverOpen}
        setRecoverOpen={setRecoverOpen}
      />
    </div>
  );
}

export default PasswordReset;
