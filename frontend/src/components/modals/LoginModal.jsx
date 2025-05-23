import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import userIcon from "../../assets/icons/user-icon.svg";
import LockIcon from "../../assets/icons/lock-icon.svg";
import eyeOpen from "../../assets/icons/eye-open.svg";
import eyeOff from "../../assets/icons/eye-off.svg";
import BlurTop from "../../assets/icons/blur-top";
import BlurBottom from "../../assets/icons/blur-bottom";
import Spinner from "../../assets/icons/spinner";


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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] bg-opacity-20 flex items-center justify-center px-4">
      <div className="flex items-center justify-center my-14">
        <div className="bg-[#F9F9F9] rounded-2xl shadow-xl w-full md:max-w-4xl max-w-md flex overflow-hidden relative border border-[#CBCBCB]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 text-tertiary text-2xl cursor-pointer"
          >
            <X />
          </button>

          <div className="max-w-lg p-12 flex flex-col justify-center">
            <h2 className="text-lg font-bold mb-6 mx-0 text-center font-secundary text-black">
              Inicio Sesión a Patas Pirque
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
                    className="w-full pl-10 text-lg font-medium bg-white text-[#767575] pr-4 py-1 border border-primary rounded-3xl focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative pb-1"> 
  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary">
    <img src={LockIcon} alt="" className="w-[18px] h-[18px]" />
  </span>

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Contraseña"
    value={password}
    name="password"
    onChange={(e) => setPassword(e.target.value)}
    disabled={isLoading}
    className="w-full pl-10 pr-10 text-lg font-medium bg-white text-[#767575] py-1 border border-primary rounded-3xl focus:outline-none focus:ring-1 focus:ring-primary"
  />

  <span
    onClick={() => setShowPassword((prev) => !prev)}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary cursor-pointer"
  >
    <img
      src={showPassword ? eyeOpen : eyeOff}
      alt="Mostrar contraseña"
      className="w-[22px] h-[20px]"
    />
  </span>

  {errors.password && (
    <p className="absolute left-0 top-full text-red-500 text-sm mt-1">
      {errors.password}
    </p>
  )}
</div>


              <div className="text-left">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenRecovery();
                  }}
                  className="text-sm text-primary font-semibold hover:underline cursor-pointer m-3"
                >
                  ¿Olvidaste la contraseña?
                </button>
              </div>

              

              <div className="justify-center text-left mt-10">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-14 bg-primary shadow-lg/20 text-white py-2 cursor-pointer font-bold text-lg rounded-3xl hover:bg-orange-300 transition-colors"
                >
                  {isLoading ? (
                    <>
<Spinner />             
   
                           Cargando...
                    </>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
            </form>

            <p className="text-sm text-center font-medium text-[#767575] mt-12">
              ¿Todavía no te registraste?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
                className="text-primary text-sm font-bold hover:underline cursor-pointer"
              >
                Regístrate
              </button>
            </p>
          </div>

          <div className="w-auto flex justify-center items-center">
            <div className="flex flex-col  ">

 <BlurTop />

              <img
                src={logo}
                alt="Logo Patas Pirque"
                className=" md:w-50 w-32 h-auto drop-shadow-xl rounded-full absolute top-0 md:left-97 left-70 right-0 bottom-0 m-auto"
              />

<BlurBottom />


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
