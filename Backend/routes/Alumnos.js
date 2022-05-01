var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const fecha = require("./Herramientas/CorregirFecha");
const archivos = require("./Herramientas/Archivos");
const fs = require('fs');

const service = require("./Herramientas/connection.js");
const cors = require("cors");


router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/getAlumno", async function (req, res) {
  const { id_alumno } = req.body
  let consulta = `CALL get_alumno(${id_alumno});`

  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos[0]);
  });
});

// ----------------------------------------------------------------------------- PUBLICACIONES
router.post("/getPublicacionesAlumno", async function (req, res) {
  const { id_alumno } = req.body

  let consulta = `
    CALL get_publicaciones_alumno(${id_alumno});
  `;
  service.consultar(consulta, function (result) {
    result.datos[0].forEach(dato => {
      dato.fecha = fecha.fechaVisible(dato.fecha);
    });
    res.status(result.status).json(result.datos[0]);
  });
});

// ----------------------------------------------------------------------------- ACTIVIDADES
router.post("/getActividadesAlumno", async function (req, res) {
  const { id_alumno } = req.body
  let consulta = `
  CALL get_actividades_alumno(${id_alumno});`;

  service.consultar(consulta, function (result) {
    result.datos[0].forEach(dato => {
      dato.fecha_publicacion = fecha.fechaVisible(dato.fecha_publicacion);
      dato.fecha_entrega = fecha.fechaVisible(dato.fecha_entrega);
      dato.fecha_hora = fecha.fechaTiempo(dato.fecha_hora);
    });
    res.status(result.status).json(result.datos[0]);
  });
});

router.post("/getActividadAlumno", async function (req, res) {
  const { id_asignacion_actividad } = req.body
  let consulta = `
  CALL get_actividad_alumno(${id_asignacion_actividad});`;

  service.consultar(consulta, function (result) {
    result.datos[0].forEach(dato => {
      dato.fecha_publicacion = fecha.fechaVisible(dato.fecha_publicacion);
      dato.fecha_entrega = fecha.fechaVisible(dato.fecha_entrega);
      dato.fecha_hora = fecha.fechaTiempo(dato.fecha_hora);
    });
    res.status(result.status).json(result.datos[0]);
  });
});


router.post('/entregarActividad', archivos.upload.single('file'), async function (req, res) {

  if (req.file == undefined) {
    console.log("ERROR: No hay archivo");
    res.status(400).json("ERROR: No hay archivo");
    return;
  }

  const { id_asignacion_actividad } = req.body

  var ruta = './actividades/' + id_asignacion_actividad;

  // carpeta para guardar la actividad del estudiante
  if (!fs.existsSync(ruta)) {
    fs.mkdirSync(ruta, { recursive: true });
    console.log("Carpeta para la actividad creada");
  }

  // se copia el archivo desde temp a la carpeta de actividad
  var buscar = './temp/' + req.file.filename;

  try {
    archivos.copy(buscar, ruta + '/' + req.file.filename);
    console.log("se pudo copiar");


    let consulta = `
     CALL entregar_actividad('${req.file.filename}', ${id_asignacion_actividad});
    `;


    service.consultar(consulta, function (result) {
      res.status(result.status).json(result.datos[0]);
    });


  } catch (err) {
    console.log(err);
    console.log("no se pudo copiar :c");
    res.status(400).json(err);
  }

})

// ----------------------------------------------------------------------------- NOTAS
router.post("/getClasesAlumno", async function (req, res) {
  const { id_alumno } = req.body
  let consulta = `
    CALL get_clases_alumno(${id_alumno});
  `;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos[0]);
  });
});

router.post("/getNotasAlumno", async function (req, res) {
  const { id_alumno, id_clase } = req.body

  let notas = [];

  let consulta = `CALL get_notas_alumno(${id_alumno}, ${id_clase});`;
  service.consultar(consulta, function (result) {

    if (result.status == 200) {
      notas = notas.concat(result.datos[0]);
    }

    let consulta1 = `
    SELECT id_asignacion_examen AS 'id', examen.id_examen, puntuacion
    FROM clase
    INNER JOIN examen USING (id_clase)
    INNER JOIN asignacion_examen USING (id_examen)
    WHERE (id_alumno = ${id_alumno}) AND (id_clase = ${id_clase});`;

    service.consultar(consulta1, function (result1) {
      if (result1.status == 200) {
        notas = notas.concat(result1.datos);
      }

      res.status(result1.status).json(notas);

    });

  });

});

