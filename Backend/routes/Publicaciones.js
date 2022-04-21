var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./connection.js");

var router = express.Router();
router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


router.post("/createPublicacion", async function (req, res) {
  const {descripcion, fecha, id_clase} = req.body   
  let consulta = `CALL create_publicacion('${descripcion}','${fecha}', ${id_clase});`;
  service.consultar(consulta, function (result) {
    res.status(200).json({ datos: result });
  });
});


router.get("/getPublicaciones", async function (req, res) {
  const {id_publicacion} = req.body 
  let consulta = `SELECT * FROM publicacion;`;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});


router.get("/updatePublicacion", async function (req, res) {
  const {id_publicacion, descripcion, fecha, id_clase} = req.body 
  let consulta = `CALL update_publicacion(${id_publicacion}, '${descripcion}', '${fecha}', ${id_clase})`;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});


router.get("/deletePublicacion", async function (req, res) {
  const {id_publicacion} = req.body 
  let consulta = `CALL delete_publicacion(${id_publicacion});`;
  service.consultar(consulta, function (result) {
    res.status(200).json(result);
  });
});


router.get("/getPublicacionesMaestro", async function (req, res) {
  const {id_maestro, id_curso} = req.body 
  let consulta = `
    SELECT *
    FROM clase
    INNER JOIN publicacion USING (id_clase)
    WHERE (clase.id_curso = ${id_curso} AND clase.id_maestro = ${id_maestro});
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