const express = require('express');
const router = express.Router();
const { getOrdenes, createOrden, cancelarOrden } = require('../controllers/ordenController');

router.get('/', getOrdenes);
router.post('/', createOrden);
router.put('/:id/cancel', cancelarOrden);

module.exports = router;