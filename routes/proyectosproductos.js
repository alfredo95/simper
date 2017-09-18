const express = require('express');
const router = express.Router();
const config = require('../config/db');
const proyectoProducto = require('../models/proyectoproducto');
const producto = require('../models/producto');
const Promise = require("bluebird");

router.post('/desarrolloproducto', (req, res, next) => {
  Promise.resolve().then(function () {
      var json = req.body;
      return proyectoProducto.addProyectoProducto(json);
  })
  .then(function () {
    var id = req.body.Proyectos_idProyecto;
    return proyectoProducto.getProductosEnDesarrollo(id);
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

router.post('/pagardesarrollo', (req, res, next) => {
  Promise.resolve().then(function () {
    console.log("Penny",req.body);
    var idProyecto = req.body.Proyectos_idProyecto;
    var idProducto = req.body.Productos_idProducto;
    var ultimoPeriodo = req.body.ultimoPeriodoDes;
    return proyectoProducto.updateProyectoProducto(idProyecto,idProducto,ultimoPeriodo);
  })
var idProyecto = req.body.Proyectos_idProyecto;
var idProducto = req.body.Productos_idProducto;

  Promise.join(proyectoProducto.getTiempoDes(idProducto),proyectoProducto.getPeriodosDes(idProyecto,idProducto),
    function(tiempo, periodo) {
      console.log("tiempo: " + tiempo[0].tiempoDes);
      console.log("periodo: "+ periodo[0].periodosDes);
      var tiempoDes = tiempo[0].tiempoDes;
      var periodosDes = periodo[0].periodosDes;
      return comparaTiempos(tiempoDes,periodosDes);
      //return periodosDes;
    })
  .then(function (periodosDes) {
    var idProyecto = req.body.Proyectos_idProyecto;
    var idProducto = req.body.Productos_idProducto;
    //var desarrollado = data.desarrollado;
    var periodos = periodosDes;
    console.log("periodos: "+periodos);
    return proyectoProducto.updateDesarrolladoPeriodos(periodos,idProyecto,idProducto);
   })
//regreso datos
  .then(function () {
    var idProyecto = req.body.Proyectos_idProyecto;
    return proyectoProducto.getProductosEnDesarrollo(idProyecto);
  })
  .then(function(datos){
    res.json({success: true, datos:datos, msg:"Operacion exitosa"});
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

//productos que se encuentran en la tabla producto pero que no se encuentran
// en proyectoProducto, e.i , aquellos productos que no se han desarrollado
// ni estan en desarrollo
router.get('/getproductossindesarrollar/:idProyecto', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var idProyecto = req.params.idProyecto;
      return proyectoProducto.productosSinDesarrollar(idProyecto);
  })
  .then(function (data) {
      res.json({success: true,datos:data, msg:"Operacion exitosa"});
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

//productos en vías de desarrollo, e.i, desarrollo = 0
router.get('/getproductosendesarrollo/:idProyecto', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var idProyecto = req.params.idProyecto;
      return proyectoProducto.getProductosEnDesarrollo(idProyecto);
  })
  .then(function (data) {
      res.json({success: true,datos:data, msg:"Operacion exitosa"});
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

//Productos que ya están desarrollados (desarrollado = 1)
router.get('/getproductosdesarrollados/:idProyecto', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var idProyecto = req.params.idProyecto;
      return proyectoProducto.getProductosDesarrollados(idProyecto);
  })
  .then(function (data) {
      res.json({success: true,datos:data, msg:"Operacion exitosa"});
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

//Actualiza el valor de desarrollado de 0 (no desarrollado) a 1 (desarrollado)
router.post('/desarrollado', (req, res, next) => {
  Promise.resolve().then(function () {
      var idProyecto = req.body.Proyectos_idProyecto;
      var idProducto = req.body.Productos_idProducto;
      console.log(idProyecto,idProducto);
      var desarrollado = 1;
      return proyectoProducto.desarollado(idProyecto, idProducto, desarrollado);
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

router.get('/getterminados/:idProyecto', (req, res, next) => {
  Promise.resolve().then(function () {
    return proyectoProducto.getTerminados(req.params.idProyecto);
  }).then( function (rows) {
    console.log("Perro",rows);
    res.json({success: true, datos:rows, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.error("got error: " + err);
    res.json({success: false, msg:"Operacion incompleta"});
  });
});

router.post('/operacionespagardesarrollo', (req, res, next) => {
  Promise.resolve().then(function () {
    var idProyecto = req.body.idProyecto;
    var numPeriodo = req.body.numeroPeriodo;
    return proyectoProducto.getBalance(idProyecto,numPeriodo);
  })
  .then(function (rows) {
    var costoDesProd = req.body.costoDes;
    var idProyecto = req.body.idProyecto;
    var numPeriodo = req.body.numeroPeriodo;
    console.log("cajaBancos 1: "+rows[0].cajaBancos);
    var saldoF = saldoFinal(rows[0].cajaBancos,costoDesProd);
    var IVAPorEnterarProd = IVAPorEnterarProducto(rows[0].IVAPorEnterar,costoDesProd);
    var utilidadEjercicioProd = utilidadEjercicioProducto(rows[0].utilidadAcum,costoDesProd);

    return proyectoProducto.updateBalance(idProyecto,numPeriodo,saldoF,IVAPorEnterarProd,utilidadEjercicioProd);

  })
  .then(function(){
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

//validaciones
function comparaTiempos(tiempoDes,periodosDes) {
    var desarrollado;
    var json;
    console.log("tiempoDes: "+tiempoDes);
    console.log("periodosDes: "+periodosDes);

    if (tiempoDes == periodosDes) {//si son iguales el desarrollado ha sido completado
        periodosDes = tiempoDes;
    }else {
        periodosDes = aumentaPeriodos(periodosDes);//de lo contrario, aumenta periodosDes en 1
      }
    return periodosDes;
}

function aumentaPeriodos(periodos) {
    var aumenta = 1;
    periodos = periodos + aumenta;
    return periodos;
}

//operaciones del balance
function gastosVenta(costoDesProd){
  var gtosVenta = (costoDesProd) + IVAPorGastosDeVentaProducto(costoDesProd);
  return gtosVenta;
}

function saldoFinal(cajabanco,costoDesProd) {
  var gastosDeVenta = gastosVenta(costoDesProd);//2,300,000
  var iva = (IVAPorGastosDeVentaProducto(costoDesProd)/(12))*11;//275,000
  var totalSalidas = gastosDeVenta - iva; //2,025,000
  var saldoF = (cajabanco) - (totalSalidas);
  return saldoF;
}

//300,000
function IVAPorGastosDeVentaProducto(costoDesProd){
  var costoDesProd = costoDesProd*0.15;
  return costoDesProd;
}

//-25,000 sacas IVAPorEnterar de balance y le restas esto
function IVAPorEnterarProducto(IVAPorEnterar,costoDesProd) {
  var IVAPorEnterarProducto = IVAPorEnterar - (IVAPorGastosDeVentaProducto(costoDesProd)/(12));
  return IVAPorEnterarProducto;
}

//-2,000,000
function utilidadEjercicioProducto(utilidadAcum,costoDesProd) {
  var utilidadProd = utilidadAcum - costoDesProd;
  return utilidadProd;
}
module.exports = router;
