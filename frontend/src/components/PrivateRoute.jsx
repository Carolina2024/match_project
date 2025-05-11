// src/componentes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  if (decodedToken.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  console.log("TOKEN:", token);

  return children;
};

export default PrivateRoute;
