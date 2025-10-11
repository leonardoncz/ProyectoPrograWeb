import React, { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => {
    const guardado = localStorage.getItem('carritoItems');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [guardados, setGuardados] = useState(() => {
    const guardado = localStorage.getItem('guardadosItems');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carritoItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('guardadosItems', JSON.stringify(guardados));
  }, [guardados]);

  // Funciones para manipular el carrito
  const agregarAlCarrito = (producto) => {
    setItems(prevItems => {
      const existe = prevItems.find(item => item.id === producto.id);
      if (existe) {
        return prevItems.map(item =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...producto, quantity: 1 }];
    });
  };

  const modificarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === productoId ? { ...item, quantity: nuevaCantidad } : item
        )
      );
    }
  };

  const eliminarDelCarrito = (productoId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productoId));
  };
  
  const moverAGuardados = (productoId) => {
    const itemAMover = items.find(item => item.id === productoId);
    if (itemAMover) {
      setGuardados(prev => [...prev, itemAMover]);
      eliminarDelCarrito(productoId);
    }
  };

  const limpiarCarrito = () => {
    setItems([]);
  };

  return (
    <CarritoContext.Provider value={{
      items,
      guardados,
      agregarAlCarrito,
      modificarCantidad,
      eliminarDelCarrito,
      moverAGuardados,
      limpiarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
}