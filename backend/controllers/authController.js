const { usuarios } = require('../data/db');

const login = (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        if (!usuario.activo) return res.status(403).json({ message: "Cuenta desactivada" });
        // En un app real, aquí generarías un JWT Token
        res.json(usuario);
    } else {
        res.status(401).json({ message: "Credenciales inválidas" });
    }
};

const registro = (req, res) => {
    const { nombre, email, password, pais } = req.body;
    
    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ message: "El email ya existe" });
    }

    const nuevoUsuario = {
        id: Date.now(),
        nombre,
        email,
        password,
        pais,
        rol: "usuario",
        activo: true
    };

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
};

// Actualizar perfil
const actualizarPerfil = (req, res) => {
    const { id } = req.params;
    const { passwordActual, nuevoNombre, nuevoEmail, nuevaPassword } = req.body;
    
    const index = usuarios.findIndex(u => u.id == id);
    if (index === -1) return res.status(404).json({ message: "Usuario no encontrado" });

    const usuario = usuarios[index];

    if (usuario.password !== passwordActual) {
        return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    if (nuevoNombre) usuario.nombre = nuevoNombre;
    if (nuevoEmail) usuario.email = nuevoEmail;
    if (nuevaPassword) usuario.password = nuevaPassword;

    res.json(usuario);
};

module.exports = { login, registro, actualizarPerfil };