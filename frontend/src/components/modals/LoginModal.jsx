import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../../api/user";
import { Link } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👈 Nuevo estado

  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value.trim()) return "El correo es obligatorio";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Correo inválido. Ej: ejemplo@dominio.com";
        return "";
      case "password":
        if (!value.trim()) return "La contraseña es obligatoria";
        if (
          !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{6,}$/.test(
            value
          )
        ) {
          return "Debe tener mínimo 6 caracteres, letras, números y símbolos. Ej: hola123!";
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

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      Swal.fire({
        title: "Iniciando sesión...",
        text: "Por favor espera un momento",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const data = await loginUser({ email, password });

      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const role = payload.role || data.user?.role;

      setErrors({});
      setEmail("");
      setPassword("");
      Swal.close();

      Swal.fire({
        title: "¡Inicio de sesión exitoso!",
        text: "Bienvenido/a a Patas Pirque",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#FAAB75",
      }).then((result) => {
        if (result.isConfirmed) {
          if (role === "admin") {
            navigate("/Admin");
          } else {
            navigate("/");
          }
        }
      });
    } catch (err) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Credenciales inválidas",
        text: "El correo o la contraseña son incorrectos. Intenta nuevamente.",
        confirmButtonColor: "#FAAB75",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-20 flex items-center justify-center px-4">
      <div className="flex items-center justify-center my-14">
        <div className="bg-[#F9F9F9] rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden relative border border-[#CBCBCB]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary hover:text-tertiary text-2xl cursor-pointer"
          >
            <X />
          </button>

          {/* FORMULARIO */}
          <div className="max-w-lg p-12 flex flex-col justify-center">
            <h2 className="text-lg font-bold mb-6 mx-0 text-center font-secundary text-black">
              Inicio Sesión a Patas Pirque
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email */}
              <div className="relative">
                {error && (
                  <div className="bg-red-100 text-red-600 p-2 rounded">
                    {error}
                  </div>
                )}
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-orange-400">
                  <i className="fas fa-user" />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  name="email"
                  className="w-full pl-10 text-lg font-medium bg-white  text-[#767575] pr-4 py-1 border border-primary rounded-3xl focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Contraseña */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary">
                  <i className="fas fa-lock" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 text-lg font-medium bg-white  text-[#767575] py-1 border border-primary rounded-3xl focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {/* OJITO */}
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.993 12c.94 2.387 3.394 5.5 10.007 5.5 1.26 0 2.447-.193 3.544-.548M14.25 9.75a3 3 0 11-4.5 4.5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 14.25l4.5-4.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12 18 19.5 12 19.5 2.25 12 2.25 12z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="text-left">
                <Link
                  to="#"
                  className="text-sm text-primary font-semibold hover:underline"
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </div>

              <div className="justify-center text-left mt-12">
                <button
                  type="submit"
                  className="px-14 bg-primary shadow-lg/20 text-white py-2 cursor-pointer font-bold text-lg rounded-3xl hover:bg-orange-300 transition-colors"
                >
                  Ingresar
                </button>
              </div>
            </form>

            <p className="text-sm text-center font-medium text-[#767575] mt-12">
              ¿Todavía no te registraste?{" "}
              <Link to="#" className="text-primary text-sm font-bold hover:underline">
                Regístrate
              </Link>
            </p>
          </div>

          {/* IMAGEN */}
          <div className="w-auto flex justify-center items-center">
            <div className="flex flex-col">
              {/* SVG de fondo */}
              <svg
                width="208"
                height="247"
                viewBox="0 0 208 247"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.3" filter="url(#filter0_f_1091_2743)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M66.9852 10.0683C77.0338 0.763665 99.6221 -5.35101 106.535 6.70262C116.465 24.0172 89.4714 48.577 99.1048 66.0753C106.795 80.044 133.248 62.9049 143.885 74.5463C151.925 83.3461 146.931 100.938 139.604 110.401C131.668 120.65 109.808 112.616 104.967 124.81C97.379 143.924 127.633 177.596 109.604 185.967C91.253 194.487 86.4217 147.67 66.9852 142.444C53.9407 138.938 47.1659 164.867 33.7177 165.566C21.8596 166.182 4.74432 158.169 4.05187 145.716C3.0817 128.269 36.0757 118.154 30.1727 101.815C22.9475 81.8154 -13.9719 90.7516 -22.7742 71.4625C-28.6087 58.6769 -12.4372 39.991 0.862974 37.586C18.7663 34.3487 34.1145 65.1508 51.0043 58.1219C66.2096 51.794 54.7156 21.4295 66.9852 10.0683Z"
                    fill="#F4A470"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_1091_2743"
                    x="-84"
                    y="-60"
                    width="292"
                    height="307"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="30"
                      result="effect1_foregroundBlur_1091_2743"
                    />
                  </filter>
                </defs>
              </svg>

              <img
                src="src/assets/logo.png"
                srcSet="src/assets/logo@2x.png 2x, src/assets/logo@3x.png 3x"
                alt="Patas Pirque Logo"
                className="w-50 h-auto drop-shadow-xl rounded-full absolute top-0 left-90 right-0 bottom-0 m-auto"
              />
              {/* SVG de fondo */}
              <svg
                width="288"
                height="226"
                viewBox="0 0 288 226"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.3" filter="url(#filter0_f_1091_2744)">
                  <path
                    d="M169.043 75.1051C221.09 127.152 242.176 190.45 216.14 216.485C190.104 242.521 83.2475 251.872 31.2011 199.826C-20.8453 147.78 70.8028 173.346 96.8386 147.31C122.874 121.274 116.997 23.0587 169.043 75.1051Z"
                    fill="#F4A470"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_1091_2744"
                    x="-44.5222"
                    y="0.124023"
                    width="331.819"
                    height="297.377"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="30"
                      result="effect1_foregroundBlur_1091_2744"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
