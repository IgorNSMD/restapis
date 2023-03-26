const Productos = require('../models/Productos')

//agrega un nuevo Producto
exports.nuevoProducto = async (req,res, next) => {
    console.log(req.body)

    const Producto = new Productos(req.body)

    try {

        // almacenar registro
        await Producto.save();
        res.json({
            mensaje:'Se agrego nuevo Producto'
        })

    } catch (error) {
        // si hay un error
        console.log(error)
        next();
    }
}

//Muestra todos los Productos
exports.mostrarProductos = async (req,res, next) => {
    try {

        const Productos = await Productos.find({})
        res.json(Productos)
        
    } catch (error) {
        // si hay un error
        console.log(error)
        next();      
    }
}

//Muestra un Producto por su id
exports.mostrarProducto = async (req,res, next) => {
    const Producto = await Productos.findById(req.params.idProducto)

    if (!Producto){
        res.json({mensaje: 'Ese Producto no existe...'})
        next()
    }

    // Mostrar el Producto
    res.json(Producto);

}

// Actualiza su Producto por ID
exports.actualizarProducto = async (req,res,next) => {

    try {
        const Producto = await Productos.findOneAndUpdate({ _id:req.params.idProducto },
            req.body, {
                new: true
            });
        res.json(Producto)
    } catch (error) {
        // si hay un error
        console.log(error)
        next();        
    }
    
}

// Eliminar Producto por su ID
exports.eliminarProducto = async (req,res,next) => {
    try {

        await Productos.findOneAndDelete({ _id:req.params.idProducto })
        res.json({
            mensaje:' Producto Eliminado'
        })
    } catch (error) {
        // si hay un error
        console.log(error)
        next();             
    }
}