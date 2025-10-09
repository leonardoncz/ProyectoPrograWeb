import { useState } from "react";

const EditarPerfil = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    passwordActual: "",
    nuevaPassword: "",
    confirmarNuevaPassword: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarEmail(form.email)) {
      setError("Email no válido");
      setMensaje("");
      return;
    }

    if (form.nuevaPassword || form.confirmarNuevaPassword) {
      if (form.nuevaPassword.length < 6) {
        setError("La nueva contraseña debe tener al menos 6 caracteres");
        setMensaje("");
        return;
      }
      if (form.nuevaPassword !== form.confirmarNuevaPassword) {
        setError("Las nuevas contraseñas no coinciden");
        setMensaje("");
        return;
      }
      if (!form.passwordActual) {
        setError("Debe ingresar la contraseña actual para cambiarla");
        setMensaje("");
        return;
      }
    }

    setError("");
    setMensaje("Perfil actualizado correctamente (simulado)");
  };

  return (
    <div className="editar-container">
      <h2 className="editar-title">Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="editar-form">
        <label>Nombre</label>
        <input
          className="editar-input"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          placeholder="Tu nombre"
        />
        <label>Email</label>
        <input
          className="editar-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="usuario@correo.com"
        />
        <label>Contraseña Actual</label>
        <input
          className="editar-input"
          type="password"
          name="passwordActual"
          value={form.passwordActual}
          onChange={handleChange}
          placeholder="Tu contraseña actual"
        />
        <label>Nueva Contraseña</label>
        <input
          className="editar-input"
          type="password"
          name="nuevaPassword"
          value={form.nuevaPassword}
          onChange={handleChange}
          placeholder="Al menos 6 caracteres"
        />
        <label>Confirmar Nueva Contraseña</label>
        <input
          className="editar-input"
          type="password"
          name="confirmarNuevaPassword"
          value={form.confirmarNuevaPassword}
          onChange={handleChange}
          placeholder="Repite la nueva contraseña"
        />
        {error && <p className="editar-error">{error}</p>}
        {mensaje && <p className="editar-success">{mensaje}</p>}
        <button type="submit" className="editar-btn">Actualizar Perfil</button>
      </form>
    </div>
  );
};

export default EditarPerfil;
