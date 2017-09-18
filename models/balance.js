const db = require('../config/db');
const querySql = db.querySql;

module.exports.addBalance = function (data) {
  const sql = "insert into Balance set ?";
  return querySql(sql,data);
}

module.exports.updateBalance = function (id, data) {
  const sql = "update Balance set ? where idBalance = "+id+"";
  console.log("update Balance set ? where idBalance = "+id+"");
  return querySql(sql, data);
}

module.exports.getBalances = function (idProyecto) {
  const sql = "select * from Balance where Proyectos_idProyecto = ?";
  return querySql(sql,idProyecto);
}

module.exports.getBalanceById = function (idProyecto, numeroPeriodo) {
  const sql = "select * from Balance where Proyectos_idProyecto = "+idProyecto+" and numeroPeriodo = "+numeroPeriodo+"";
  return querySql(sql);
}
