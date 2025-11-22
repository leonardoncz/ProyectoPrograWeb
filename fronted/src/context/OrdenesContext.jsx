import React, { createContext, useState, useContext, useEffect } from 'react';

export const OrdenesContext = createContext();

export const useOrdenes = () => {
  return useContext(OrdenesContext);
};

export const OrdenesProvider = ({ children }) => {
  const [ordenes, setOrdenes] = useState([]);

  // Cargar órdenes al inicio
  useEffect(() => {
    fetch('http://localhost:3000/api/orders')
      .then(res => res.json())
      .then(data => setOrdenes(data))
      .catch(err => console.error(err));
  }, []);

  const agregarOrden = async (nuevaOrden) => {
    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaOrden)
      });
      const data = await response.json();
      setOrdenes(prev => [...prev, data]);
    } catch (error) {
      console.error("Error creando orden", error);
    }
  };

  const cancelarOrden = async (ordenId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${ordenId}/cancel`, {
        method: 'PUT'
      });
      const data = await response.json();

      setOrdenes(prevOrdenes =>
        prevOrdenes.map(orden =>
          orden.id === ordenId ? data : orden
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  const value = {
    ordenes,
    agregarOrden,
    cancelarOrden,
  };

  return (
    <OrdenesContext.Provider value={value}>
      {children}
    </OrdenesContext.Provider>
  );
};