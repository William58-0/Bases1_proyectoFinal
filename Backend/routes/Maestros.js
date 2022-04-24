var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const fecha = require("./CorregirFecha");

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

// ----------------------------------------------------------------------------- PUBLICACIONES
router.post("/getPublicacionesMaestro", async function (req, res) {
  const { id_maestro } = req.body

  let consulta = `
    SELECT *
    FROM clase
    INNER JOIN publicacion USING (id_clase)
    INNER JOIN curso USING (id_curso)
    WHERE id_maestro = ${id_maestro};
  `;
  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha = fecha.fechaVisible(dato.fecha);
    });
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
  const { descripcion, id_clase } = req.body
  let consulta = `CALL create_publicacion('${descripcion}', ${id_clase});`;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/getPublicacion", async function (req, res) {
  const { id_publicacion } = req.body

  let consulta = `
    SELECT *
    FROM clase
    INNER JOIN publicacion USING (id_clase)
    INNER JOIN curso USING (id_curso)
    WHERE id_publicacion = ${id_publicacion};
  `;
  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha = fecha.fechaVisible(dato.fecha);
    });
    res.status(result.status).json(result.datos);
  });
});

router.post("/updatePublicacion", async function (req, res) {
  console.log("SII ENTRAA");
  const { id_publicacion, descripcion } = req.body

  let consulta = `
    UPDATE publicacion SET descripcion = "${descripcion}",
    fecha = CURDATE()
    WHERE id_publicacion = "${id_publicacion}";
  `;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/deletePublicacion", async function (req, res) {
  console.log("SII ENTRAA");
  const { id_publicacion } = req.body

  let consulta = `
    DELETE FROM publicacion WHERE id_publicacion = "${id_publicacion}";
  `;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

// ----------------------------------------------------------------------------- ACTIVIDADES
router.post("/getActividadesMaestro", async function (req, res) {
  const { id_maestro } = req.body
  console.log("aquii es");
  console.log(id_maestro);
  let consulta = `
  SELECT * FROM clase
  INNER JOIN actividad USING (id_clase)
  INNER JOIN curso USING (id_curso)
  WHERE id_maestro = "${id_maestro}";`;
  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha_publicacion = fecha.fechaVisible(dato.fecha_publicacion);
    });
    res.status(result.status).json(result.datos);
  });
});

router.post("/crearActividad", async function (req, res) {
  console.log("va a tratar de crear actividad");
  const { titulo, descripcion, fecha_entrega, valor, id_clase } = req.body;
  console.log(fecha_entrega);

  let consulta = `
  INSERT INTO actividad(titulo, descripcion, fecha_publicacion, fecha_entrega, valor, id_clase)
  VALUES("${titulo}", "${descripcion}", CURDATE(), "${fecha_entrega}", "${valor}", "${id_clase}");`;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});


module.exports = router;