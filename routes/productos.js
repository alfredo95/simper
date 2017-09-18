const express = require('express');
const router = express.Router();
const producto = require('../models/producto');

router.post('/register', (req, res, next) => {
  Promise.resolve().then(function () {
      var nombreProd = req.body.nombreProd;
      var costoDes = req.body.costoDes;
      var tiempoDes = req.body.tiempoDes;
      var costoProd = req.body.costoProd;
      var costosFijosFabri = req.body.costosFijosFabri;
      var costosVarFabri = req.body.costosVarFabri;
      var costoVarUniDist = req.body.costoVarUniDist;
      var gastosFijosAdmon = req.body.gastosFijosAdmon;
      var costosMPPorUniProd = req.body.costosMPPorUniProd;
      var uniMP = req.body.uniMP;
      var costoUni = req.body.costoUni;

      return getJSONProducto(nombreProd,costoDes,tiempoDes,costoProd,costosFijosFabri,costosVarFabri,costoVarUniDist,gastosFijosAdmon,costosMPPorUniProd,uniMP,costoUni);
  })
  .then(function (newProd) {
      return producto.addProducto(newProd);
  }).then(function(){
    //res.json({success: true, msg:"Operacion exitosa"});
    return producto.getProductos();
  }).
  then( function (rows) {
    console.log(rows);
    return toArrayProductos(rows);
  }).
  then( function (productosList) {
    res.json({success: true, datos:productosList, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/modify/:id', (req, res, next) => {
  Promise.resolve().then( function (){
      var nombreProd = req.body.nombreProd;
      var costoDes = req.body.costoDes;
      var tiempoDes = req.body.tiempoDes;
      var costoProd = req.body.costoProd;
      var costosFijosFabri = req.body.costosFijosFabri;
      var costosVarFabri = req.body.costosVarFabri;
      var costoVarUniDist = req.body.costoVarUniDist;
      var gastosFijosAdmon = req.body.gastosFijosAdmon;
      var costosMPPorUniProd = req.body.costosMPPorUniProd;
      var uniMP = req.body.uniMP;
      var costoUni = req.body.costoUni;

      return getJSONProducto(nombreProd,costoDes,tiempoDes,costoProd,costosFijosFabri,costosVarFabri,costoVarUniDist,gastosFijosAdmon,costosMPPorUniProd,uniMP,costoUni);
  })
  .then(function (newProd) {
      var id = req.params.id;
      return producto.updateProducto(newProd, id);
  }).then(function(){
    res.json({success: true, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    res.json({success: false, msg:"Registo incompleto"});
  });
});

router.get('/delete/:id', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var id = req.params.id;
      return producto.deleteProducto(id);
  })
  .then(function () {
      res.json({success: true, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success: false, msg:"Borrado incompleto"});
  });
});

router.get('/', (req, res, next) => {
  Promise.resolve().then(function () {
    return producto.getProductos();
  })
    .then(function (rows) {
      return toArrayProductos(rows);
    })
    .then(function (productosList){
        res.json({datos:productosList});
    })
    .catch(function (err) {
      res.json({msg:"Algo salió mal"});
    });
});

function toArrayProductos(rows) {
    var productosList = [];

    for (var i = 0; i < rows.length; i++) {
      var producto = {
            'idProducto':rows[i].idProducto,
            'nombreProd':rows[i].nombreProd,
            'costoDes':rows[i].costoDes,
            'tiempoDes':rows[i].tiempoDes,
            'costoProd':rows[i].costoProd,
            'costosFijosFabri':rows[i].costosFijosFabri,
            'costosVarFabri':rows[i].costosVarFabri,
            'costoVarUniDist':rows[i].costoVarUniDist,
            'gastosFijosAdmon':rows[i].gastosFijosAdmon,
            'costosMPPorUniProd':rows[i].costosMPPorUniProd,
            'uniMP':rows[i].uniMP,
            'costoUni':rows[i].costoUni
          }
        productosList.push(producto);
    }
  //}
  return productosList;
}

function getJSONProducto(nombreProd,costoDes,tiempoDes,costoProd,costosFijosFabri,costosVarFabri,costoVarUniDist,gastosFijosAdmon,costosMPPorUniProd,uniMP,costoUni) {
  //recibimos datos
  var data = {
    "nombreProd": nombreProd,
    "costoDes": costoDes,
    "tiempoDes": tiempoDes,
    "costoProd": costoProd,
    "costosFijosFabri": costosFijosFabri,
    "costosVarFabri": costosVarFabri,
    "costoVarUniDist": costoVarUniDist,
    "gastosFijosAdmon": gastosFijosAdmon,
    "costosMPPorUniProd": costosMPPorUniProd,
    "uniMP": uniMP,
    "costoUni": costoUni

   };
   return data;
}

module.exports = router;
