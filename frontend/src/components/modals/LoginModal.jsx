import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const LoginModal = ({ isOpen, onClose, onOpenRegister, onOpenRecovery }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
          return "Debe tener mínimo 6 caracteres, letras,\nnúmeros y símbolos. Ej: hola123!";
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
      const data = await loginUser({ email, password });

      login(data.user, data.token);

      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const role = payload.role || data.user?.role;

      setErrors({});
      setEmail("");
      setPassword("");
      setError("");

      onClose();
      if (role === "admin") {
        navigate("/Admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Correo o contraseña incorrectos. Intenta nuevamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[4px] bg-opacity-20 flex items-center justify-center px-4">
      <div className="flex items-center justify-center my-14">
        <div className="bg-[#F9F9F9] rounded-2xl shadow-xl w-full md:max-w-4xl max-w-md flex overflow-hidden relative border border-[#CBCBCB]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary hover:text-tertiary text-2xl cursor-pointer"
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
                  <div className="bg-red-100 text-red-600 p-2 rounded">
                    {error}
                  </div>
                )}
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary">
                  <i className="fas fa-user" />

                  <svg
                    width="14"
                    height="14"
                    className="absolute top-3 left-4"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99992 1.99992C7.91658 1.99992 8.66658 2.74992 8.66658 3.66659C8.66658 4.58325 7.91658 5.33325 6.99992 5.33325C6.08325 5.33325 5.33325 4.58325 5.33325 3.66659C5.33325 2.74992 6.08325 1.99992 6.99992 1.99992ZM6.99992 10.3333C9.24992 10.3333 11.8333 11.4083 11.9999 11.9999H1.99992C2.19159 11.3999 4.75825 10.3333 6.99992 10.3333ZM6.99992 0.333252C5.15825 0.333252 3.66659 1.82492 3.66659 3.66659C3.66659 5.50825 5.15825 6.99992 6.99992 6.99992C8.84159 6.99992 10.3333 5.50825 10.3333 3.66659C10.3333 1.82492 8.84159 0.333252 6.99992 0.333252ZM6.99992 8.66658C4.77492 8.66658 0.333252 9.78325 0.333252 11.9999V13.6666H13.6666V11.9999C13.6666 9.78325 9.22492 8.66658 6.99992 8.66658Z"
                      fill="#F4A470"
                    />
                  </svg>
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

              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary">
                  <i className="fas fa-lock" />

                  <svg
                    width="20"
                    height="12"
                    className="absolute top-3 left-4"
                    viewBox="0 0 20 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3333 11.8334H13.3333V8.50008H11.1C10.15 10.5167 8.1 11.8334 5.83333 11.8334C2.61667 11.8334 0 9.21675 0 6.00008C0 2.78341 2.61667 0.166748 5.83333 0.166748C8.1 0.166748 10.1417 1.48341 11.1 3.50008H20V8.50008H18.3333V11.8334ZM15 10.1667H16.6667V6.83342H18.3333V5.16675H9.95L9.75833 4.60841C9.175 2.95008 7.59167 1.83341 5.83333 1.83341C3.53333 1.83341 1.66667 3.70008 1.66667 6.00008C1.66667 8.30008 3.53333 10.1667 5.83333 10.1667C7.59167 10.1667 9.175 9.05008 9.75833 7.39175L9.95 6.83342H15V10.1667ZM5.83333 8.50008C4.45833 8.50008 3.33333 7.37508 3.33333 6.00008C3.33333 4.62508 4.45833 3.50008 5.83333 3.50008C7.20833 3.50008 8.33333 4.62508 8.33333 6.00008C8.33333 7.37508 7.20833 8.50008 5.83333 8.50008ZM5.83333 5.16675C5.375 5.16675 5 5.54175 5 6.00008C5 6.45842 5.375 6.83342 5.83333 6.83342C6.29167 6.83342 6.66667 6.45842 6.66667 6.00008C6.66667 5.54175 6.29167 5.16675 5.83333 5.16675Z"
                      fill="#F4A470"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 text-lg font-medium bg-white  text-[#767575] py-1 border border-primary rounded-3xl focus:outline-none focus:ring-1 focus:ring-primary"
                />

                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="16"
                      className="absolute top-3 right-4"
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
                      className="absolute top-3 right-4"
                      viewBox="0 0 22 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.4424 18.1653L18.7402 18.8674L15.6738 15.801L15.4414 15.5696L15.1357 15.6897C13.8534 16.1969 12.456 16.4749 11 16.4749C6.28259 16.4749 2.24281 13.5833 0.540039 9.47388C1.28379 7.6673 2.48801 6.10477 3.99902 4.91821L4.44238 4.57056L4.04395 4.17114L1.71582 1.84399L2.4209 1.13306L19.4424 18.1653ZM4.80762 5.54712C3.54109 6.5101 2.46765 7.74917 1.73047 9.25513L1.62305 9.47485L1.73047 9.69458C3.46401 13.2352 7.01821 15.4749 11 15.4749C11.9994 15.4749 12.9641 15.3277 13.8818 15.0774L14.7129 14.8508L12.8848 13.0227L12.5742 13.1555C12.0946 13.3598 11.5609 13.4749 11 13.4749C8.79614 13.4749 7 11.6787 7 9.47485C7.00003 8.91452 7.11554 8.37996 7.32129 7.88794L7.4502 7.57837L7.21387 7.34106L5.15527 5.28247L4.80762 5.54712ZM11 2.47485C15.7171 2.47485 19.7561 5.36675 21.459 9.47583C20.8562 10.9362 19.9558 12.2334 18.833 13.3108L18.1348 12.6125C18.9993 11.789 19.7305 10.8092 20.2705 9.69263L20.376 9.47388L20.2695 9.25513C18.536 5.71449 14.9818 3.47485 11 3.47485C10.3714 3.47485 9.76505 3.54879 9.17773 3.65552L8.31738 2.79517C9.1782 2.58644 10.075 2.47485 11 2.47485ZM8.00977 9.34497C8.00977 9.33562 8.01127 9.32801 8.00879 9.3479C8.0063 9.36778 8.00001 9.41554 8 9.47485C8 11.131 9.34386 12.4749 11 12.4749C11.1123 12.4749 11.2129 12.4468 11.2412 12.4397L12.0977 12.2258L8.00977 8.13794V9.34497ZM11 5.47485C13.1368 5.47485 14.8862 7.15265 14.9854 9.25806L14.9902 9.46313V9.46509L14.9893 9.46802L13.6895 8.16724C13.396 7.55973 12.9037 7.06659 12.2959 6.77368L10.9961 5.47485C10.9974 5.47485 10.9987 5.47485 11 5.47485Z"
                        fill="#f4a470"
                        stroke="#F4A470"
                      />
                    </svg>
                  )}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 md:whitespace-pre-line">
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
                  className="text-sm text-primary font-semibold hover:underline cursor-pointer"
                >
                  ¿Olvidaste la contraseña?
                </button>
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
              <svg
                width="208"
                height="247"
                className=""
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
                src={logo}
                alt="Logo Patas Pirque"
                className=" md:w-50 w-32 h-auto drop-shadow-xl rounded-full absolute top-0 md:left-97 left-70 right-0 bottom-0 m-auto"
              />

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

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpenRegister: PropTypes.func.isRequired,
  onOpenRecovery: PropTypes.func.isRequired,
};

export default LoginModal;
