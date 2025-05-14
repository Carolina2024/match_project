import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import AdminPanel from "./views/AdminPanel";
import PetsHome from "./components/PetsHome";
import CuidadosMascota from "./views/CuidadosMascota";
import Nosotros from "./views/Nosotros";
import Contacto from "./views/Contacto";
import PrivateRoute from "./components/PrivateRoute";
import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";
import PetElection from "./components/PetElection";
import UserModalEdit from "./components/modals/UserModalEdit";
import PasswordReset from "./views/PasswordReset";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/CuidadosMascota" element={<CuidadosMascota />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Mascotas" element={<PetsHome />} />
          <Route path="/seguimiento" element={<PetElection />} />
          <Route path="/editprofile" element={<UserModalEdit />} />
          <Route path="/RecoverPassword" element={<PasswordReset />} />
        </Route>

        <Route
          path="/Admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
