var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: 'proyecto_lab'
});

async function consultar(consulta, callback) {
  try {
    connection.query(consulta, async function (err, result) {
      if (err) {
        callback({ "status": 400, "message": err.message });
      } else {
        callback({ "status": 200, "message": result });
      }
    });
  } catch (error) {
    console.log({"status": 400, "message": error})
  }
}


module.exports = {
  consultar,
};