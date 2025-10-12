// En App.jsx, importa los nuevos componentes
import GestionUsuarios from './components/admin/GestionUsuarios';
import GestionOrdenes from './components/admin/GestionOrdenes';
import DetalleUsuarioAdmin from './components/admin/DetalleUsuarioAdmin';
import DetalleOrdenAdmin from './components/admin/DetalleOrdenAdmin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Tus rutas existentes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar-contraseña" element={<RecuperarContraseña />} />
        <Route path="/panel" element={<PanelUsuario />} />
        <Route path="/orden/:id" element={<DetalleOrden />} />
        <Route path="/perfil/editar" element={<EditarPerfil />} />

        {/* NUEVAS RUTAS DE ADMINISTRADOR */}
        <Route path="/admin/usuarios" element={<GestionUsuarios />} />
        <Route path="/admin/usuario/:id" element={<DetalleUsuarioAdmin />} />
        <Route path="/admin/ordenes" element={<GestionOrdenes />} />
        <Route path="/admin/orden/:id" element={<DetalleOrdenAdmin />} />

      </Routes>
    </Router>
  );
}

export default App;