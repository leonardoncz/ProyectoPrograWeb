import { useState, useEffect } from "react";
import categoriasData from "../../data/categorias.json";
import productosData from "../../data/productos.json";
import "../admin/GestionCategorias.css";

const GestionCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const categoriasPorPagina = 3;

  useEffect(() => {
    setCategorias(categoriasData);
  }, []);

  // Filtrado por nombre, descripción o id
  const categoriasFiltradas = categorias.filter(
    (c) =>
      c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      c.descripcion.toLowerCase().includes(filtro.toLowerCase()) ||
      c.id.toString().includes(filtro)
  );

  // Paginación
  const indexUltima = paginaActual * categoriasPorPagina;
  const indexPrimera = indexUltima - categoriasPorPagina;
  const categoriasPagina = categoriasFiltradas.slice(indexPrimera, indexUltima);
  const totalPaginas = Math.ceil(categoriasFiltradas.length / categoriasPorPagina);

  const abrirDetalle = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setModalVisible(true);
  };

  const cerrarDetalle = () => {
    setCategoriaSeleccionada(null);
    setModalVisible(false);
  };

  const handleChange = (e) => {
    setCategoriaSeleccionada({
      ...categoriaSeleccionada,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar agregar/quitar productos
  const toggleProducto = (productoId) => {
    const productos = categoriaSeleccionada.productos || [];
    if (productos.includes(productoId)) {
      setCategoriaSeleccionada({
        ...categoriaSeleccionada,
        productos: productos.filter((id) => id !== productoId),
      });
    } else {
      setCategoriaSeleccionada({
        ...categoriaSeleccionada,
        productos: [...productos, productoId],
      });
    }
  };

  const guardarCambios = () => {
    setCategorias((prev) =>
      prev.map((c) => (c.id === categoriaSeleccionada.id ? categoriaSeleccionada : c))
    );
    cerrarDetalle();
  };

  return (
    <div className="categorias-container">
      <h2 className="categorias-title">Gestión de Categorías</h2>

      {/* Filtro y botón agregar */}
      <div className="categorias-filtro">
        <input
          type="text"
          placeholder="Filtrar por nombre, descripción o ID"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button className="btn-agregar">Agregar Categoría</button>
      </div>

      {/* Tabla de categorías */}
      <table className="categorias-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categoriasPagina.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                <img src={c.imagen} alt={c.nombre} className="categoria-img" />
              </td>
              <td>{c.nombre}</td>
              <td>{c.descripcion}</td>
              <td>
                <button className="btn-agregar" onClick={() => abrirDetalle(c)}>
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
          onClick={() => setPaginaActual((p) => p - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={() => setPaginaActual((p) => p + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>

      {/* Modal de detalle */}
      {modalVisible && categoriaSeleccionada && (
        <div className="detalle-categoria-container">
          <h3>Detalle de Categoría</h3>
          <div className="detalle-categoria-form">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={categoriaSeleccionada.nombre}
              onChange={handleChange}
            />
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={categoriaSeleccionada.descripcion}
              onChange={handleChange}
            />
            <label>Imagen URL:</label>
            <input
              type="text"
              name="imagen"
              value={categoriaSeleccionada.imagen}
              onChange={handleChange}
            />
          </div>

          <h4>Productos asociados:</h4>
          <table className="productos-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {productosData.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.image} alt={p.name} className="producto-img" />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.type}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={(categoriaSeleccionada.productos || []).includes(p.id)}
                      onChange={() => toggleProducto(p.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button className="btn-agregar" onClick={guardarCambios}>
              Guardar
            </button>
            <button className="btn-agregar" onClick={cerrarDetalle}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionCategorias;
