let { ordenes } = require('../data/db');

const getOrdenes = (req, res) => {
    // Podrías filtrar por usuario si viene query param ?userId=...
    res.json(ordenes);
};

const createOrden = (req, res) => {
    const nuevaOrden = {
        ...req.body,
        id: Date.now(),
        estado: "Pendiente" // Estado por defecto
    };
    ordenes.push(nuevaOrden);
    res.status(201).json(nuevaOrden);
};

const cancelarOrden = (req, res) => {
    const orden = ordenes.find(o => o.id == req.params.id);
    if (orden) {
        orden.estado = "Cancelada";
        res.json(orden);
    } else {
        res.status(404).json({ message: "Orden no encontrada" });
    }
};

module.exports = { getOrdenes, createOrden, cancelarOrden };