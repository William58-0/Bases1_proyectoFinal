const moment = require("moment");


function corregirFecha(date) {
  var date = new Date(date);

  var mes = (1 + date.getMonth()).toString();

  var dia = date.getDate().toString();

  return date.getFullYear() + '-' + mes + '-' + dia;

}

function enviarFecha(isoDate) {
  let newDate = moment.utc(isoDate).format('YYYY-MM-DD');

  return newDate;

}

module.exports = {
  corregirFecha,
  enviarFecha,
};