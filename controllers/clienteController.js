const Clientes = require('../models/Clientes')

//agrega un nuevo cliente
exports.nuevoCliente = async (req,res, next) => {
    console.log(req.body)

    const cliente = new Clientes(req.body)

    try {

        // almacenar registro
        await cliente.save();
        res.json({
            mensaje:'Se agrego nuevo cliente'
        })

    } catch (error) {
        // si hay un error
        console.log(error)
        next();
    }
}

//Muestra todos los clientes
exports.mostrarClientes = async (req,res, next) => {
    try {

        const clientes = await Clientes.find({})
        res.json(clientes)
        
    } catch (error) {
        // si hay un error
        console.log(error)
        next();      
    }
}

//Muestra un cliente por su id
exports.mostrarCliente = async (req,res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente)

    if (!cliente){
        res.json({mensaje: 'Ese cliente no existe...'})
        next()
    }

    // Mostrar el Cliente
    res.json(cliente);

}