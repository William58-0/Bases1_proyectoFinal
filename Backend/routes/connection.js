var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database : 'proyecto_lab'
});

async function consultar(consulta) {
  try {
    connection.query(consulta, function (err, result) {
      if (err) {
        throw err
      } else {
        console.log(result)
        return { "status": 200, "data": result }
      }
    });
  } catch (error) {
    return { "status": 400, "message": error.message }
  }
}


module.exports = {
  consultar,
};