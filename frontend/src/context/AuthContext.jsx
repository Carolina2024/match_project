import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
};


  // 3. Función de login
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };


  // 5. Estado de sesión
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 6. Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
