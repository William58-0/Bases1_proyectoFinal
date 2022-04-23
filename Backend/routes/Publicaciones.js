var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./connection.js");

var router = express.Router();
router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


router.post("/createPublicacion", async function (req, res) {
  const {descripcion, id_clase} = req.body 
  let consulta = `CALL create_publicacion('${descripcion}', ${id_clase});`;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});


router.post("/getPublicacion", async function (req, res) {
  const {id_publicacion} = req.body 
  let consulta = `SELECT * FROM publicacion WHERE id_publicacion = ${id_publicacion};`;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});


router.post("/updatePublicacion", async function (req, res) {
  const {id_publicacion, descripcion, fecha, id_clase} = req.body 
  let consulta = `CALL update_publicacion(${id_publicacion}, '${descripcion}', '${fecha}', ${id_clase})`;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});


router.post("/deletePublicacion", async function (req, res) {
  const {id_publicacion} = req.body 
  let consulta = `CALL delete_publicacion(${id_publicacion});`;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});


router.post("/getPublicacionesMaestro", async function (req, res) {
  const {id_maestro, id_curso} = req.body 
  console.log("pasa aquiii");
  console.log(req.body);
  let consulta = `
    SELECT *
    FROM clase
    INNER JOIN publicacion USING (id_clase)
    INNER JOIN curso USING (id_curso)
    WHERE id_maestro = ${id_maestro};
  `;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});


router.get("/getPublicacionesAlumno", async function (req, res) {
  const {id_alumno, id_maestro, id_curso} = req.body 
  let consulta = `CALL delete_publicacion(${id_publicacion});`;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});

module.exports = router;