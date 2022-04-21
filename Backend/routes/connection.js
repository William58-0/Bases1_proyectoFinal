var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "201909103",
  database: 'proyecto_lab'
});

async function consultar(consulta, callback) {
  try {
    connection.query(consulta, async function (err, result) {
      if (err) {
        console.log(err.message);
        callback({ "status": 400, "message": err.message });
        return { "status": 400, "message": err.message };
      } else {
        callback({ "status": 200, "message": result });
        return { "status": 200, "message": result };
      }
    });

    callback();
    
  } catch (error) {
    return { "status": 400, "message": error }
  }
}


module.exports = {
  consultar,
};