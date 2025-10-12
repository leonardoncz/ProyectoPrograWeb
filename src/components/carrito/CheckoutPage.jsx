import React, { useState, useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const { limpiarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const handlePagar = (e) => {
    e.preventDefault();

    limpiarCarrito();

    navigate('/confirmacion');
  };

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handlePagar}>
        <h2>Formulario de Envío</h2>
        <input type="text" placeholder="Nombre completo" required />
        <input type="text" placeholder="Dirección de envío" required />
        <input type="email" placeholder="Correo electrónico" required />
        
        <h2>Método de Pago</h2>
        <div className="pago-tabs">
          <button type="button" onClick={() => setMetodoPago('tarjeta')} className={metodoPago === 'tarjeta' ? 'activo' : ''}>Tarjeta</button>
          <button type="button" onClick={() => setMetodoPago('qr')} className={metodoPago === 'qr' ? 'activo' : ''}>QR</button>
        </div>

        {metodoPago === 'tarjeta' && (
          <div className="pago-detalles">
            <input type="text" placeholder="Número de tarjeta" required />
            <input type="text" placeholder="MM/AA" required />
            <input type="text" placeholder="CVC" required />
          </div>
        )}

        {metodoPago === 'qr' && (
          <div className="pago-detalles qr-code">
            <p>Escanea este código para pagar.</p>
            
          </div>
        )}
        
        <button type="submit" className="pagar-btn">Pagar ahora</button>
      </form>
    </div>
  );
}