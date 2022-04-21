var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: 'proyecto_lab'
});

async function consultar(consulta, callback) {
  try {
    var res={};
    connection.query(consulta, async function (err, result) {
      if (err) {
        throw err
      } else {
        callback(result);
        return result;
      }
    });

    callback();
    //return { "status": 200, "message": res }
  } catch (error) {
    return { "status": 400, "message": error.message }
  }
}


module.exports = {
  consultar,
};