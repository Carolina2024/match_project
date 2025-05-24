import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import logo from "../assets/logo.png";
import EyeOpenIcon from "../assets/icons/svg-components/EyeOpenIcon";
import EyeCloseIcon from "../assets/icons/svg-components/EyeCloseIcon";

import logo from "../assets/logo.webp";


function PasswordReset() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  const handleCodigoChange = (index, value) => {
    const newCode = [...code];

    if (value.length === 6 && /^[0-9]+$/.test(value)) {
      const digits = value.split("").slice(0, 6);
      setCode(digits);
      digits.forEach((digit, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
        }
      });
      return;
    }

    if (/^[0-9]?$/.test(value)) {
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();

    if (/^[0-9]{6}$/.test(paste)) {
      const digits = paste.split("");
      setCode(digits);
      digits.forEach((digit, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
        }
      });
      inputRefs.current[5]?.focus();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const completeCode = code.join("");
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password`,
          {
            token,
            newPassword,
            recoveryCode: completeCode,
          }
        );
        localStorage.removeItem("email_recovery");
        navigate("/?openLogin=true");
      } catch (error) {
        setErrors({ code: "Código inválido o token vencido" });
      }
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-10 flex justify-center">
      <div className="relative bg-white w-full h-auto max-w-md sm:max-w-lg md:max-w-2xl min-h-screen rounded-3xl shadow-xl flex flex-col items-center border border-[#CBCBCB] px-6 sm:px-10 md:px-16 pt-20 pb-10">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <img
            src={logo}
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
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !code[i] && i > 0) {
                    inputRefs.current[i - 1]?.focus();
                  }
                }}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[i] = el)}
                className="w-10 sm:w-12 h-12 mr-2 sm:h-14 border border-[#76757580] rounded-xl text-center text-lg focus:outline-none focus:border-primary"
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

        <form onSubmit={handleSubmit} className="w-full space-y-6">
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

<EyeOpenIcon />

                ) : (

<EyeCloseIcon />

                )}
              </span>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1 text-center px-6 sm:px-10 md:px-16">
                {errors.newPassword}
              </p>
            )}
          </div>

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
<EyeOpenIcon />

                ) : (
<EyeCloseIcon />

                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 text-center px-6 sm:px-10 md:px-16">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className=" sm:w-[1/2] w-[1/2] text-lg px-7 py-2 bg-primary text-white font-bold rounded-full shadow-xl cursor-pointer transition"
            >
              Restablecer contraseña
            </button>
            <button
              type="button"
              onClick={() => navigate("/?openRecovery=true")}
              className="sm:w-[1/2] w-[1/2]  px-8 cursor-pointer py-1 border-2 text-lg border-primary text-primary font-bold rounded-full shadow-sm transition"
            >
              Volver atrás
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
