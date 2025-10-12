import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Login from './components/usuario/Login';
import Registro from './components/usuario/Registro';
import RecuperarContraseña from './components/usuario/RecuperarContraseña';
import PanelUsuario from './components/usuario/PanelUsuario';
import DetalleOrden from './components/usuario/DetalleOrden';
import EditarPerfil from './components/usuario/EditarPerfil';
import GestionUsuarios from './components/admin/GestionUsuarios';
import GestionOrdenes from './components/admin/GestionOrdenes';
import DetalleUsuarioAdmin from './components/admin/DetalleUsuarioAdmin';
import DetalleOrdenAdmin from './components/admin/DetalleOrdenAdmin';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/panel" element={<PanelUsuario />} />
        <Route path="/orden/:id" element={<DetalleOrden />} />
        <Route path="/perfil/editar" element={<EditarPerfil />} />

        <Route path="/admin/usuarios" element={<GestionUsuarios />} />
        <Route path="/admin/usuario/:id" element={<DetalleUsuarioAdmin />} />
        <Route path="/admin/ordenes" element={<GestionOrdenes />} />
        <Route path="/admin/orden/:id" element={<DetalleOrdenAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
