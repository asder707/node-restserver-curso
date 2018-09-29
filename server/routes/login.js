const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login',(req,res)=>{
  let body = req.body;

  Usuario.findOne({email: body.email}, (err, userDB)=>{
    if(err){
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if(!userDB){
      return res.status(404).json({
        ok: false,
        err: {
          message: '(Usuario) o contraseña incorrectos'
        }
      });
    }

    if( !bcrypt.compareSync(body.password,userDB.password)){
      return res.status(404).json({
        ok: false,
        err: {
          message: 'Usuario o (contraseña) incorrectos'
        }
      });
    }


    let token = jwt.sign({
      usuario: userDB //payload del token
    }, 'el-seed-de-desarrollo',
    {expiresIn: process.env.CADUCIDAD_TOKEN})

    res.json({
      ok: true,
      usuario: userDB,
      token
    });


  });

});

module.exports = app;