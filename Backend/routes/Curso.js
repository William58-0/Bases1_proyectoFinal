var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./connection.js");

var router = express.Router();
router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/crearCurso", async function (req, res) {
  const { nombre } = req.body
  let consulta = `INSERT INTO curso(nombre_curso) VALUES("${nombre}");`
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result);
  });
});


router.get("/getCursos", async function (req, res) {
  let consulta = `
    SELECT * FROM curso;
  `
  service.consultar(consulta, function (result) {
    res.status(200).json(result.datos);
  });
});

router.post("/getCurso", async function (req, res) {
  const { id_curso } = req.body
  console.log("aquiii");
  console.log(id_curso);
  let consulta = `
    SELECT * FROM curso WHERE id_curso = "${id_curso}";
  `
  service.consultar(consulta, function (result) {
    res.status(200).json(result.datos);
  });
});

router.post("/getCursosMaestro", async function (req, res) {
  const { id_maestro, id_curso } = req.body
  let consulta = `
    SELECT * FROM curso 
    WHERE id_maestro = ${id_maestro};
  `
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});



module.exports = router;