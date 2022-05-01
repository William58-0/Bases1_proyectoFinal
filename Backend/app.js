var express = require("express");
var app = express();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
const cors = require("cors");

var Administrador = require("./routes/Administrador")
var Maestros = require("./routes/Maestros")
var Alumnos = require("./routes/Alumnos")
var Login = require("./routes/Login")

app.use(cors(corsOptions));

app.use("/Administrador", Administrador)
app.use("/Maestros", Maestros)
app.use("/Alumnos", Alumnos)
app.use("/Login", Login)

app.listen(9000, () => {
  console.debug("Servidor escuchando en puerto: 9000");
});

module.exports = app;

