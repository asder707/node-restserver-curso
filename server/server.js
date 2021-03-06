require('./config/config'); //es lo primero que ejecutará

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //los use son middlewares, se ejecutan siempre por una petición
 
// parse application/json
app.use(bodyParser.json())

//habilitar carpeta public 
let directorio = path.resolve(__dirname,'../public') //por cada directorio lo irá resolviendo
app.use(express.static(directorio));

console.log(); //

// configuracion global de rutas
app.use( require ('./routes/index'));

mongoose.connect(process.env.URLDB,(err,res)=>{
  if(err){
    throw err;
  }
  console.log('Base de datos online');
});
 
app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`);
})