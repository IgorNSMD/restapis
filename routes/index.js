const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')

module.exports = function() {
    router.get('/', (req,res) => {
        res.send('inicio...')
    })
    
    // Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente)


    // Obtener metodo GET
    router.get('/clientes', clienteController.mostrarClientes)

    // Muestra cliente en especifico
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)

    return router;
}