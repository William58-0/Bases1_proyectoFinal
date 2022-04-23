var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./connection.js");

var router = express.Router();
router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/getClase", async function (req, res) {
    const { id_maestro, id_curso } = req.body
    console.log("geet cursoee");
    console.log(id_maestro, id_curso);
    let consulta = `
      SELECT * FROM clase 
      WHERE id_maestro = ${id_maestro} AND id_curso = ${id_curso};
    `
    service.consultar(consulta, function (result) {
        res.status(result.status).json(result);
    });
});

module.exports = router;