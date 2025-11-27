import React, { createContext, useState, useContext, useEffect } from 'react';

const MascotasContext = createContext();

export const useMascotas = () => {
  return useContext(MascotasContext);
};

const URL = "https://testserverapi1-gchyazccfebqdwhq.centralus-01.azurewebsites.net";

const MascotasProvider = ({ children }) => {
  // 1. Iniciamos con un array vacío, ya no leemos de localStorage directamente
  const [mascotas, setMascotas] = useState([]);

  // 2. useEffect para cargar las mascotas desde el Backend al iniciar
  useEffect(() => {
    fetch(`${URL}/api/products`)
      .then(response => response.json())
      .then(data => setMascotas(data))
      .catch(error => console.error("Error cargando mascotas:", error));
  }, []);

  const agregarMascota = async (nuevaMascota) => {
    try {
      // Nota: Como no estamos usando Multer para subir archivos,
      // asegúrate de que 'nuevaMascota.image' sea un string (URL) y no un objeto File por ahora.
      const response = await fetch(`${URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaMascota)
      });
      
      if (!response.ok) throw new Error('Error al guardar en backend');
      
      const mascotaGuardada = await response.json();
      setMascotas(prev => [...prev, mascotaGuardada]);
      return mascotaGuardada;
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  const actualizarMascota = async (mascotaActualizada) => {
    try {
      const response = await fetch(`${URL}/api/products/${mascotaActualizada.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mascotaActualizada)
      });

      const data = await response.json();
      
      setMascotas(prev => 
        prev.map(m => m.id === data.id ? data : m)
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarMascota = async (id) => {
    try {
      await fetch(`${URL}/api/products/${id}`, {
        method: 'DELETE'
      });
      setMascotas(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getMascotaById = (id) => {
    // Nota: Aseguramos comparar números con números
    return mascotas.find(mascota => mascota.id == id);
  };

  const getMascotasPorCategoria = (categoriaId) => {
    return mascotas.filter(mascota => mascota.categoriaId == categoriaId);
  };

  const value = {
    mascotas,
    agregarMascota,
    actualizarMascota,
    eliminarMascota,
    getMascotaById,
    getMascotasPorCategoria
  };

  return (
    <MascotasContext.Provider value={value}>
      {children}
    </MascotasContext.Provider>
  );
};

export default MascotasProvider;