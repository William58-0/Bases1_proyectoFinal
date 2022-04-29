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

router.post("/getEntregas", async function (req, res) {
  const { id_maestro } = req.body

  let consulta = `
    SELECT * FROM clase
    INNER JOIN curso USING (id_curso)
    INNER JOIN actividad USING (id_clase)
    INNER JOIN asignacion_actividad USING (id_actividad)
    INNER JOIN alumno USING (id_alumno)
    WHERE (id_maestro = ${id_maestro})
    AND (estado_actividad = "Entregado"); 
  `;

  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/getEntrega", async function (req, res) {
  const { id_asignacion_actividad } = req.body

  let consulta = `
    SELECT * FROM clase
    INNER JOIN curso USING (id_curso)
    INNER JOIN actividad USING (id_clase)
    INNER JOIN asignacion_actividad USING (id_actividad)
    INNER JOIN alumno USING (id_alumno)
    WHERE (id_asignacion_actividad = ${id_asignacion_actividad}); 
  `;

  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha_hora = fecha.fechaTiempo(dato.fecha_hora);
    });
    res.status(result.status).json(result.datos);
  });
});

router.post("/calificarEntrega", async function (req, res) {
  const { punteo, observaciones, id_asignacion_actividad } = req.body

  let consulta = `
    UPDATE asignacion_actividad SET
    puntuacion = "${punteo}"
    WHERE id_asignacion_actividad = ${id_asignacion_actividad};
    `;

  service.consultar(consulta, function (result) {
    //insertar las observaciones
    observaciones.forEach(observacion => {
      let consulta1 = `
      INSERT INTO observacion(texto, id_asignacion_actividad)
      VALUES("${observacion.texto}", ${id_asignacion_actividad});
      `;

      service.consultar(consulta1, function (result1) {
        console.log("agregar observacion: ");
        console.log(result1.datos);
      });
    });

    res.status(result.status).json(result.datos);
  });
});


router.post("/getObservaciones", async function (req, res) {
  const { id_asignacion_actividad } = req.body

  let consulta = `
    SELECT * FROM observacion WHERE id_asignacion_actividad = ${id_asignacion_actividad};
    `;

  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

// ----------------------------------------------------------------------------- EXAMENES
router.post("/crearExamen", async function (req, res) {
  const { id_examen, hora_inicio, hora_final, id_clase, alumnos, preguntas } = req.body

  let consulta = `
    INSERT INTO examen VALUES(${id_examen}, CURDATE(), "${hora_inicio}", "${hora_final}", ${id_clase});
  `;

  service.consultar(consulta, function (result) {
    // si insertó bien el examen
    if (result.status == 200) {
      // hacer las inserciones de preguntas
      preguntas.forEach(pregunta => {
        let consulta1 = `
          INSERT INTO pregunta(texto, valor, id_examen)
          VALUES("${pregunta.texto}", ${pregunta.valor}, ${result.datos.insertId});
        `;
        service.consultar(consulta1, function (result1) {
          // si insertó bien una pregunta
          if (result1.status == 200) {
            // hacer las inserciones de la opciones de la pregunta
            pregunta.opciones.forEach(opcion => {
              let consulta2 = `
                INSERT INTO opcion(texto, validez, id_pregunta)
                VALUES("${opcion.texto}", ${opcion.validez}, ${result1.datos.insertId});
              `;
              service.consultar(consulta2, function (result2) {
                console.log("insercion de opcion para pregunta");
                console.log(result2.datos);
              });
            });
          }
        });
      });

      // hacer las inserciones de asignacion_examen para alumnos
      alumnos.forEach(alumno => {
        let consulta3 = `
          INSERT INTO asignacion_examen(id_examen, id_alumno)
          VALUES(${result.datos.insertId}, ${alumno.id_alumno});
        `;
        service.consultar(consulta3, function (result3) {
          console.log("insercion de asignacion examen alumno");
          console.log(result3.datos);
        });
      });

    } else {
      res.status(result.status).json(result.datos);
    }
  });

  res.status(200).json('OK');
});

module.exports = router;