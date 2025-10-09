import { useState } from "react";

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarEmail(email)) {
      setError("Ingrese un email válido.");
      setMensaje("");
      return;
    }
    setError("");
    setMensaje("Se ha enviado un enlace de recuperación a su correo (simulado).");
  };

  return (
    <div className="recuperar-container">
      <h2 className="recuperar-title">Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit} className="recuperar-form">
        <label>Email registrado</label>
        <input
          className="recuperar-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="usuario@correo.com"
        />
        {error && <p className="recuperar-error">{error}</p>}
        {mensaje && <p className="recuperar-success">{mensaje}</p>}
        <button type="submit" className="recuperar-btn">Enviar enlace de recuperación</button>
      </form>
    </div>
  );
};

export default RecuperarContraseña;
