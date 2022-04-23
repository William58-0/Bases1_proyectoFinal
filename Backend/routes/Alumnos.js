var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.get("/getAlumnos", async function (req, res) {
  let consulta = `
    SELECT * FROM alumno;
  `
  service.consultar(consulta, function (result) {
    res.status(200).json(result.datos);
  });
});


module.exports = router;