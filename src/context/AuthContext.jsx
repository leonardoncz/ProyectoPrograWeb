import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);

  // Cargar usuarios desde localStorage al iniciar la app
  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuariosRegistrados(usuariosGuardados);
  }, []);

  // Función para registrar un nuevo usuario
  const registro = async (datosUsuario) => {
    const emailExistente = usuariosRegistrados.find(u => u.email === datosUsuario.email);
    if (emailExistente) {
      throw new Error("Este correo electrónico ya está registrado.");
    }
    const nuevosUsuarios = [...usuariosRegistrados, datosUsuario];
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    setUsuariosRegistrados(nuevosUsuarios);
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    const usuarioEncontrado = usuariosRegistrados.find(u => u.email === email);
    if (!usuarioEncontrado) {
      throw new Error("El correo electrónico no está registrado.");
    }
    if (usuarioEncontrado.password !== password) {
      throw new Error("La contraseña es incorrecta.");
    }
    setUsuario(usuarioEncontrado);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuario(null);
  };

  // Función para recuperación de contraseña
  const recuperarContraseña = async (email, nuevaPassword) => {
    const emailExistente = usuariosRegistrados.find(u => u.email === email);
    if (!emailExistente) {
     throw new Error("El correo electrónico no está registrado.");
    }
    
    // Si la contraseña es 'temp_password_check', solo estamos validando, no actualizamos
    if (nuevaPassword === 'temp_password_check') {
        return; // Éxito, el correo existe
    }

    const usuariosActualizados = usuariosRegistrados.map(u => {
      if (u.email === email) {
        return { ...u, password: nuevaPassword }; // Actualiza la contraseña
      }
      return u;
    });

    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    setUsuariosRegistrados(usuariosActualizados);
  };


  const value = {
    usuario,
    login,
    logout,
    registro,
    recuperarContraseña,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

