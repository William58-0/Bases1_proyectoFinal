var express = require("express");
var app = express();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };
const cors = require("cors");

var Generales = require("./routes/Generales");
var Publicaciones = require("./routes/Publicaciones")

app.use(cors(corsOptions));
app.use("", Generales);
app.use("/Publicaciones", Publicaciones)

app.listen(9000, () => {
  console.debug("Servidor escuchando en puerto: 9000");
});

module.exports = app;

