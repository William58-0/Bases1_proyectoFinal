var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const fecha = require("./Herramientas/CorregirFecha");

const service = require("./Herramientas/connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/getMaestro", async function (req, res) {
  const { id_maestro } = req.body
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

router.post("/getPublicacionMaestro", async function (req, res) {
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
  const { titulo, descripcion, fecha_entrega, valor, id_clase, alumnos } = req.body;

  let consulta = `
  INSERT INTO actividad(titulo, descripcion, fecha_publicacion, fecha_entrega, valor, id_clase)
  VALUES("${titulo}", "${descripcion}", CURDATE(), "${fecha_entrega}", "${valor}", "${id_clase}");`;
  service.consultar(consulta, function (result) {

    // USAR LOS ALUMNOS PARA QUE SE LES ASIGNE UNA ACTIVIDAD
    if (result.status == 200) {
      alumnos.forEach(alumno => {
        let consulta1 = `
        INSERT INTO asignacion_actividad  (estado_actividad, id_actividad, id_alumno)
        VALUES("Pendiente", ${result.datos.insertId}, ${alumno.id_alumno});`;

        service.consultar(consulta1, function (result1) {
          console.log("actividad asignada");
          console.log(result1.datos);
        });
      });
      
    }

    res.status(result.status).json(result.datos);

  });


});

router.post("/getActividadMaestro", async function (req, res) {
  const { id_actividad } = req.body

  let consulta = `
    SELECT *
    FROM clase
    INNER JOIN actividad USING (id_clase)
    INNER JOIN curso USING (id_curso)
    WHERE id_actividad = ${id_actividad};
  `;
  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha_entrega = fecha.fechaLegible(dato.fecha_entrega);
      dato.fechaVentrega = fecha.fechaVisible(dato.fecha_entrega);
      dato.fecha_publicacion = fecha.fechaVisible(dato.fecha_publicacion);
    });
    res.status(result.status).json(result.datos);
  });
});

router.post("/updateActividadMaestro", async function (req, res) {
  const { titulo, descripcion, fecha_entrega, valor, id_actividad } = req.body;

  let consulta = `
  UPDATE actividad SET titulo = "${titulo}", descripcion = "${descripcion}",
  fecha_publicacion = CURDATE(), fecha_entrega = "${fecha_entrega}",
  valor = "${valor}"
  WHERE id_actividad = "${id_actividad}";`;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/deleteActividad", async function (req, res) {
  const { id_actividad } = req.body

  let consulta = `
    DELETE FROM actividad WHERE id_actividad = "${id_actividad}";
  `;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/getAlumnosCurso", async function (req, res) {
  const { id_maestro, id_curso } = req.body

  let consulta = `
    SELECT * FROM alumno
    INNER JOIN asignacion_clase USING (id_alumno)
    INNER JOIN clase USING (id_clase)
    WHERE (id_maestro = "${id_maestro}")
    AND (id_curso="${id_curso}");
  `;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});



module.exports = router;