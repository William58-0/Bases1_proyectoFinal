var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database : 'proyecto_lab'
});

async function consultar(consulta) {
  try {
    let res;
    connection.query(consulta, function (err, result) {
      if (err) {
        throw err
      } else {
        res = result
      }
    });
    return { "status": 200, "data": res }
  } catch (error) {
    return { "status": 400, "message": error.message }
  }
}


module.exports = {
  consultar,
};