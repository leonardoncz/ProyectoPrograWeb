import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// CORRECCIÓN: Se usan rutas relativas para máxima compatibilidad.
import { useAuth } from '../../context/AuthContext';
import './AuthForms.css';

const RecuperarContraseña = () => {
  const [email, setEmail] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Controla el paso del formulario
  const { recuperarContraseña } = useAuth();
  const navigate = useNavigate();

  // Paso 1: Validar el correo electrónico
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      // Usamos la función de recuperación para validar si el email existe.
      // Le pasamos una contraseña temporal que no se usará.
      await recuperarContraseña(email, 'temp_password_check');
      
      setStep(2); // Avanzar al siguiente paso
    } catch (err) {
      setError("No se encontró ninguna cuenta asociada a este correo electrónico.");
    }
  };

  // Paso 2: Cambiar la contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (nuevaPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (nuevaPassword !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await recuperarContraseña(email, nuevaPassword);
      setMensaje("¡Contraseña actualizada con éxito! Ya puedes iniciar sesión.");
      // Opcional: Redirigir al login después de unos segundos
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError("Ocurrió un error al actualizar la contraseña.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        {step === 1 ? (
          // --- FORMULARIO DEL PASO 1: INGRESAR CORREO ---
          <>
            <h2 className="auth-title">Recuperar Contraseña</h2>
            <p className="auth-subtitle">Ingresa tu correo para buscar tu cuenta.</p>
            {mensaje && !error && <p className="auth-success">{mensaje}</p>}
            <form onSubmit={handleEmailSubmit} className="auth-form">
              <label>Email registrado</label>
              <input
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="usuario@correo.com"
              />
              {error && <p className="auth-error">{error}</p>}
              <button type="submit" className="auth-button recovery-btn">Verificar Correo</button>
            </form>
          </>
        ) : (
          // --- FORMULARIO DEL PASO 2: NUEVA CONTRASEÑA ---
          <>
            <h2 className="auth-title">Crea tu Nueva Contraseña</h2>
            <p className="auth-subtitle">Estás actualizando la contraseña para: <strong>{email}</strong></p>
            {mensaje && <p className="auth-success">{mensaje}</p>}
            {!mensaje && // Solo mostrar el form si no hay mensaje final de éxito
              <form onSubmit={handlePasswordSubmit} className="auth-form">
                <label>Nueva Contraseña</label>
                <input
                  className="auth-input"
                  type="password"
                  value={nuevaPassword}
                  onChange={(e) => setNuevaPassword(e.target.value)}
                  required
                  placeholder="Mínimo 6 caracteres"
                />
                <label>Confirmar Nueva Contraseña</label>
                <input
                  className="auth-input"
                  type="password"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                  required
                  placeholder="Repite la nueva contraseña"
                />
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button recovery-btn">Actualizar Contraseña</button>
              </form>
            }
          </>
        )}
         <div className="auth-links">
           <p><Link to="/login">Volver a Iniciar Sesión</Link></p>
         </div>
      </div>
    </div>
  );
};

export default RecuperarContraseña;

