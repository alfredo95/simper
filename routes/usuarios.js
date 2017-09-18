const express = require('express');
const router = express.Router();
const config = require('../config/db');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

router.post('/register', (req, res, next) => {
  Promise.resolve().then(function () {

    var nombreUsuario = req.body.nombreUsuario;
    var apPat = req.body.apPat;
    var apMat = req.body.apMat;
    var Administrador_idAdministrador = req.body.Administrador_idAdministrador;
    var contra = req.body.contra;
    var user = req.body.user;

  return getJSONUsuario(nombreUsuario, apPat, apMat, Administrador_idAdministrador, contra, user);
  })
  .then(function (newUsuario) {
      return usuario.addUsuario(newUsuario);
  }).then(function(){
    //res.json({success: true, msg:"Operacion exitosa"});
    return usuario.getUsuarios();
  }).
  then( function (rows) {
    return toArrayUsuario(rows);
  }).
  then( function (usuarioList) {
    res.json({success: true, datos:usuarioList, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/modify/:idUsuario', (req, res, next) => {
  Promise.resolve()
  .then(function () {
       var nombreUsuario = req.body.nombreUsuario;
       var apPat = req.body.apPat;
       var apMat = req.body.apMat;
       var Administrador_idAdministrador = req.body.Administrador_idAdministrador;
       var contra = req.body.contra;
       var user = req.body.user;
      return getJSONUsuario(nombreUsuario, apPat, apMat, Administrador_idAdministrador, contra, user);
  })
  .then(function (data) {
      var idUsuario = req.params.idUsuario;
      return usuario.updateUsuario(data,idUsuario);
  }).then(function(){
    res.json({success: true, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.error("got error: " + err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.post('/variables/:id', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var IVAPorEnterar = req.body.IVAPorEnterar;
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
      var eqTrans = req.body.eqTrans;

      return getJSONBalance(IVAPorEnterar, imptosPorPagar, proveedores, PTUPorPagar, prestamosMasAnio, prestamosMenosAnio, cajaBancos, cuentasPorCobrar, IVAAcreditable, almacenArtTerm, almacenMateriales, almacenMateriales,terreno, edifInsta, maqEquipo, mueblesEnseres, pagosAnticipado, gastosAmortizacion, capitalSocial, reservaLegal, utilidadAcum,  eqTrans);
  })
  .then(function (data) {
      var id = req.params.id;
      return usuario.addPeriodoCero(data,id);
  }).then(function(){
    //res.json({success: true, msg:"Operacion exitosa"});
    return usuario.getUsuarios();
  }).
  then( function (rows) {
    return toArrayUsuario(rows);
  }).
  then( function (usuarioList) {
    res.json({success: true, datos:usuarioList, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.get('/delete/:idUsuario', (req, res, next) => {
  Promise.resolve()
  .then(function () {
      var idUsuario = req.params.idUsuario
      return usuario.deleteUsuario(idUsuario);
  })
  .then(function () {
      res.json({success: true, msg:"Operacion exitosa"});
  })
  .catch(function (err) {
    console.error("got error: " + err);
    res.json({success:false, msg:"Operacion incompleta"});
  });
});

router.get('/', (req, res, next) => {
  Promise.resolve().then(function () {
    return usuario.getUsuarios();
  })
    .then(function (rows) {
      return toArrayUsuario(rows);
    })
    .then(function (usuarioList){
        res.json(usuarioList);
    })
    .catch(function (err) {
      console.error("got error: " + err);
      res.json({success:false, msg:"Operacion incompleta"});
    });
});

router.post('/authenticate', (req, res, next) => {
Promise.resolve().then(function () {

  const username = req.body.username;
  return usuario.getUsuarioByUserName(username);

}).then(function (rows){
    return toJsonAdmin(rows);
})
.then( function(usuario) {
    const pass = req.body.password;
    if(pass == usuario.contra){
      const token = jwt.sign(usuario, config.secret, {
        expiresIn: 604800
      });

      res.json({
        success: true,
        token: 'JWT ' + token,
        usuario: {
          id: usuario.idUsuario,
          name: usuario.user
        }
      });
    }
    else{
      return res.json({success: false, msg:'Contraseña Inconrrecta'});
    }
  }).catch(function (err) {
    console.log(err);
  return res.json({success: false, msg:'Usuario No Encontrado'});
});
});

router.get('/proyectos', (req, res, next) => {
  Promise.resolve().then( function () {
    return usuario.getProyectos();
  }).then(function (rows) {
    return toArrayProyecto(rows)
  }).then( function (ProyectoList) {
    res.json({datos:ProyectoList});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success: false, msg:"Operacion Inconrrecta"});
  });
});

router.get('/balanceCero/:id', (req, res, next) => {
  Promise.resolve().then( function () {
    return usuario.getUsuarioById(req.params.id);
  }).then(function (rows){
    return toArrayBalance(rows);
  }).then( function (BalanceUnico) {
    res.json({success: true, datos:BalanceUnico, msg:"Operacion Exitosa"});
  })
  .catch(function (err) {
    console.log(err);
    res.json({success: false, msg:"Operacion Inconrrecta"});
  });
});

function toArrayBalance(rows){
  var BalanceList = [];
    for(var i=0; i<rows.length; i++){
      var Balance = {
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
        "depEdif":0,
        "depMueblesEnseres":0,
        "eqTrans":rows[i].eqTrans,
        "depTerreno":0,
        "depMaqEquipo":0,
        "depEqTrans":0
      }
      BalanceList.push(Balance);
    }
  return BalanceList;
}


function toArrayUsuario(rows) {
  var usuarioList = [];

  for(var i = 0; i < rows.length; i++){

    var usuario = {
      "idUsuario": rows[i].idUsuario,
      "nombreUsuario": rows[i].nombreUsuario,
      "apPat": rows[i].apPat,
      "apMat": rows[i].apMat,
      "Administrador_idAdministrador": rows[i].Administrador_idAdministrador,
      "contra": rows[i].contra,
      "user": rows[i].user,
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
      "depTerreno":rows[i].depTerreno,
      "depMaqEquipo":rows[i].depMaqEquipo,
      "depEqTrans":rows[i].depEqTrans
      }
      usuarioList.push(usuario);
  }
  return usuarioList;
}

function toArrayProyecto(rows) {
  var ProyectoList = [];

  for(var i = 0; i < rows.length; i++){

    var Proyecto = {
      "idProyecto": rows[i].idProyecto,
      "nombreProyecto": rows[i].nombreProyecto,
      "fechaCreacion": rows[i].fechaCreacion,
      "Usuario_idUsuario": rows[i].Usuario_idUsuario
      }
      ProyectoList.push(Proyecto);
  }
  return ProyectoList;
}

function getJSONUsuario(nombreUsuario, apPat, apMat, Administrador_idAdministrador, contra, user) {
  //recibimos datos
  var data = {
      "nombreUsuario": nombreUsuario,
      "apPat":apPat,
      "apMat":apMat,
      "Administrador_idAdministrador": Administrador_idAdministrador,
      "contra":contra,
      "user":user
   };
   return data;
}

function toJsonAdmin(rows){
    var usuario = {
      "idUsuario": rows[0].idUsuario,
      "nombreUsuario": rows[0].nombreUsuario,
      "apPat": rows[0].apPat,
      "apMat": rows[0].apMat,
      "Administrador_idAdministrador": rows[0].Administrador_idAdministrador,
      "contra": rows[0].contra,
      "user": rows[0].user
    }
  return usuario;
}

function getJSONBalance(IVAPorEnterar, imptosPorPagar, proveedores, PTUPorPagar, prestamosMasAnio, prestamosMenosAnio, cajaBancos, cuentasPorCobrar, IVAAcreditable, almacenArtTerm, almacenMateriales, almacenMateriales,terreno, edifInsta, maqEquipo, mueblesEnseres, pagosAnticipado, gastosAmortizacion, capitalSocial, reservaLegal, utilidadAcum,  eqTrans){
  var Balance = {
    "IVAPorEnterar":IVAPorEnterar,
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
    "eqTrans":eqTrans
  }
  return Balance;
}

module.exports = router;
