const express = require('express');
const router = express.Router();
const Promise = require("bluebird");
const maquinariaComprada = require('../models/maquinariaComprada');

router.post('/register/:id', (req, res, next) => {
  Promise.resolve().then(function () {
      var json = req.body;
      return maquinariaComprada.addMaquinariaComprada(json);
  }).then(function(){
    return maquinariaComprada.getMaquinariasCompradas(req.params.id);
  }).
  then( function (maqList) {
    res.json({success: true, datos:maqList, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/modify', (req,res,next) => {
  Promise.resolve().then(function () {
    var json = req.body;
    maquinariaComprada.updateMaquinariaComprada(json);
  }).then(function () {
    var id = req.body.Proyectos_idProyecto;
    return maquinariaComprada.getMaquinariasCompradas(id);
  }).then( function (maqList) {
    res.json({success: true, datos:maqList, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.get('/:id', (req, res, next) => {
  Promise.resolve().then(function () {
    return maquinariaComprada.getMaqMaqProyecto(req.params.id);
  }).then( function (data) {
    res.json({success: true, datos:data, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/', (req, res, next) => {
  Promise.resolve().then(function () {
    var idP = req.body.Proyectos_idProyecto;
    var idM = req.body.Maquinaria_idMaquinaria;
    return maquinariaComprada.getMaquinariaComprada(idP, idM);
  }).then( function (rows) {
    res.json({success: true, datos:rows[0], msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/compra', (req, res, next) => {

var idProyecto = req.body.Proyectos_idProyecto;
var idMaquinaria = req.body.Maquinaria_idMaquinaria;

 Promise.join(maquinariaComprada.getMaquinariasCompradas(idProyecto),
 maquinariaComprada.getMaquinariaComprada(idProyecto, idMaquinaria),function(maqcompradas,maqproyecto) {
      return maqEnMaqProyecto(maqcompradas, maqproyecto);
  })
  .then(function (cantidad) {
    var idProyecto = req.body.Proyectos_idProyecto;
    var idMaquinaria = req.body.Maquinaria_idMaquinaria;
    console.log("cantidad: "+cantidad);
    console.log("idProyecto: "+idProyecto);
    console.log("idMaquinaria: "+idMaquinaria);
    if (cantidad==0) {//agrega con un insert
      console.log("agrega maquinaria");
      var cantidadValor = 1;
      return maquinariaComprada.addMaquinariaProyecto(idProyecto,idMaquinaria,cantidadValor);
    }else {//update a maquinariaproyecto con cantidad
      console.log("Aumenta en 1");
      return maquinariaComprada.updateCantidad(idProyecto,idMaquinaria,cantidad);
    }
  })
  .then(function () {
    var idProyecto = req.body.Proyectos_idProyecto;
    return maquinariaComprada.getMaqMaqProyecto(idProyecto);
  })
  .then( function (rows) {
    res.json({success: true, datos:rows, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

module.exports = router;


function maqEnMaqProyecto(maqcompradas, maqproyecto) {
  var cantidad = 0;
  for (var i = 0; i < maqcompradas.length; i++) {
    for (var j = 0; j < maqproyecto.length; j++) {
      if (maqcompradas[i].Maquinaria_idMaquinaria == maqproyecto[j].Maquinaria_idMaquinaria
         && maqcompradas[i].Proyectos_idProyecto == maqproyecto[j].Proyectos_idProyecto) {
           cantidad = aumentaCantidad(maqproyecto[j].Cantidad);
      }
    }
  }
return cantidad;
}

function aumentaCantidad(cantidad) {
    var aumenta = 1;
    cantidad = cantidad + aumenta;
    return cantidad;
}
