const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController');

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
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
        )


    // Obtener metodo GET
    router.get('/productos', productosController.mostrarProductos)

    // Muestra cliente en especifico
    router.get('/productos/:idProducto', productosController.mostrarProducto)

    // Actualizar Producto
    router.put('/productos/:idProducto', 
        productosController.subirArchivo,
        productosController.actualizarProducto)

    // Eliminar Producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto)

    // Busqueda de Productos
    router.post('/productos/busqueda/:query',
        productosController.buscarProducto);

    /*** PEDIDOS */
    
    // Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', 
        pedidosController.nuevoPedido);

    // mostrar todos los pedidos
    router.get('/pedidos', 
        pedidosController.mostrarPedidos);

    // Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido',
    pedidosController.mostrarPedido);

    // Actualizar pedidos
    router.put('/pedidos/:idPedido', 
    pedidosController.actualizarPedido);

    // Elimina un pedido
    router.delete('/pedidos/:idPedido', 
    pedidosController.eliminarPedido);

    return router;
}