router.post("/getTotalAlumno", async function (req, res) {
  const { id_alumno, id_clase } = req.body

  let totales = [];

  let consulta = `CALL get_total_alumno(${id_alumno}, ${id_clase});`;

  service.consultar(consulta, function (result) {
    if (result.status == 200) {
      totales = totales.concat(result.datos[0]);
    }
    let consulta1 = `
    SELECT SUM(puntuacion) as total FROM asignacion_examen
    INNER JOIN examen USING (id_examen)
    WHERE (id_alumno = ${id_alumno}) AND (id_clase = ${id_clase})
    GROUP BY id_alumno ;`;

    service.consultar(consulta1, function (result1) {

      if (result1.status == 200) {
        totales = totales.concat(result1.datos);
      }

      res.status(result1.status).json(totales);

    });

  });
});

// ----------------------------------------------------------------------------- NOTIFICACIONES
router.post("/getNotificaciones", async function (req, res) {
  const { id_alumno } = req.body

  let resultado = [];

  let consulta = `
  SELECT * FROM notificacion
  INNER JOIN publicacion USING (id_publicacion)
  INNER JOIN clase USING (id_clase)
  INNER JOIN curso USING (id_curso)
  INNER JOIN asignacion_clase USING (id_clase)
  WHERE id_alumno = ${id_alumno};`;
  service.consultar(consulta, function (result) {
    if (result.status == 200) {
      resultado = resultado.concat(result.datos);
    }

    let consulta1 = `
    SELECT * FROM notificacion
    INNER JOIN actividad USING (id_actividad)
    INNER JOIN clase USING (id_clase)
    INNER JOIN curso USING (id_curso)
    INNER JOIN asignacion_clase USING (id_clase)
    WHERE id_alumno = ${id_alumno};`;


    service.consultar(consulta1, function (result1) {
      if (result1.status == 200) {
        resultado = resultado.concat(result1.datos);
      }

      let consulta2 = `
      SELECT * FROM notificacion
      INNER JOIN examen USING (id_examen)
      INNER JOIN clase USING (id_clase)
      INNER JOIN curso USING (id_curso)
      INNER JOIN asignacion_clase USING (id_clase)
      WHERE id_alumno = ${id_alumno};`;

      service.consultar(consulta2, function (result2) {
        if (result2.status == 200) {
          resultado = resultado.concat(result2.datos);
        }

        resultado.forEach(dato => {
          dato.fecha_hora = fecha.fechaTiempo(dato.fecha_hora);
        });
    
        res.status(result.status).json(resultado);

      });

    });

  });
});

// ----------------------------------------------------------------------------- EXAMENES
router.post("/getExamenesAlumno", async function (req, res) {
  const { id_alumno } = req.body

  let consulta = `
    SELECT *, SUM(pregunta.valor) as total_examen FROM examen
    INNER JOIN asignacion_examen USING (id_examen)
    INNER JOIN alumno USING (id_alumno)
    INNER JOIN clase USING (id_clase)
    INNER JOIN curso USING (id_curso)
    INNER JOIN pregunta USING (id_examen)
    WHERE id_alumno = ${id_alumno}
    GROUP BY id_examen;
  `;

  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha_publicacion = fecha.fechaTiempo(dato.fecha_publicacion);
      dato.fecha_inicio = fecha.fechaTiempo(dato.fecha_inicio);
      dato.fecha_final = fecha.fechaTiempo(dato.fecha_final);
    });


    res.status(result.status).json(result.datos);
  });


});

router.post("/getPregunta", async function (req, res) {
  const { id_examen, pregunta } = req.body

  let consulta = `
    SELECT * FROM pregunta
    INNER JOIN examen USING (id_examen)
    WHERE id_examen = "${id_examen}";
  `;

  service.consultar(consulta, function (result) {
    if (result.datos.length < pregunta) {
      res.status(result.status).json(undefined);
    } else {
      res.status(result.status).json(result.datos[pregunta - 1]);
    }
  });

});

router.post("/getOpciones", async function (req, res) {
  const { id_pregunta } = req.body
  console.log(id_pregunta);

  let consulta = `
    SELECT * FROM opcion
    WHERE id_pregunta = "${id_pregunta}";
  `;

  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });

});

router.post("/guardarNotaExamen", async function (req, res) {
  const { id_examen, id_alumno, puntuacion } = req.body

  let consulta = `
    UPDATE asignacion_examen SET puntuacion = ${puntuacion}
    WHERE id_examen = ${id_examen} AND id_alumno = ${id_alumno};
  `;

  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });

});


module.exports = router;