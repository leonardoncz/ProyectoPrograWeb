// Simulamos las tablas de la base de datos con Arrays
let usuarios = [
  {
    id: 100,
    nombre: "Admin",
    email: "admin@admin.com",
    password: "admin", // En un caso real, esto iría encriptado
    rol: "admin",
    activo: true,
    pais: "Global"
  },
  {
    id: 101,
    nombre: "Usuario Demo",
    email: "usuario1@correo.com",
    password: "123", 
    rol: "usuario",
    activo: true,
    pais: "Perú"
  }
];

let productos = [
    // Puedes copiar aquí el contenido de tu productos.json inicial
    // Ejemplo:
    { id: 1, name: "Max", type: "Perro", breed: "Golden", price: 150.00, edad: "2 años", image: "https://placedog.net/500", categoriaId: 1, description: "Un perro amigable" }
];

let categorias = [
    { id: 1, nombre: "Perros", descripcion: "Todo para perros", imagen: "", productosAsociados: [1] },
    { id: 2, nombre: "Gatos", descripcion: "Todo para gatos", imagen: "", productosAsociados: [] }
];

let ordenes = [
    {
    id: 500,
    fecha: "1/10/2025",
    usuario: { nombre: "Cliente 1", apellido: "Demo 1" },
    estado: "Cancelada",
    total: "189.56"
  },
  {
    id: 501,
    fecha: "1/10/2025",
    usuario: { nombre: "Cliente 2", apellido: "Demo 2" },
    estado: "Pendiente",
    total: "45.12"
  },
  {
    id: 502,
    fecha: "2/10/2025",
    usuario: { nombre: "Cliente 3", apellido: "Demo 3" },
    estado: "Pendiente",
    total: "210.00"
  },
  {
    id: 503,
    fecha: "2/10/2025",
    usuario: { nombre: "Cliente 4", apellido: "Demo 4" },
    estado: "Enviado",
    total: "88.70"
  },
  {
    id: 504,
    fecha: "10/9/2025",
    usuario: { nombre: "Cliente 5", apellido: "Demo 5" },
    estado: "Completada",
    total: "132.45"
  },
  {
    id: 505,
    fecha: "14/9/2025",
    usuario: { nombre: "Cliente 6", apellido: "Demo 6" },
    estado: "Pendiente",
    total: "76.90"
  },
  {
    id: 506,
    fecha: "21/9/2025",
    usuario: { nombre: "Cliente 7", apellido: "Demo 7" },
    estado: "Enviado",
    total: "244.30"
  },
  {
    id: 507,
    fecha: "25/9/2025",
    usuario: { nombre: "Cliente 8", apellido: "Demo 8" },
    estado: "Cancelada",
    total: "59.80"
  },
  {
    id: 508,
    fecha: "28/9/2025",
    usuario: { nombre: "Cliente 9", apellido: "Demo 9" },
    estado: "Completada",
    total: "188.10"
  },
  {
    id: 509,
    fecha: "4/10/2025",
    usuario: { nombre: "Cliente 10", apellido: "Demo 10" },
    estado: "Pendiente",
    total: "94.25"
  },
  {
    id: 510,
    fecha: "6/10/2025",
    usuario: { nombre: "Cliente 11", apellido: "Demo 11" },
    estado: "Completada",
    total: "173.80"
  },
  {
    id: 511,
    fecha: "8/10/2025",
    usuario: { nombre: "Cliente 12", apellido: "Demo 12" },
    estado: "Enviado",
    total: "67.45"
  },
  {
    id: 512,
    fecha: "10/10/2025",
    usuario: { nombre: "Cliente 13", apellido: "Demo 13" },
    estado: "Completada",
    total: "299.99"
  },
  {
    id: 513,
    fecha: "11/10/2025",
    usuario: { nombre: "Cliente 14", apellido: "Demo 14" },
    estado: "Pendiente",
    total: "120.55"
  }
];

module.exports = { usuarios, productos, categorias, ordenes };