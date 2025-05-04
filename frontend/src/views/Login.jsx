import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../api/user";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

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
      console.log("Payload decodificado:", payload);

      //PARA INGRESAR POR ROL ADMIN
      const role = payload.role || data.user?.role;
      console.log("Rol del usuario:", role);

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
        //PARA INGRESAR POR ROL ADMIN
        if (result.isConfirmed) {
          /*  navigate("/dashboard"); */
          if (role === "admin") {
            console.log("Redirigiendo a:", role === "admin" ? "/Admin" : "/");
            navigate("/Admin");
          } else {
            navigate("/");
          }
        }
      });
    } catch (err) {
      Swal.close();
      console.error("Error al iniciar sesión:", err);
      Swal.fire({
        icon: "error",
        title: "Credenciales inválidas",
        text: "El correo o la contraseña son incorrectos. Intenta nuevamente.",
        confirmButtonColor: "#FAAB75",
      });
    }
  };

  return (
    <div className=" flex items-center justify-center my-14 bg-[#f9f9f9] ">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-4xl flex overflow-hidden border border-gray-200">
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Inicio Sesión a Patas Pirque
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                {error && (
                  <div className="bg-red-100 text-red-600 p-2 rounded">
                    {error}
                  </div>
                )}
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 16C14.7 16 17.8 17.29 18 18H6C6.23 17.28 9.31 16 12 16ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                      fill="#404040"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  name="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 19H16V15H13.32C12.18 17.42 9.72 19 7 19C3.14 19 0 15.86 0 12C0 8.14 3.14 5 7 5C9.72 5 12.17 6.58 13.32 9H24V15H22V19ZM18 17H20V13H22V11H11.94L11.71 10.33C11.01 8.34 9.11 7 7 7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17C9.11 17 11.01 15.66 11.71 13.67L11.94 13H18V17ZM7 15C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9C8.65 9 10 10.35 10 12C10 13.65 8.65 15 7 15ZM7 11C6.45 11 6 11.45 6 12C6 12.55 6.45 13 7 13C7.55 13 8 12.55 8 12C8 11.45 7.55 11 7 11Z"
                      fill="#404040"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.4424 20.1653L19.7402 20.8674L16.6738 17.801L16.4414 17.5696L16.1357 17.6897C14.8534 18.1969 13.456 18.4749 12 18.4749C7.28259 18.4749 3.24281 15.5833 1.54004 11.4739C2.28379 9.6673 3.48801 8.10477 4.99902 6.91821L5.44238 6.57056L5.04395 6.17114L2.71582 3.84399L3.4209 3.13306L20.4424 20.1653ZM5.80762 7.54712C4.54109 8.5101 3.46765 9.74917 2.73047 11.2551L2.62305 11.4749L2.73047 11.6946C4.46401 15.2352 8.01821 17.4749 12 17.4749C12.9994 17.4749 13.9641 17.3277 14.8818 17.0774L15.7129 16.8508L13.8848 15.0227L13.5742 15.1555C13.0946 15.3598 12.5609 15.4749 12 15.4749C9.79614 15.4749 8 13.6787 8 11.4749C8.00003 10.9145 8.11554 10.38 8.32129 9.88794L8.4502 9.57837L8.21387 9.34106L6.15527 7.28247L5.80762 7.54712ZM12 4.47485C16.7171 4.47485 20.7561 7.36675 22.459 11.4758C21.8562 12.9362 20.9558 14.2334 19.833 15.3108L19.1348 14.6125C19.9993 13.789 20.7305 12.8092 21.2705 11.6926L21.376 11.4739L21.2695 11.2551C19.536 7.71449 15.9818 5.47485 12 5.47485C11.3714 5.47485 10.765 5.54879 10.1777 5.65552L9.31738 4.79517C10.1782 4.58644 11.075 4.47485 12 4.47485ZM9.00977 11.345C9.00977 11.3356 9.01127 11.328 9.00879 11.3479C9.0063 11.3678 9.00001 11.4155 9 11.4749C9 13.131 10.3439 14.4749 12 14.4749C12.1123 14.4749 12.2129 14.4468 12.2412 14.4397L13.0977 14.2258L9.00977 10.1379V11.345ZM12 7.47485C14.1368 7.47485 15.8862 9.15265 15.9854 11.2581L15.9902 11.4631V11.4651L15.9893 11.468L14.6895 10.1672C14.396 9.55973 13.9037 9.06659 13.2959 8.77368L11.9961 7.47485C11.9974 7.47485 11.9987 7.47485 12 7.47485Z"
                      fill="#0C0C0C"
                      stroke="#F4A470"
                    />
                  </svg>
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <Link to="#" className="text-sm text-primary hover:underline">
                ¿Olvidaste la contraseña?
              </Link>
            </div>

            <div className="justify-center items-center text-center">
              <button
                type="submit"
                className="w-44 bg-primary text-white py-5 text-base rounded-lg hover:bg-primary transition-colors"
              >
                Ingresar
              </button>
            </div>
          </form>

          <p className="my-18  text-sm text-center text-gray-600">
            Todavía no te registraste?{" "}
            <Link to="#" className="text-primary hover:underline">
              Registrate
            </Link>
          </p>
        </div>

        <div className="w-1/2 bg-gradient-to-br from-white via-orange-100 to-white flex justify-center items-center p-6">
          <img
            src={logo}
            alt="Logo Patas Pirque"
            className="w-60 h-auto drop-shadow-xl rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
