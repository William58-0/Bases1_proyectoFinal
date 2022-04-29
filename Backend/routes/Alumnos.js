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
  let consulta = `
    SELECT * FROM alumno WHERE id_alumno = "${id_alumno}";
  `
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

// ----------------------------------------------------------------------------- PUBLICACIONES
router.post("/getPublicacionesAlumno", async function (req, res) {
  const { id_alumno } = req.body

  let consulta = `
    SELECT *
    FROM clase
    INNER JOIN publicacion USING (id_clase)
    INNER JOIN curso USING (id_curso)
    INNER JOIN asignacion_clase USING (id_clase)
    WHERE id_alumno = ${id_alumno};
  `;
  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha = fecha.fechaVisible(dato.fecha);
    });
    res.status(result.status).json(result.datos);
  });
});

// ----------------------------------------------------------------------------- ACTIVIDADES
router.post("/getActividadesAlumno", async function (req, res) {
  const { id_alumno } = req.body
  let consulta = `
  SELECT * FROM asignacion_actividad
  INNER JOIN actividad USING (id_actividad)
  WHERE id_alumno = "${id_alumno}";`;
  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha_publicacion = fecha.fechaVisible(dato.fecha_publicacion);
      dato.fecha_entrega = fecha.fechaVisible(dato.fecha_entrega);
      dato.fecha_hora = fecha.fechaTiempo(dato.fecha_hora);
    });
    res.status(result.status).json(result.datos);
  });
});

router.post("/getActividadAlumno", async function (req, res) {
  const { id_asignacion_actividad } = req.body
  let consulta = `
  SELECT * FROM asignacion_actividad
  INNER JOIN actividad USING (id_actividad)
  WHERE id_asignacion_actividad = "${id_asignacion_actividad}
  AND ";`;
  service.consultar(consulta, function (result) {
    result.datos.forEach(dato => {
      dato.fecha_publicacion = fecha.fechaVisible(dato.fecha_publicacion);
      dato.fecha_entrega = fecha.fechaVisible(dato.fecha_entrega);
      dato.fecha_hora = fecha.fechaTiempo(dato.fecha_hora);
    });
    res.status(result.status).json(result.datos);
  });
});


router.post('/entregarActividad', archivos.upload.single('file'), async function (req, res) {

  if (req.file == undefined) {
    console.log("ERROR: No hay archivo");
    res.status(400).json("ERROR: No hay archivo");
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
    UPDATE asignacion_actividad 
    SET fecha_hora = SYSDATE(), archivo = '${req.file.filename}',
    estado_actividad = "Entregado" 
    WHERE id_asignacion_actividad = '${id_asignacion_actividad}';
    `;


    service.consultar(consulta, function (result) {
      res.status(result.status).json(result.datos);
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
  SELECT * FROM clase
  INNER JOIN curso USING (id_curso)
  INNER JOIN asignacion_clase USING (id_clase)
  WHERE id_alumno = ${id_alumno};`;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/getNotasAlumno", async function (req, res) {
  const { id_alumno, id_clase } = req.body
  let consulta = `
  SELECT * FROM clase
  INNER JOIN actividad USING (id_clase)
  INNER JOIN asignacion_actividad USING (id_actividad)
  WHERE (id_alumno = ${id_alumno}) AND (id_clase = ${id_clase});`;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});

router.post("/getTotalAlumno", async function (req, res) {
  const { id_alumno, id_clase } = req.body
  let consulta = `
  SELECT SUM(puntuacion) as total FROM asignacion_actividad
  INNER JOIN actividad USING (id_actividad)
  INNER JOIN alumno USING (id_alumno)
  WHERE (id_alumno = ${id_alumno}) AND (id_clase = ${id_clase})
  GROUP BY id_alumno ;`;
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
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
  INNER JOIN alumno USING (id_alumno)
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
    INNER JOIN alumno USING (id_alumno)
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
      INNER JOIN alumno USING (id_alumno)
      WHERE id_alumno = ${id_alumno};`;

      service.consultar(consulta2, function (result2) {
        if (result2.status == 200) {
          resultado = resultado.concat(result2.datos);
        }
      });

    });

    resultado.forEach(dato => {
      dato.fecha_hora = fecha.fechaTiempo(dato.fecha_hora);
    });

    res.status(result.status).json(resultado);

  });
});


module.exports = router;