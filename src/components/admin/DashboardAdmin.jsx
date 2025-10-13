import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ordenesData from "../../data/ordenes.json";
import usuariosData from "../../data/usuarios.json";
import "../admin/DashboardAdmin.css";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const hoy = new Date().toISOString().split("T")[0];
  const [fechaInicio, setFechaInicio] = useState(hoy);
  const [fechaFin, setFechaFin] = useState(hoy);
  const [resumen, setResumen] = useState({
    totalOrdenes: 0,
    totalIngresos: 0,
    nuevosUsuarios: 0,
  });
  const [graficoDatos, setGraficoDatos] = useState([]);

  const parsearFecha = (str) => {
    const [d, m, y] = str.split("/").map(Number);
    return new Date(y, m - 1, d);
  };

  useEffect(() => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    const ordenesFiltradas = ordenesData.filter((o) => {
      const fechaOrden = parsearFecha(o.fecha);
      return fechaOrden >= inicio && fechaOrden <= fin;
    });

    const totalOrdenes = ordenesFiltradas.length;
    const totalIngresos = ordenesFiltradas.reduce((acc, o) => acc + parseFloat(o.total), 0);

    const nuevosUsuarios = usuariosData.filter((u) => {
      const ultimaOrden = u.ordenes?.[u.ordenes.length - 1];
      if (!ultimaOrden) return false;
      const fechaOrden = new Date(ultimaOrden.fecha);
      return fechaOrden >= inicio && fechaOrden <= fin;
    }).length;

    setResumen({ totalOrdenes, totalIngresos, nuevosUsuarios });

    const agrupado = {};
    ordenesFiltradas.forEach((o) => {
      agrupado[o.fecha] = (agrupado[o.fecha] || 0) + parseFloat(o.total);
    });

    const datosGrafico = Object.entries(agrupado).map(([fecha, total]) => ({
      fecha,
      total,
    }));

    setGraficoDatos(datosGrafico);
  }, [fechaInicio, fechaFin]);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Dashboard del Administrador</h2>

      {/* FILTRO DE FECHAS */}
      <div className="admin-filter-bar">
        <label>
          Desde:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="admin-filter-input"
          />
        </label>
        <label>
          Hasta:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="admin-filter-input"
          />
        </label>
      </div>

      <div className="dashboard-main-flex">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Órdenes</h3>
            <p>{resumen.totalOrdenes}</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate("/gestionproductos")}>
            <h3>Productos</h3>
            <p>Ir a Gestión</p>
          </div>
          <div className="dashboard-card" onClick={() => navigate("/gestioncategorias")}>
            <h3>Categorías</h3>
            <p>Ir a Gestión</p>
          </div>
          <div className="dashboard-card">
            <h3>Ingresos Totales</h3>
            <p>${resumen.totalIngresos.toFixed(2)}</p>
          </div>
          <div className="dashboard-card">
            <h3>Usuarios Nuevos</h3>
            <p>{resumen.nuevosUsuarios}</p>
          </div>
        </div>

        <div className="dashboard-chart">
          <h3>Ingresos por día</h3>
          {graficoDatos.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graficoDatos} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="dashboard-no-data">No hay datos en el rango seleccionado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
