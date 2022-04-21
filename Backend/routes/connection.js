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
        callback({ "status": 400, "consulta": consulta, "datos": err.message });
      } else {
        callback({ "status": 200, "consulta": consulta, "datos": result });
      }
    });
  } catch (error) {
    console.log({"status": 400, "consulta": consulta, "datos": error})
  }
}


module.exports = {
  consultar,
};