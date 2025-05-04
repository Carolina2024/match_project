// src/componentes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  /* const user = JSON.parse(localStorage.getItem("user")); */

  /* if (!token || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  } */

  // Si no hay token o el rol no es admin, redirige a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  // Si el rol no es admin, redirige a login
  if (decodedToken.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  console.log("TOKEN:", token);

  return children;
};

export default PrivateRoute;
