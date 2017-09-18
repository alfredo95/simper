const express = require('express');
const router = express.Router();
const config = require('../config/db');
const operacion = require('../models/operacion');
const Promise = require("bluebird");

router.post('/register', (req, res, next) => {

  Promise.resolve()
  .then(function () {
    var json = req.body;
    return operacion.addOperacion(json);
  })
  .then(function () {
    var idProducto = req.body.Producto_idProducto
  	var idZona = req.body.Zona_idZonas
  	var idProyecto = req.body.Proyecto_idProyecto
  	var idUsuario = req.body.Usuario_idUsuario
  	var numPeriodo = req.body.numPeriodo

    return operacion.getOperacion(idProducto,idZona,idProyecto,idUsuario,numPeriodo);
  })
  .then(function (rows) {

    res.json({success: true, datos:rows, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.error("got error: " + err);
    if (err instanceof Error) {
      res.status(400).send("Error general");
      console.log(err);
    } else {
      res.status(200).json({ "code": 1000, "message": err });
    }
  });
});

router.post('/modify', (req, res, next) => {

  Promise.resolve()
  .then(function () {
    var idProducto = req.body.Producto_idProducto;
  	var idZona = req.body.Zona_idZonas;
  	var idProyecto = req.body.Proyecto_idProyecto;
  	var idUsuario = req.body.Usuario_idUsuario;
  	var numPeriodo = req.body.numPeriodo;
    var uniAlmacenadas = req.body.unidadesAlmacenadas;
    var uniVendidas = req.body.unidadesVendidas;

    return operacion.updateOperacion(idProducto,idZona,idProyecto,idUsuario,numPeriodo,uniAlmacenadas,uniVendidas);
  })
  .then(function () {
    res.json({success: true, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.error("got error: " + err);
    if (err instanceof Error) {
      res.status(400).send("Error general");
      console.log(err);
    } else {
      res.status(200).json({ "code": 1000, "message": err });
    }
  });
});

module.exports = router;
