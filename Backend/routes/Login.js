
const fs = require('fs');
var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const service = require("./Herramientas/connection");
let csvToJson = require('convert-csv-to-json');
const fecha = require("./Herramientas/CorregirFecha");
const archivos = require("./Herramientas/Archivos");

var router = express.Router();
router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));



router.post("/iniciarSesion", async function (req, res) {
  const { dpi_carnet, password, tipo } = req.body;

  let consulta = ""

  if (tipo == 'Maestro') {
    consulta = `SELECT * FROM maestro WHERE dpi = "${dpi_carnet}" AND contrasenia = "${password}";`
  } else {
    consulta = `SELECT * FROM alumno WHERE carnet = "${dpi_carnet}" AND contrasenia = "${password}";`
  }

  service.consultar(consulta, async function (result) {
    if (result.status == 200) {
      if (result.datos.length > 0) {
        /// CARGAR LA FOTO DEL USUARIO
        const imgDefault = './profile_images/default/default.jpg'

        var destino = '../Frontend/src/profile_image/imagen.jpg';

        if (result.datos.length > 0) {

          var buscar = ''
          if (tipo === 'Maestro') {
            buscar = './profile_images/maestros/' + dpi_carnet + '.jpg';
          } else {
            buscar = './profile_images/alumnos/' + dpi_carnet + '.jpg';
          }

          try {
            if (!fs.existsSync(buscar)) {
              console.log("no existe la imagen");
              buscar = imgDefault;
            }

            await archivos.copy(buscar, destino);
            console.log("se pudo copiar");
          } catch (err) {
            console.log("no tiene foto");
            try {
              await archivos.copy(imgDefault, destino);
              console.log("se pudo copiar");
            } catch (err1) {
              console.log(err1);
              console.log("no se pudo copiar :c");
            }
          }
        } else {

          try {
            await archivos.copy(imgDefault, destino);
            console.log("se copio imagen default");
          } catch (err1) {
            console.log(err1);
          }

        }
      }
    }

    res.status(result.status).json(result.datos);

  });

});



module.exports = router;