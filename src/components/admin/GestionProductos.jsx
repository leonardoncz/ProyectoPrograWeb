// GestionProductos.jsx
import { useState } from "react";
import DetalleProducto from "./DetalleProducto";
import productosData from "../../data/productos.json";
import "../admin/Gestionproductos.css";

const ITEMS_POR_PAGINA = 10;

const GestionProductos = () => {
  const [productos, setProductos] = useState(productosData);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState("");

  const handleAbrirDetalle = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleCerrarDetalle = () => {
    setProductoSeleccionado(null);
  };

  const handleGuardarDetalle = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
    );
  };

  const productosFiltrados = productos.filter(
    (p) =>
      p.name.toLowerCase().includes(filtro.toLowerCase()) ||
      p.type.toLowerCase().includes(filtro.toLowerCase()) ||
      p.id.toString() === filtro
  );

  // Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA);
  const productosPagina = productosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  const handleCambiarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPaginaActual(num);
    }
  };

  return (
    <div className="productos-container">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      {/* Filtro y botón agregar */}
      <div className="productos-filtro">
        <input
          type="text"
          placeholder="Filtrar por nombre, tipo o ID..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button className="btn-agregar">Agregar Producto</button>
      </div>

      {/* Tabla de productos */}
      <table className="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Raza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosPagina.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>
                <img
                  src={producto.image}
                  alt={producto.name}
                  className="producto-img"
                />
              </td>
              <td>{producto.name}</td>
              <td>{producto.type}</td>
              <td>{producto.breed}</td>
              <td>
                <button
                  onClick={() => handleAbrirDetalle(producto)}
                  className="btn-agregar"
                >
                  Detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="productos-paginacion">
        <button
          onClick={() => handleCambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleCambiarPagina(i + 1)}
            disabled={i + 1 === paginaActual}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handleCambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>

      {/* Modal de detalle */}
      {productoSeleccionado && (
        <DetalleProducto
          producto={productoSeleccionado}
          onClose={handleCerrarDetalle}
          onGuardar={handleGuardarDetalle}
        />
      )}
    </div>
  );
};

export default GestionProductos;
