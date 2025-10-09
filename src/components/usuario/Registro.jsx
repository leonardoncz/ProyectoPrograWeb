import { useState } from "react";

const Registro = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmarPassword: "",
  });
  const [error, setError] = useState("");

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarEmail(form.email)) {
      setError("Email no válido");
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (form.password !== form.confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    alert("Registro exitoso (simulado)");
  };

  return (
    <div className="registro-container">
      <h2 className="registro-title">Registro</h2>
      <form onSubmit={handleSubmit} className="registro-form">
        <label>Email</label>
        <input
          className="registro-input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="usuario@correo.com"
        />
        <label>Contraseña</label>
        <input
          className="registro-input"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Al menos 6 caracteres"
        />
        <label>Confirmar Contraseña</label>
        <input
          className="registro-input"
          type="password"
          name="confirmarPassword"
          value={form.confirmarPassword}
          onChange={handleChange}
          required
          placeholder="Repite la contraseña"
        />
        {error && <p className="registro-error">{error}</p>}
        <button type="submit" className="registro-btn">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;
