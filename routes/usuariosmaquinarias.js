const express = require('express');
const router = express.Router();
const config = require('../config/db');
const usuarioMaquinaria = require('../models/usuariomaquinaria');
const Promise = require("bluebird");

router.post('/register/', (req, res, next) => {
  Promise.resolve().then(function () {
      var dato = req.body;
      return usuarioMaquinaria.addUsuarioMaquinaria(dato);
  })
  .then(function () {
    var idUsuario = req.body.idUsuario;
    return usuarioMaquinaria.getUsuarioMaquinariaByIdUsuario(idUsuario);
  })
  .then(function(rows){
    res.json({success: true, msg:"Operacion exitosa", datos:rows});
  })
  .catch(function (err) {
    console.error("Log error: " + err);
    if (err instanceof Error) {
      res.status(400).send("Error general");
      console.log(err);
    } else {
      res.status(200).json({ "code": 1000, "message": err });
    }
  });
});

router.get('/:idUsuario',(req, res, next) => {
  Promise.resolve().then( function () {
    return usuarioMaquinaria.getUsuarioMaquinariaByIdUsuario(req.params.idUsuario);
  }).then( function (rows) {
    res.json({success:true, datos:rows, msg:"Operacion exitosa"});
  }).catch( function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion fallida"});
  });
});

router.post('/modify/', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var idUsuario = req.body.idUsuario;
      var idAdministrador = req.body.idAdministrador;
      var idProducto = req.body.idProducto;
      var idMaquinaria = req.body.idMaquinaria;
      var cantidad = req.body.cantidad;
      return usuarioMaquinaria.updateUsuarioMaquinaria(idUsuario,idAdministrador,idProducto,idMaquinaria,cantidad);
  })
  .then(function () {
    var idUsuario = req.body.idUsuario;
    return usuarioMaquinaria.getUsuarioMaquinariaByIdUsuario(idUsuario);
  })
  .then(function(rows){
    res.json({success: true, msg:"Operacion exitosa", datos:rows});
  })
  .catch(function (err) {
    console.error("Log error: " + err);
    if (err instanceof Error) {
      res.status(400).send("Error general");
      console.log(err);
    } else {
      res.status(200).json({ "code": 1000, "message": err });
    }
  });
});

router.post('/delete/', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var idUsuario = req.body.idUsuario;
      var idAdministrador = req.body.Administrador_idAdministrador;
      var idProducto = req.body.Producto_idProducto;
      var idMaquinaria = req.body.idMaquinaria;
      return usuarioMaquinaria.deleteUsuarioMaquinaria(idUsuario,idAdministrador,idProducto,idMaquinaria);
  })
  .then(function(){
    res.json({success: true, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.error("Log error: " + err);
    if (err instanceof Error) {
      res.status(400).send("Error general");
      console.log(err);
    } else {
      res.status(200).json({ "code": 1000, "message": err });
    }
  });
});

module.exports = router;
