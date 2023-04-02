const Productos = require('../models/Productos')

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    limits : { fileSize : 100000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'/../uploads/');
        },
        filename : (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }), 
    fileFilter(req, file, next) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //el formato es valido
            next(null, true);
        } else {
            // el formato no es valido
            next(new Error('Formato no válido'), false);
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

// sube imagen en el servidor
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        next();
    })
}

//agrega un nuevo Producto
exports.nuevoProducto = async (req,res, next) => {
    console.log(req.body)

    const Producto = new Productos(req.body)

    try {

        if (req.file){
            Producto.imagen = req.file.filename
        }

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

        const productos = await Productos.find({})
        res.json(productos)
        
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

        let productoAnterior = await Productos.findById(req.params.idProducto);

        let nuevoProducto = req.body;

        // verificar si hay una imagen nueva
        if (req.file){
            nuevoProducto.imagen = req.file.filename
        } else {
            nuevoProducto.imagen = productoAnterior.imagen
        }

        let Producto = await Productos.findOneAndUpdate({ _id:req.params.idProducto },
            nuevoProducto, {
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

exports.buscarProducto = async (req, res, next) => {
    try {
        // obtener el query
        const { query } = req.params;
        const producto = await Productos.find({ nombre: new RegExp(query, 'i') });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}