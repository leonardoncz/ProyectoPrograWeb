const express = require('express');
const router = express.Router();
const { login, registro, actualizarPerfil } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', registro);
router.put('/update/:id', actualizarPerfil);

module.exports = router;