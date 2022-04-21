var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./connection.js");

var router = express.Router();
router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/crearPublicacion", async function (req, res) {
  //const {descripcion, fecha, id_clase} = req.body   
  /*
  let resConsulta = await service.consultar(
    `SHOW TABLES;`,
  );
*/
  service.consultar(`SELECT * FROM curso;`, function (result) {
    console.log('Data : ' + result[0]);
    res.status(200).json({ datoos: result });
  });
  //console.log(resConsulta);

  
  //res.send(resConsulta)
});

module.exports = router;