const express = require('express');
const router = express.Router();
const config = require('../config/db');
const productoZonaProyecto = require('../models/productozonaproyecto');
const producto = require('../models/producto');
const Promise = require("bluebird");

router.post('/desarrollozona/', (req, res, next) => {
  Promise.resolve().then(function () {
      var json = req.body;
      return productoZonaProyecto.addProductoZonaProyecto(json);
  })
  .then(function () {
    var idZona = req.body.Zona_idZonas;
    var idProyecto = req.body.Proyecto_idProyecto;
    var idUsuario = req.body.Proyecto_Usuario_idUsuario;
    return productoZonaProyecto.getProductoZonaProyecto(idZona,idProyecto,idUsuario);
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

router.post('/pagardesarrollozona', (req, res, next) => {
  var idProducto = req.body.Producto_idProducto;
  var idZona = req.body.Zona_idZonas;
  var idProyecto = req.body.Proyecto_idProyecto;
  var idUsuario = req.body.Proyecto_Usuario_idUsuario;

  var ultimoPeriodo = req.body.ultimoPeriodoDes;

  console.log(req.body);

  Promise.join(productoZonaProyecto.getTiempoDesZona(idZona,idProducto),
    productoZonaProyecto.getPeriodosDesProductoZonaProyecto(idProyecto,idProducto,idUsuario,idZona),
    function(tiempo, periodo) {
      console.log("tiempodes Zona: " + tiempo[0].tiempoDes);
      console.log("periodosDes productozonaproyecto: "+ periodo[0].periodosDes);
      var tiempoDes = tiempo[0].tiempoDes;
      var periodosDes = periodo[0].periodosDes;
      return comparaTiempos(tiempoDes,periodosDes);
      //return periodosDes;
    })
  .then(function (periodosDes) {
    var idProducto = req.body.Producto_idProducto;
    var idZona = req.body.Zona_idZonas;
    var idProyecto = req.body.Proyecto_idProyecto;
    var idUsuario = req.body.Proyecto_Usuario_idUsuario;
    var ultimoPeriodo = req.body.ultimoPeriodoDes;
    var periodos = periodosDes;

    console.log("periodos aumentaPeriodos: "+periodos);
    console.log("ultimoPeriodo: "+ultimoPeriodo);
    return productoZonaProyecto.updateProductoZonaProyecto(idProducto,idZona,idProyecto,idUsuario,ultimoPeriodo,periodos);
   })
//regreso datos
  .then(function () {
    return productoZonaProyecto.getProductoZonaProyecto();
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

//Actualiza el valor de desarrollado de 0 (no desarrollado) a 1 (desarrollado)
router.post('/desarrolladoproductozonaproyecto', (req, res, next) => {
  Promise.resolve().then(function () {
      var idProducto = req.body.Producto_idProducto;
      var idZona = req.body.Zona_idZonas;
      var idProyecto = req.body.Proyecto_idProyecto;
      var idUsuario = req.body.Proyecto_Usuario_idUsuario;
      var desarrollado = 1;
      return productoZonaProyecto.desarolladoProductoZonaProyecto(idProducto,idZona,idProyecto,idUsuario,desarrollado);
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

//productos que se encuentran en la tabla producto pero que no se encuentran
// en productozonaproyecto, e.i , aquellos productos que no se han desarrollado
// ni estan en desarrollo
router.post('/productossindesarrollar/', (req, res, next) => {
  var idProyecto = req.body.Proyecto_idProyecto;
  var idUsuario = req.body.Proyecto_Usuario_idUsuario;
  Promise.join(productoZonaProyecto.getProductosSinDesarrollar(idProyecto,idUsuario),
  productoZonaProyecto.getIdZonaSinDes(idProyecto,idUsuario),
  productoZonaProyecto.getZonas(),function(productozonasindes, idszonasindes,zonas) {
      return jsonProductosSinDesarrollar(productozonasindes,idszonasindes,zonas);
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

//productos en vías de desarrollo, e.i, desarrollo = 0
router.post('/productosendesarrollo/', (req, res, next) => {

  var idProyecto = req.body.Proyecto_idProyecto;
  var idUsuario = req.body.Proyecto_Usuario_idUsuario;

  Promise.join(productoZonaProyecto.getProductosEnDesarrollo(idProyecto,idUsuario),
  productoZonaProyecto.getIdZonasEnDes(idProyecto,idUsuario),
  productoZonaProyecto.getZonas(),function(productosendes, idszonasdes,zonas) {
      return jsonProductosEnDesarrollo(productosendes, idszonasdes,zonas);
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

router.get('/terminados/:idProyecto', (req, res, next) => {
  Promise.resolve().then(function () {
    return productoZonaProyecto.getTerminados(req.params.idProyecto);
  }).then( function(rows) {
    res.json({success:true, msg:"Operacion exitosa", datos:rows});
  }).catch( function (err) {
    console.log(err);
    res.json({success:false, msg:"Fallo"});
  })
})

//Productos que ya están desarrollados (desarrollado = 1)
router.post('/productosdesarrollados/', (req, res, next) => {

  var idProyecto = req.body.Proyecto_idProyecto;
  var idUsuario = req.body.Proyecto_Usuario_idUsuario;

  Promise.join(productoZonaProyecto.getProductosDesarrollados(idProyecto,idUsuario),
  productoZonaProyecto.getIdZonasDes(idProyecto,idUsuario),
  productoZonaProyecto.getZonas(),function(productosdes, idszonasdes,zonas) {

      return jsonProductosDesarrollados(productosdes, idszonasdes,zonas);
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

router.post('/zonasporproducto/', (req, res, next) => {
  var idProyecto = req.body.idProyecto;
  var idUsuario = req.body.idUsuario;

  Promise.join(productoZonaProyecto.getIdProductoFromProductoZonaProyecto(),
  productoZonaProyecto.getProductoZonaProyectoByIdProyectoByIdUsuario(idProyecto,idUsuario),
    function(idsProductos,productozonaproyecto) {

      return zonasEnProductosArray(idsProductos,productozonaproyecto);
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

//productozonaproyecto y proyectoProducto
router.post('/desarrollados', (req, res, next) => {
  var idUsuario = req.body.idUsuario;
  var idProyecto = req.body.idProyecto;
  Promise.join(productoZonaProyecto.getIdsZonas(idUsuario,idProyecto), productoZonaProyecto.getDesarrollados(idUsuario,idProyecto),
   function(idszonas, desarrollados) {
      return jsonDesarrollados(idszonas, desarrollados);
    })
  .then(function(rows){
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

//productos desarrollados en productozonaproyecto y proyectoproducto

function jsonDesarrollados(idszonas, desarrollados) {
  var repIdProductosDes = [];//almacena las veces que se repite un idZona en desarrollados
  var i = 0;
  while (i<idszonas.length) {
    var aux = 0;
    for (var j = 0; j < desarrollados.length; j++) {
      if (idszonas[i].Zona_idZonas == desarrollados[j].Zona_idZonas) {
        aux = aux +1;
      }
    }
    repIdProductosDes.push(aux);
    i++;
  }
  // console.log(repIdProductosDes);

  var productosenzonas = [];
  for (var i = 0; i < idszonas.length; i++) {
      var json = {
        "idZona":idszonas[i].Zona_idZonas,
        "productosDes":[]
      }
      productosenzonas.push(json);
    }
//    console.log(productosenzonas);

    var aux2 = 0;
    for (var j = 0; j < repIdProductosDes.length; j++) {
      for (var k = 0; k < (repIdProductosDes[j]); k++) {
        productosenzonas[j]['productosDes'].push(desarrollados[aux2].Producto_idProducto);
       aux2 = aux2 + 1;
      }
    }
    //console.log(productosenzonas);
    return productosenzonas;
}




//PRODUCTOS DESARROLLADOS

function jsonProductosDesarrollados(productosdes, idszonasdes,zonas) {
  var repIdProductosDes = [];//almacena las veces que se repite un idZona en productosdes

  var i = 0;
  while (i<idszonasdes.length) {
    var aux = 0;
    for (var j = 0; j < productosdes.length; j++) {
      if (idszonasdes[i].Zona_idZonas == productosdes[j].Zona_idZonas) {
        aux = aux +1;
      }
    }
    repIdProductosDes.push(aux);
    i++;
  }

//console.log(repIdProductosDes);

var productosDes = []
var k = 0;

while (k < idszonasdes.length) {
  for (var i = 0; i < zonas.length; i++) {
    if (idszonasdes[k].Zona_idZonas == zonas[i].idZona) {
      var json = {
        "idZona":idszonasdes[k].Zona_idZonas,
        "nombreZona":zonas[i].nombreZona,
        "productosDes":[]
      }
    productosDes.push(json);
    }
  }
  k++;
}
//console.log(productosDes);

var aux2 = 0;
for (var j = 0; j < repIdProductosDes.length; j++) {
  for (var k = 0; k < (repIdProductosDes[j]); k++) {
    productosDes[j]['productosDes'].push(productosdes[aux2].Producto_idProducto);
   aux2 = aux2 + 1;
  }
}
//console.log(productosDes);
return productosDes;
}


//PRODUCTOS EN DESARROLLO

function jsonProductosEnDesarrollo(productosendes, idszonasendes,zonas) {
  var repIdProductosEnDes = [];//almacena las veces que se repite un idZona en productosdes

  var i = 0;
  while (i<idszonasendes.length) {
    var aux = 0;
    for (var j = 0; j < productosendes.length; j++) {
      if (idszonasendes[i].Zona_idZonas == productosendes[j].Zona_idZonas) {
        aux = aux +1;
      }
    }
    repIdProductosEnDes.push(aux);
    i++;
  }

//console.log(repIdProductosDes);

var productosEnDes = []
var k = 0;

while (k < idszonasendes.length) {
  for (var i = 0; i < zonas.length; i++) {
    if (idszonasendes[k].Zona_idZonas == zonas[i].idZona) {
      var json = {
        "idZona":idszonasendes[k].Zona_idZonas,
        "nombreZona":zonas[i].nombreZona,
        "productosEnDes":[]
      }
    productosEnDes.push(json);
    }
  }
  k++;
}
//console.log(productosDes);

var aux2 = 0;
for (var j = 0; j < repIdProductosEnDes.length; j++) {
  for (var k = 0; k < (repIdProductosEnDes[j]); k++) {
    productosEnDes[j]['productosEnDes'].push(productosendes[aux2].Producto_idProducto);
   aux2 = aux2 + 1;
  }
}
//console.log(productosDes);
  return productosEnDes;
}


// PRODUCTOS SIN DESARROLLAR

function jsonProductosSinDesarrollar(productozonasindes,idszonasindes,zonas) {

  var repIdProductosSinDes = [];//almacena las veces que se repite un idZona en productozonasindes

  var i = 0;
  while (i<idszonasindes.length) {
    var aux = 0;
    for (var j = 0; j < productozonasindes.length; j++) {
      if (idszonasindes[i].Zona_idZona == productozonasindes[j].Zona_idZona) {
        aux = aux +1;
      }
    }
    repIdProductosSinDes.push(aux);
    i++;
  }
//console.log(repIdProductosSinDes);
var zonaArray = []
var k = 0;

while (k < idszonasindes.length) {
  for (var i = 0; i < zonas.length; i++) {
    if (idszonasindes[k].Zona_idZona == zonas[i].idZona) {
      var json = {
        "idZona":idszonasindes[k].Zona_idZona,
        "nombreZona":zonas[i].nombreZona,
        "productosSinDes":[]
      }
    zonaArray.push(json);
    }
  }
  k++;
}

var aux2 = 0;
for (var j = 0; j < repIdProductosSinDes.length; j++) {
  for (var k = 0; k < (repIdProductosSinDes[j]); k++) {
    zonaArray[j]['productosSinDes'].push(productozonasindes[aux2].Producto_idProducto);
   aux2 = aux2 + 1;
  }
}

console.log(zonaArray);

  return zonaArray;
}



//ZONAS POR PRODUCTO
function zonasEnProductosArray(idsProductos,productozonaproyecto) {
//cuenta cuantas veces se repite un idProducto de productos en productozonaproyecto
  var repIdProductos = [];
  var i = 0;
  while (i < idsProductos.length) {
    var aux = 0;
    for (var j = 0; j < productozonaproyecto.length; j++) {
      if ((idsProductos[i].Producto_idProducto)==(productozonaproyecto[j].Producto_idProducto)) {
        aux = aux + 1;
      }
    }
    repIdProductos.push(aux);
    i++;
  }

var productozonaproyectoArray = [];
for (var i = 0; i < idsProductos.length; i++) {
    var json = {
      "idProducto":idsProductos[i].Producto_idProducto,
      "zonas":[]
    }
    productozonaproyectoArray.push(json);
  }

  var aux2 = 0;
  for (var j = 0; j < repIdProductos.length; j++) {
    for (var k = 0; k < (repIdProductos[j]); k++) {
      productozonaproyectoArray[j]['zonas'].push(productozonaproyecto[aux2].Zona_idZonas);
     aux2 = aux2 + 1;
    }
  }
  console.log(productozonaproyectoArray);
return productozonaproyectoArray;
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

//validaciones
function comparaTiempos(tiempoDes,periodosDes) {
    var desarrollado;
    var json;
    console.log("tiempoDes: "+tiempoDes);
    console.log("periodosDes: "+periodosDes);

    if (tiempoDes == periodosDes) {//si son iguales el desarrollado ha sido completado
      console.log("entra 1");
        periodosDes = tiempoDes;
    }else {
      console.log("entra 2");
        periodosDes = aumentaPeriodos(periodosDes);//de lo contrario, aumenta periodosDes en 1
      }
    return periodosDes;
}

function aumentaPeriodos(periodos) {
    var aumenta = 1;
    periodos = periodos + aumenta;
    return periodos;
}

module.exports = router;
