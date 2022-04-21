var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./connection.js");
const multer = require('multer');

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
      VALUES( '${nombre}', '${apellido}', '${telefono}', '${direccion}', '${correo}', '${nacimiento}', '${dpi_carnet}', '${contrasenia}' );`
  } else {
    query = `INSERT INTO alumno(carnet, nombre, apellido, telefono,direccion, correo, contrasenia ) 
      VALUES( '${dpi_carnet}', '${nombre}', '${apellido}', '${telefono}', '${direccion}', '${correo}', '${contrasenia}' );`
  }

  if (req.file != undefined) {
    /// GUARDAAAR LA FOTO DEL USUARIO
  }

  service.consultar(query, function (result) {
    res.status(result.status).json(result.message);
  });
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
    res.status(result.status).json(result.message);
  });

});

module.exports = router;