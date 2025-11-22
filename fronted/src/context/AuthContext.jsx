import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Mantenemos la sesión si recarga la página (esto lee del navegador, no del backend)
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Si el backend responde OK, guardamos la sesión
      localStorage.setItem('usuarioLogueado', JSON.stringify(data));
      setUsuario(data);
      return data;
    } catch (error) {
      throw error; // Lanzamos el error para que el componente Login lo muestre
    }
  };

  const registro = async (datosUsuario) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosUsuario)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrarse");
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('usuarioLogueado');
    setUsuario(null);
  };
  
  // Nota: Funciones auxiliares como actualizarPerfil necesitarían su propia ruta en backend
  // Por ahora las dejaremos como placeholder o conectadas parcialmente
  const actualizarPerfil = async (data) => {
      // Aquí deberías llamar a PUT /api/auth/update/:id
      // Implementación pendiente de conectar
      console.log("Actualizar perfil pendiente de conectar a API");
  };
  
  const verificarEmailExistente = () => Promise.resolve(); // Placeholder
  const recuperarContraseña = () => Promise.resolve(); // Placeholder

  const value = {
    usuario,
    login,
    logout,
    registro,
    actualizarPerfil,
    verificarEmailExistente,
    recuperarContraseña,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;