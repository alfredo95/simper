const express = require('express');
const router = express.Router();
const balance = require('../models/balance');

router.post('/register', (req, res, next) => {
  Promise.resolve().then( function () {
    var IVAPorEnterar = req.body.IVAPorEnterar;
    var numeroPeriodo = req.body.numeroPeriodo;
    var imptosPorPagar  = req.body.imptosPorPagar;
    var proveedores = req.body.proveedores;
    var PTUPorPagar = req.body.PTUPorPagar;
    var prestamosMenosAnio = req.body.prestamosMenosAnio;
    var prestamosMasAnio = req.body.prestamosMasAnio;
    var cajaBancos =  req.body.cajaBancos;
    var cuentasPorCobrar = req.body.cuentasPorCobrar;
    var IVAAcreditable = req.body.IVAAcreditable;
    var almacenArtTerm = req.body.almacenArtTerm;
    var almacenMateriales = req.body.almacenMateriales;
    var terreno = req.body.terreno;
    var edifInsta = req.body.edifInsta;
    var maqEquipo = req.body.maqEquipo;
    var mueblesEnseres = req.body.mueblesEnseres;
    var pagosAnticipado = req.body.pagosAnticipado;
    var gastosAmortizacion = req.body.gastosAmortizacion;
    var capitalSocial = req.body.capitalSocial;
    var reservaLegal = req.body.reservaLegal;
    var utilidadAcum = req.body.utilidadAcum;
    var depEdif = req.body.depEdif;
    var depMueblesEnseres = req.body.depMueblesEnseres;
    var eqTrans = req.body.eqTrans;
    var Proyectos_idProyecto = req.body.Proyectos_idProyecto;
    var depTerreno = req.body.depTerreno;
    var depMaqEquipo = req.body.depMaqEquipo;
    var depEqTrans = req.body.depEqTrans;

    return getJSONBalance(IVAPorEnterar, numeroPeriodo, imptosPorPagar, proveedores, PTUPorPagar, prestamosMasAnio, prestamosMenosAnio, cajaBancos, cuentasPorCobrar, IVAAcreditable, almacenArtTerm, almacenMateriales, almacenMateriales,terreno, edifInsta, maqEquipo, mueblesEnseres, pagosAnticipado, gastosAmortizacion, capitalSocial, reservaLegal, utilidadAcum, depEdif, depMueblesEnseres, eqTrans, Proyectos_idProyecto, depTerreno, depMaqEquipo, depEqTrans);
  }).then( function (newBalance) {
    return balance.addBalance(newBalance);
  }).then( function () {
    res.json({success: true, msg:"Operacion exitosa"});
  }).catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/modify/:id', (req,res,next) => {
  Promise.resolve().then( function () {
    var id = req.params.id;
    var cambios = req.body;
    return balance.updateBalance(id,cambios);
  }).then( function () {
    res.json({success: true,msg:"Operacion exitosa"});
  }).catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/', (req,res,next) => {
  Promise.resolve().then( function () {
    var idProyecto = req.body.idProyecto;
    var numeroPeriodo = req.body.numeroPeriodo;
    return balance.getBalanceById(idProyecto, numeroPeriodo);
  }).then( function (rows) {
    return toArrayBalances(rows);
  }).then(function (BalanceList) {
    res.json({success: true, datos:BalanceList, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});


router.get('/:id', (req,res,next) => {
  Promise.resolve().then( function () {
    return balance.getBalances(req.params.id);
  }).then( function (rows) {
    return toArrayBalances(rows);
  }).then( function (BalanceList) {
    res.json({success: true, datos:BalanceList, msg:"Operacion exitosa"});
  }).catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

function toArrayBalances(rows){
  var BalanceList = [];
    for(var i=0; i<rows.length; i++){
      var Balance = {
        "idBalance":rows[i].idBalance,
        "numeroPeriodo":rows[i].numeroPeriodo,
        "IVAPorEnterar":rows[i].IVAPorEnterar,
        "imptosPorPagar" :rows[i].imptosPorPagar,
        "proveedores":rows[i].proveedores,
        "PTUPorPagar":rows[i].PTUPorPagar,
        "prestamosMenosAnio":rows[i].prestamosMenosAnio,
        "prestamosMasAnio":rows[i].prestamosMasAnio,
        "cajaBancos":rows[i].cajaBancos,
        "cuentasPorCobrar":rows[i].cuentasPorCobrar,
        "IVAAcreditable":rows[i].IVAAcreditable,
        "almacenArtTerm":rows[i].almacenArtTerm,
        "almacenMateriales":rows[i].almacenMateriales,
        "terreno":rows[i].terreno,
        "edifInsta":rows[i].edifInsta,
        "maqEquipo":rows[i].maqEquipo,
        "mueblesEnseres":rows[i].mueblesEnseres,
        "pagosAnticipado":rows[i].pagosAnticipado,
        "gastosAmortizacion":rows[i].gastosAmortizacion,
        "capitalSocial":rows[i].capitalSocial,
        "reservaLegal":rows[i].reservaLegal,
        "utilidadAcum":rows[i].utilidadAcum,
        "depEdif":rows[i].depEdif,
        "depMueblesEnseres":rows[i].depMueblesEnseres,
        "eqTrans":rows[i].eqTrans,
        "Proyectos_idProyecto":rows[i].Proyectos_idProyecto,
        "depTerreno":rows[i].depTerreno,
        "depMaqEquipo":rows[i].depMaqEquipo,
        "depEqTrans":rows[i].depEqTrans
      }
      BalanceList.push(Balance);
    }
  return BalanceList;
}

function toArrayBalance(rows){
    for(var i=0; i<rows.length; i++){
      var BalanceUnico = {
        "idBalance":rows[i].idBalance,
        "numeroPeriodo":rows[i].numeroPeriodo,
        "IVAPorEnterar":rows[i].IVAPorEnterar,
        "imptosPorPagar" :rows[i].imptosPorPagar,
        "proveedores":rows[i].proveedores,
        "PTUPorPagar":rows[i].PTUPorPagar,
        "prestamosMenosAnio":rows[i].prestamosMenosAnio,
        "prestamosMasAnio":rows[i].prestamosMasAnio,
        "cajaBancos":rows[i].cajaBancos,
        "cuentasPorCobrar":rows[i].cuentasPorCobrar,
        "IVAAcreditable":rows[i].IVAAcreditable,
        "almacenArtTerm":rows[i].almacenArtTerm,
        "almacenMateriales":rows[i].almacenMateriales,
        "terreno":rows[i].terreno,
        "edifInsta":rows[i].edifInsta,
        "maqEquipo":rows[i].maqEquipo,
        "mueblesEnseres":rows[i].mueblesEnseres,
        "pagosAnticipado":rows[i].pagosAnticipado,
        "gastosAmortizacion":rows[i].gastosAmortizacion,
        "capitalSocial":rows[i].capitalSocial,
        "reservaLegal":rows[i].reservaLegal,
        "utilidadAcum":rows[i].utilidadAcum,
        "depEdif":rows[i].depEdif,
        "depMueblesEnseres":rows[i].depMueblesEnseres,
        "eqTrans":rows[i].eqTrans,
        "Proyectos_idProyecto":rows[i].Proyectos_idProyecto,
        "depTerreno":rows[i].depTerreno,
        "depMaqEquipo":rows[i].depMaqEquipo,
        "depEqTrans":rows[i].depEqTrans
      }
    }
  return BalanceUnico;
}


function getJSONBalance(IVAPorEnterar, numeroPeriodo,imptosPorPagar, proveedores, PTUPorPagar, prestamosMasAnio, prestamosMenosAnio, cajaBancos, cuentasPorCobrar, IVAAcreditable, almacenArtTerm, almacenMateriales, almacenMateriales,terreno, edifInsta, maqEquipo, mueblesEnseres, pagosAnticipado, gastosAmortizacion, capitalSocial, reservaLegal, utilidadAcum, depEdif, depMueblesEnseres, eqTrans, Proyectos_idProyecto, depTerreno, depMaqEquipo, depEqTrans){
  var Balance = {
    "IVAPorEnterar":IVAPorEnterar,
    "numeroPeriodo":numeroPeriodo,
    "imptosPorPagar" :imptosPorPagar,
    "proveedores":proveedores,
    "PTUPorPagar":PTUPorPagar,
    "prestamosMenosAnio":prestamosMenosAnio,
    "prestamosMasAnio":prestamosMasAnio,
    "cajaBancos":cajaBancos,
    "cuentasPorCobrar":cuentasPorCobrar,
    "IVAAcreditable":IVAAcreditable,
    "almacenArtTerm":almacenArtTerm,
    "almacenMateriales":almacenMateriales,
    "terreno":terreno,
    "edifInsta":edifInsta,
    "maqEquipo":maqEquipo,
    "mueblesEnseres":mueblesEnseres,
    "pagosAnticipado":pagosAnticipado,
    "gastosAmortizacion":gastosAmortizacion,
    "capitalSocial":capitalSocial,
    "reservaLegal":reservaLegal,
    "utilidadAcum":utilidadAcum,
    "depEdif":depEdif,
    "depMueblesEnseres":depMueblesEnseres,
    "eqTrans":eqTrans,
    "Proyectos_idProyecto":Proyectos_idProyecto,
    "depTerreno":depTerreno,
    "depMaqEquipo":depMaqEquipo,
    "depEqTrans":depEqTrans
  }
  return Balance;
}

module.exports = router;
