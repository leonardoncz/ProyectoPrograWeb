import React, { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import "./CarritoPage.css";

export default function CarritoPage() {
  const { items, modificarCantidad, eliminarDelCarrito, moverAGuardados } = useContext(CarritoContext);

  const total = items.reduce((sum, item) => sum + 25 * item.quantity, 0).toFixed(2); // Precio fijo de ejemplo: $25

  return (
    <div className="carrito-container">
      <h1>Tu Carrito de Compras</h1>
      <div className="carrito-layout">
        <div className="carrito-items-lista">
          {items.length === 0 ? (
            <p>No hay productos en tu carrito.</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="carrito-item-card">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Raza: {item.breed}</p>
                  <div className="item-acciones">
                    <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
                    <button onClick={() => moverAGuardados(item.id)}>Guardar para después</button>
                  </div>
                </div>
                <div className="item-cantidad">
                  <button onClick={() => modificarCantidad(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => modificarCantidad(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="carrito-resumen">
          <h2>Resumen del Pedido</h2>
          <p>Total: <strong>${total}</strong></p>
          <Link to="/checkout" className="checkout-link">Proceder al Pago</Link>
        </div>
      </div>
    </div>
  );
}