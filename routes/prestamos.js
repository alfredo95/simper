const express = require('express');
const router = express.Router();
const prestamo = require('../models/prestamo');

router.post('/register', (req, res, next) => {
  Promise.resolve().then(function () {

      var nombrePrestamo = req.body.nombrePrestamo;
      var intereses = req.body.intereses;
      var plazoPago = req.body.plazoPago;
      var monto = req.body.monto;
      var tipoPrestamo = req.body.tipoPrestamo;

      return getJSONPrestamo(nombrePrestamo, intereses, plazoPago, monto, tipoPrestamo);
  })
  .then(function (newPrestamo) {
      return prestamo.addPrestamo(newPrestamo);
  }).then(function(){
    return prestamo.getPrestamos();
  }).
  then( function (rows) {
    return toArrayPrestamo(rows);
  }).
  then( function (prestamoList) {
    res.json({success: true, datos:prestamoList, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/modify/:idPrestamo', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var nombrePrestamo = req.body.nombrePrestamo;
      var intereses = req.body.intereses;
      var plazoPago = req.body.plazoPago;
      var monto = req.body.monto;
      var tipoPrestamo = req.body.tipoPrestamo;
      //console.log("PUT"+idZona);
      return getJSONPrestamo(nombrePrestamo, intereses, plazoPago, monto, tipoPrestamo);
  })
  .then(function (data) {
      var idPrestamo = req.params.idPrestamo;
      return prestamo.updatePrestamo(data,idPrestamo);
  }).then(function(){
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

router.get('/delete/:idPrestamo', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var idPrestamo = req.params.idPrestamo
      return prestamo.deletePrestamo(idPrestamo);
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

router.get('/', (req, res, next) => {
  Promise.resolve().then(function () {
    return prestamo.getPrestamos();
  })
    .then(function (rows) {
      return toArrayPrestamo(rows);
    })
    .then(function (prestamoList){
        res.json(prestamoList);
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

function toArrayPrestamo(rows) {
  var prestamoList = [];

  for(var i = 0; i < rows.length; i++){

    var prestamo = {
      "idPrestamos":rows[i].idPrestamos,
      "nombrePrestamo":rows[i].nombrePrestamo,
      "intereses":rows[i].intereses,
      "plazoPago":rows[i].plazoPago,
      "monto":rows[i].monto,
      "tipoPrestamo":rows[i].tipoPrestamo
      }
      prestamoList.push(prestamo);
  }

  return prestamoList;
}

function getJSONPrestamo(nombrePrestamo, intereses, plazoPago, monto, tipoPrestamo) {
  //recibimos datos
  var prestamo = {
    "nombrePrestamo":nombrePrestamo,
    "intereses":intereses,
    "plazoPago":plazoPago,
    "monto":monto,
    "tipoPrestamo":tipoPrestamo
    }
   return prestamo;
}

module.exports = router;
