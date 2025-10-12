import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// CORRECCIÓN: Se usan rutas relativas para asegurar la compatibilidad.
import { useAuth } from '../../context/AuthContext'; 
import './AuthForms.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Usar la función de login del context
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      // Intentar iniciar sesión con los datos del formulario
      await login(email, password);
      navigate("/"); // Redirigir a la página principal si el login es exitoso
    } catch (err) {
      // Capturar y mostrar el error del context (ej. credenciales incorrectas)
      setError(err.message);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <h2 className="auth-title">¡Hola de nuevo!</h2>
        <p className="auth-subtitle">Ingresa para encontrar a tu próximo amigo.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="usuario@correo.com"
          />
          <label>Contraseña</label>
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Tu contraseña"
          />
          {error && <p className="auth-error">{error}</p>}
          {/* Se añade la clase correcta para el botón de login */ }
          <button type="submit" className="auth-button login-btn">Entrar</button>
        </form>
        <div className="auth-links">
          <p><Link to="/recuperar-contraseña">¿Olvidaste tu contraseña?</Link></p>
          <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

