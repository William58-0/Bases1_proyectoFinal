//import dateFormat, { masks } from "dateformat";

var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./connection.js");
const multer = require('multer');
let csvToJson = require('convert-csv-to-json');
const fecha = require("./CorregirFecha");

var router = express.Router();
router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// sirve para guardar los archivos enviados desde el frontend
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'csv/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

router.post('/crearUsuario', upload.single('file'), async function (req, res) {

  const { tipo, nombre, apellido, telefono, direccion,
    correo, nacimiento, dpi_carnet, contrasenia, imagen } = req.body

  var query = ""
  if (tipo == 'Maestro') {
    query = `INSERT INTO maestro(nombre, apellido, telefono, direccion, correo, fecha_nacimiento, dpi, contrasenia ) 
      VALUES( "${nombre}", "${apellido}", "${telefono}", "${direccion}", "${correo}", "${nacimiento}", "${dpi_carnet}", "${contrasenia}" );`
  } else {
    query = `INSERT INTO alumno(carnet, nombre, apellido, telefono,direccion, correo, contrasenia ) 
      VALUES( "${dpi_carnet}", "${nombre}", "${apellido}", "${telefono}", "${direccion}", "${correo}", "${contrasenia}" );`
  }

  if (req.file != undefined) {
    /// GUARDAAAR LA FOTO DEL USUARIO
  }

  service.consultar(query, function (result) {
    res.status(result.status).json(result.datos);
  });
})

router.post("/crearCurso", async function (req, res) {
  const { nombre } = req.body
  let consulta = `INSERT INTO curso(nombre_curso) VALUES("${nombre}");`
  service.consultar(consulta, function (result) {
    res.status(result.status).json(result.datos);
  });
});


router.post('/cargaMasiva', upload.single('file'), async function (req, res) {

  const { tipo } = req.body

  if (req.file == undefined) {
    console.log("ERROR: No hay archivo");
    res.status(400).json("ERROR: No hay archivo");
  }

  try {
    let path = './csv/' + req.file.originalname;
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);

    if (tipo == 'Maestro') {
      json.forEach(reg => {
        reg.FechaNacimiento = fecha.fechaLegible(reg.FechaNacimiento);
        var query = `INSERT INTO maestro(nombre, apellido, telefono, direccion, correo, fecha_nacimiento, dpi, contrasenia ) 
        VALUES( "${reg.Nombre}", "${reg.Apellido}", "${reg.Telefono}", "${reg.Direccion}", 
              "${reg.Correo}", "${reg.FechaNacimiento}", "${reg.DPI}", "${reg.Contrasena}" );`

        service.consultar(query, function (result) {
          console.log(result.datos);
        });

      });
    } else {
      json.forEach(reg => {
        var query = `INSERT INTO alumno(carnet, nombre, apellido, telefono, direccion, correo, contrasenia ) 
        VALUES( "${reg.Carnet}", "${reg.Nombre}", "${reg.Apellido}", "${reg.Telefono}", 
              "${reg.Direccion}", "${reg.Correo}", "${reg.Contrasena}" );`

        service.consultar(query, function (result) {
          console.log(result.datos);
        });

      });
    }

  } catch (err) {
    console.error(err)
    res.status(400).json(err);
  } finally {
    res.status(200).json('OK');
  }

})

router.post("/getUsuarios", async function (req, res) {
  const { tipo } = req.body

  var query = "";
  if (tipo == 'Maestro') {
    query = `SELECT * FROM maestro;`
  } else {
    query = `SELECT * FROM alumno;`
  }

  service.consultar(query, function (result) {
    res.status(result.status).json(result.datos);
  });

});

router.post("/getUsuario", async function (req, res) {
  const { usuario, tipo } = req.body

  var query = "";
  if (tipo == 'Maestro') {
    query = `SELECT * FROM maestro WHERE id_maestro = "${usuario}";`
  } else {
    query = `SELECT * FROM alumno WHERE id_alumno = "${usuario}";`
  }

  service.consultar(query, function (result) {
    if (tipo == 'Maestro') {

      result.datos[0].fecha_nacimiento = fecha.fechaLegible(result.datos[0].fecha_nacimiento);

      res.status(result.status).json(result.datos);
    } else {
      res.status(result.status).json(result.datos);
    }
  });

});

router.post("/eliminarUsuario", async function (req, res) {
  const { usuario, tipo } = req.body

  var query = "";
  if (tipo == 'Maestro') {
    query = `DELETE FROM maestro WHERE id_maestro = "${usuario}";`
  } else {
    query = `DELETE FROM maestro WHERE id_alumno = "${usuario}";`
  }

  service.consultar(query, function (result) {
    res.status(result.status).json(result.datos);
  });

});

router.post("/editarUsuario", async function (req, res) {
  const { usuario, tipo, nombre, apellido, telefono, direccion,
    correo, nacimiento, dpi_carnet, contrasenia, imagen } = req.body

  var query = "";
  if (tipo == 'Maestro') {
    query = `UPDATE maestro SET nombre="${nombre}", apellido = "${apellido}", telefono="${telefono}", direccion = "${direccion}",
    correo="${correo}", fecha_nacimiento="${nacimiento}", dpi = "${dpi_carnet}", contrasenia = "${contrasenia}" 
    WHERE id_maestro = "${usuario}";`
  } else {
    query = `INSERT INTO alumno(carnet, nombre, apellido, telefono, direccion, correo, contrasenia ) 
      VALUES( "${dpi_carnet}", "${nombre}", "${apellido}", "${telefono}", "${direccion}", "${correo}", "${contrasenia}" );`

    query = `UPDATE alumno SET carnet = "${dpi_carnet}",  nombre="${nombre}", apellido = "${apellido}", telefono="${telefono}",
      direccion = "${direccion}", correo="${correo}", contrasenia = "${contrasenia}" 
      WHERE id_alumno = "${usuario}";`
  }

  service.consultar(query, function (result) {
    res.status(result.status).json(result.datos);
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

router.get("/getMaestros", async function (req, res) {
  let consulta = `
    SELECT * FROM maestro;
  `
  service.consultar(consulta, function (result) {
    res.status(200).json(result.datos);
  });
});

router.get("/getAlumnos", async function (req, res) {
  let consulta = `
    SELECT * FROM alumno;
  `
  service.consultar(consulta, function (result) {
    res.status(200).json(result.datos);
  });
});



module.exports = router;