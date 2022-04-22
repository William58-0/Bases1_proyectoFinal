//import dateFormat, { masks } from "dateformat";

var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./connection.js");
const multer = require('multer');
let csvToJson = require('convert-csv-to-json');


var router = express.Router();
router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

function corregirFecha(date) {
  var date = new Date(date);

  var mes = (1 + date.getMonth()).toString();

  var dia = date.getDate().toString();

  return date.getFullYear() + '-' + mes + '-' + dia;

}

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
        reg.FechaNacimiento = corregirFecha(reg.FechaNacimiento);
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

  console.log(req.body);

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

module.exports = router;