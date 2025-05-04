import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./componets/PublicLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Adoptar from "./views/Adoptar";
import AdminPanel from "./views/AdminPanel";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import PetsHome from "./componets/PetsHome";
import CuidadosMascota from "./views/CuidadosMascota";
import Nosotros from "./views/Nosotros";
import Contacto from "./views/Contacto";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/Login" />
          <Route element={<Register />} path="/Register" />
          <Route element={<Nosotros />} path="/nosotros" />
          <Route element={<CuidadosMascota />} path="/cuidadosmascota" />
          <Route element={<Contacto/>} path="/contacto" />
          <Route element={<Adoptar />} path="/Adoptar" />
          <Route element={<AdminPanel />} path="/Admin" />
          <Route element={<PetsHome />} path="/Mascotas" />
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
