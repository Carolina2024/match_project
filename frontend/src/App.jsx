import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from './componets/PublicLayout';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import QuienesSomos from './views/QuienesSomos';
import Adoptar from './views/Adoptar';
import CuidadorPanel from './views/CuidadorPanel';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout/>} >
          <Route element={<Home/> } path='/'/>
          <Route element={<Login/>} path='/Login'/>
          <Route element={<Register/>} path='/Register'/>
          <Route element={<QuienesSomos/>} path='QuienesSomos'/>
          <Route element={<Adoptar/>} path='Adoptar' />
          <Route element={<AdminPanel/>} path='Admin' />
          <Route element={<CuidadorPanel/>} path='/Cuidador' />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
