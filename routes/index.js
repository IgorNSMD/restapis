const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')

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



    /*** PRODUCTOS */

    // Agrega nuevo producto via POST
    router.post('/productos', productosController.nuevoProducto)


    // Obtener metodo GET
    router.get('/productos', productosController.mostrarProductos)

    // Muestra cliente en especifico
    router.get('/productos/:idProducto', productosController.mostrarProducto)

    // Actualizar Cliente
    router.put('/productos/:idProducto', productosController.actualizarProducto)

    // Eliminar Cliente
    router.delete('/productos/:idProducto', productosController.eliminarProducto)



    return router;
}