import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import logo from "../../assets/logo.webp";
import { useAuth } from "../../context/AuthContext";
import userIcon from "../../assets/icons/user-icon.svg";
import LockIcon from "../../assets/icons/lock-icon.svg";
import eyeOpen from "../../assets/icons/eye-open.svg";
import eyeOff from "../../assets/icons/eye-off.svg";
import BlurTop from "../../assets/icons/svg-components/blur-top";
import BlurBottom from "../../assets/icons/svg-components/blur-bottom";
import Spinner from "../../assets/icons/svg-components/Spinner";

const LoginModal = ({ isOpen, onClose, onOpenRegister, onOpenRecovery }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value.trim()) return "El correo es obligatorio";
        if (!/\S+@\S+\.\S+/.test(value)) return "";
        return "";
      case "password":
        if (!value.trim()) return "La contraseña es obligatoria";
        if (
          !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/.test(
            value
          )
        ) {
          return "Debe tener mínimo 6 caracteres, al menos una letra, un número y un símbolo. Ej: hola123!";
        }
        return "";
      default:
        return "";
    }
  };

  const validate = () => {
    const newErrors = {};
    newErrors.email = validateField("email", email);
    newErrors.password = validateField("password", password);
    return Object.fromEntries(
      Object.entries(newErrors).filter(([, msg]) => msg)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser({ email, password });

      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const role = payload.role || data.user?.role;

      const userWithRole = { ...data.user, role };

      login(userWithRole, data.token);

      setErrors({});
      setEmail("");
      setPassword("");
      setError("");

      onClose();
      setIsLoading(false);

      if (role === "admin") {
        navigate("/Admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Correo o contraseña incorrectos. Intenta nuevamente.");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] bg-opacity-20 flex items-center justify-center px-5 sm:px-5">
      <div className="flex items-center justify-center my-14">
        <div className="w-[293px] sm:w-[751px] h-[550px] sm:h-[531px] bg-[#F9F9F9] rounded-4xl sm:rounded-2xl shadow-xl flex flex-col-reverse md:flex-row overflow-hidden relative border border-[#CBCBCB] sm:py-4 -py-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-7 right-8 text-tertiary text-2xl cursor-pointer z-10"
          >
            <X />
          </button>

          <div className="p-10 flex flex-col justify-center">
            <h2 className="text-[20px] sm:text-[24px] text-center sm:text-left font-bold  font-secundary text-[#595146] mb-4  ml-0 sm:ml-[12px]">
              <span className="block w-full">Inicio Sesión</span>
              <span className="block w-full">a Patas Pirque</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                {error && (
                  <div className="bg-red-100 text-red-600 p-2 rounded mb-2">
                    {error}
                  </div>
                )}

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary">
                    <img src={userIcon} className="w-[14px] h-[14px]" alt="" />
                  </span>

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    name="email"
                    disabled={isLoading}
                    className="sm:w-[288px] w-[218px] sm:h-[40px] h-[30px] pl-10 sm:text-[14px] text-[18px] font-medium bg-[#FFFFFF] placeholder:text-[#767575] pr-4 py-1 border border-primary rounded-3xl focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative pb-1 w-[218px] sm:w-[288px]">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary">
                  <img src={LockIcon} alt="" className="w-[18px] h-[18px]" />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  autoComplete="none"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full sm:h-[40px] h-[30px] pl-10 pr-10 sm:text-[14px] text-[18px] font-medium bg-[#FFFFFF] placeholder:text-[#767575] py-1 border border-primary rounded-3xl focus:outline-none focus:ring-1 focus:ring-primary"
                />

                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-primary cursor-pointer"
                >
                  <img
                    src={showPassword ? eyeOpen : eyeOff}
                    alt="Mostrar contraseña"
                    className="w-[22px] h-[20px]"
                  />
                </span>
              </div>
              {errors.password && (
                <p className="left-0 top-full text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}

              <div className="text-left">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenRecovery();
                  }}
                  className="text-[14px] text-primary font-semibold hover:underline cursor-pointer -mt-4"
                >
                  ¿Olvidaste la contraseña?
                </button>
              </div>

              <div className="flex sm:justify-start justify-center mt-5 sm:mt-7">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center items-center bg-primary shadow-lg/20 text-[#FFFFFF] py-2 cursor-pointer font-bold text-14px sm:text-[18px] rounded-3xl hover:bg-orange-300 transition-colors
                  sm:w-[178px] w-[119px]"
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center w-full">
                      <Spinner />
                      <span className="ml-2">Cargando</span>
                    </div>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
            </form>

            <p className="text-[14px] sm:text-left text-center font-medium text-[#767575] mt-8 sm:mt-24 ">
              ¿Todavía no te registraste?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
                className="text-primary text-[14px] font-bold hover:underline cursor-pointer"
              >
                Regístrate
              </button>
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex sm:flex-col items-center relative sm:relative translate-y-[100px] sm:translate-y-0">
              <BlurTop className="-mr-30 sm:mr-4 sm:mb-4 " />

              <img
                src={logo}
                alt="Logo Patas Pirque"
                className="w-[70px] h-[68px] sm:w-[201px] sm:h-[195px] drop-shadow-xl mr-10 sm:mr-20 sm:ml-50 -ml-5 rounded-full translate-y-[0px] sm:-translate-y-35"
              />

              <BlurBottom className="sm:block hidden absolute bottom-0 sm:-bottom-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenRegister: PropTypes.func.isRequired,
  onOpenRecovery: PropTypes.func.isRequired,
};

export default LoginModal;
