let { productos } = require('../data/db');

const getProductos = (req, res) => {
    res.json(productos);
};

const getProductoById = (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    if (producto) res.json(producto);
    else res.status(404).json({ message: "Producto no encontrado" });
};

const createProducto = (req, res) => {
    // Nota: Para imágenes reales necesitarás multer. 
    // Por ahora asumimos que el frontend manda una URL de imagen (string).
    const nuevoProducto = {
        id: Date.now(),
        ...req.body
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
};

const updateProducto = (req, res) => {
    const { id } = req.params;
    const index = productos.findIndex(p => p.id == id);
    
    if (index !== -1) {
        productos[index] = { ...productos[index], ...req.body };
        res.json(productos[index]);
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
};

const deleteProducto = (req, res) => {
    const { id } = req.params;
    productos = productos.filter(p => p.id != id);
    // IMPORTANTE: Al reasignar "productos", debemos actualizar la referencia en db.js 
    // o modificar el array in-place. Para listas estáticas simples usaremos splice:
    // (Nota: require importa una referencia, modificar let exportado es complejo en CommonJS puro
    // sin mutar el objeto. Para simplificar, usaremos mutación de array):
    
    // Mejor enfoque para listas en memoria:
    const idx = require('../data/db').productos.findIndex(p => p.id == id);
    if (idx !== -1) {
        require('../data/db').productos.splice(idx, 1);
        res.json({ message: "Eliminado" });
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
};

module.exports = { getProductos, getProductoById, createProducto, updateProducto, deleteProducto };