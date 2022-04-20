const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let csvToJson = require('convert-csv-to-json');
const cors = require('cors');
const multer = require('multer');

// recibir datos en formato json
app.use(bodyParser.json());

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'csv/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

//peticiones para obtener todos los valores de la tabla
app.get('/mediciones', async (request, response) => {
    const { ruta, dat1, dat2, dat3, dat4 } = request.body;
    //let path = './archivos/' + `${ruta}`
    let path = './csv/alumnos.csv';
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);
    console.log(json);

    for (let i = 0; i < json.length; i++) {
        //const datosJson = [json[i].Pais,json[i].Nombre,json[i].Fecha_ing,json[i].Capacidad,json[i].Direccion,json[i].Estado];
        //console.log(datosJson);
        /*
        try {
            response = await service.connect(
                `
          insert into equipo(nombre,fecha_fun,pais) 
          values ('${json[i].Nombre}','${json[i].Fecha_Fun}','${json[i].Pais}')
          `
            );

        } catch (err) {
            console.error(err)
            return { estado: false, err }
        } finally {
            if (consulta) {
                consulta.release((err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }
        }
        */
    }
    response.send({ result: "Ok" });
})

app.post('/image', upload.single('file'), function (req, res) {
    console.log(req.body);
    console.log(req.file.originalname);


    try {
        let path = './csv/' + req.file.originalname;
        let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(path);

        console.log(json);

        json.forEach(registro => {
            // AQUIII TIENE QUE INSERTAR LA INFO
            var query = "insert into mediciones(temperatura1,temperatura2,cantidad_luz,humedad,calidad_aire) " +
                "values (" + temperatura1 + "," + temperatura2 + "," + cantidad_luz + "," + humedad + "," + calidad_aire + ");";

            conexion.query(query, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    console.log("agregado");
                    response.send({ result: "Ok" });
                }
            });

        });


    } catch (err) {
        console.error(err)
        return { estado: false, err }
    } finally {
        if (consulta) {
            consulta.release((err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }

    res.json({})
})

//agregar valores a la tabla
app.post('/agregar', (request, response) => {
    var temperatura1 = request.body.temperatura1;
    console.log("hola");

    response.send({ result: "Ok" });
})

//obtener ultimo registro de la tabla
app.get('/ultimo', (request, response) => {

})


app.listen(5000, () => {
    console.log("Corriendo en puerto 5000");
});