import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./componets/PublicLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import QuienesSomos from "./views/QuienesSomos";
import Adoptar from "./views/Adoptar";
import AdminPanel from "./views/AdminPanel";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/Login" />
          <Route element={<Register />} path="/Register" />
          <Route element={<QuienesSomos />} path="QuienesSomos" />
          <Route element={<Adoptar />} path="Adoptar" />
          <Route element={<AdminPanel />} path="Admin" />
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
