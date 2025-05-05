import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Home from "./views/Home";
import Adoptar from "./views/Adoptar";
import AdminPanel from "./views/AdminPanel";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import PetsHome from "./components/PetsHome";
import CuidadosMascota from "./views/CuidadosMascota";
import Nosotros from "./views/Nosotros";
import Contacto from "./views/Contacto";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route element={<Home />} path="/" />
          <Route element={<Nosotros />} path="/Nosotros" />
          <Route element={<CuidadosMascota />} path="/CuidadosMascota" />
          <Route element={<Contacto />} path="/Contacto" />
          <Route element={<Adoptar />} path="/Adoptar" />
          <Route element={<PetsHome />} path="/Mascotas" />
        </Route>

        {/* Ruta protegida para admin */}
        <Route
          path="/Admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
