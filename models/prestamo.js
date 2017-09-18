const db = require('../config/db');
const querySql = db.querySql;


module.exports.addPrestamo = function (data) {
    var queryPrestamo = "insert into Prestamo set ? ";
    return querySql(queryPrestamo,data);
}

module.exports.deletePrestamo = function (id) {
    var userQuery = "delete from Prestamo where idPrestamos = ?";
    return querySql(userQuery, id);
}

module.exports.updatePrestamo = function (data,id){
    queryUpdateProd = "update Prestamo set ? where idPrestamos = "+id+"";
    return querySql(queryUpdateProd,data);
}

module.exports.getPrestamos = function () {
    var query = "select * from Prestamo";
    return querySql(query);
}
