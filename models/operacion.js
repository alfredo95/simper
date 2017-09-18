const db = require('../config/db');
//módulos de la conexión
const querySql = db.querySql;
const Promise = require("bluebird");

module.exports.addOperacion = function (json) {
  var query = "insert into operacion set ?";
  return querySql(query,json);
}

module.exports.getOperacion = function (idProducto,idZona,idProyecto,idUsuario,numPeriodo) {
  var query = "select * from operacion where Producto_idProducto = "+idProducto+" and Zona_idZonas = "+idZona+" and Proyecto_idProyecto = "+idProyecto+" and Usuario_idUsuario = "+idUsuario+" and numPeriodo = "+numPeriodo+" ";
  return querySql(query);
}

module.exports.updateOperacion = function (idProducto,idZona,idProyecto,idUsuario,numPeriodo,uniAlmacenadas,uniVendidas) {
  var query = " update operacion set unidadesAlmacenadas = "+uniAlmacenadas+", unidadesVendidas = "+uniVendidas+" where Producto_idProducto = "+idProducto+" and Zona_idZonas = "+idZona+" and Proyecto_idProyecto = "+idProyecto+" and Usuario_idUsuario = "+idUsuario+" and numPeriodo = "+numPeriodo+" ";
  return querySql(query);
}
