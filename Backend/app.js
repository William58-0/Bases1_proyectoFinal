var express = require("express");
var app = express();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
const cors = require("cors");

var Publicaciones = require("./routes/Publicaciones")
var Usuarios = require("./routes/Usuarios")
var Maestros = require("./routes/Maestros")
var Alumnos = require("./routes/Alumnos")

app.use(cors(corsOptions));
app.use("/Publicaciones", Publicaciones)
app.use("/Usuarios", Usuarios)
app.use("/Maestros", Maestros)
app.use("/Alumnos", Alumnos)

app.listen(9000, () => {
  console.debug("Servidor escuchando en puerto: 9000");
});

module.exports = app;

