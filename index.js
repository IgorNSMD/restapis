const express = require('express')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos

const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;



mongoose.connect('mongodb://localhost:27017/restapis',{
    useNewUrlParser: true
});



//crear el servidor
const app = express()

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Habilitar cors
app.use(cors());

//Ruta de la app
app.use('/', routes())

// puerto
app.listen(5000)