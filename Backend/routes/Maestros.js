var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/getMaestro", async function (req, res) {
  const { id_maestro } = req.body
  console.log(req.body)
  let consulta = `
    SELECT * FROM maestro WHERE id_maestro = "${id_maestro}";
  `
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});


router.post("/getPublicacionesMaestro", async function (req, res) {
  const {id_maestro} = req.body 

  let consulta = `
    SELECT *
    FROM clase
    INNER JOIN publicacion USING (id_clase)
    INNER JOIN curso USING (id_curso)
    WHERE id_maestro = ${id_maestro};
  `;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/getCursosMaestro", async function (req, res) {
  const { id_maestro } = req.body
  let consulta = `
    SELECT * FROM clase
    INNER JOIN curso USING (id_curso) 
    WHERE id_maestro = ${id_maestro};
  `
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/getIdClase", async function (req, res) {
  const { id_maestro, id_curso } = req.body
  let consulta = `
    SELECT id_clase FROM clase
    INNER JOIN curso USING (id_curso) 
    WHERE id_maestro = ${id_maestro} AND id_curso = "${id_curso}";
  `
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/createPublicacion", async function (req, res) {
  const {descripcion, id_clase} = req.body 
  let consulta = `CALL create_publicacion('${descripcion}', ${id_clase});`;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});



module.exports = router;