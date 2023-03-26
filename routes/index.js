const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')

module.exports = function() {
    router.get('/', (req,res) => {
        res.send('inicio...')
    })
    
    // Agrega nuevo cliente via POST
    router.post('/clientes', clienteController.nuevoCliente)


    // Obtener metodo GET
    router.get('/clientes', clienteController.mostrarClientes)

    // Muestra cliente en especifico
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)

    // Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente)

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)

    return router;
}