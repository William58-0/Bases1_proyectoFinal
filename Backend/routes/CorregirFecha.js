const moment = require("moment");


function fechaLegible(date) {
  let newDate = moment.utc(date).format('YYYY-MM-DD');

  return newDate;
}

function fechaVisible(date) {
  let newDate = moment.utc(date).format('DD-MM-YYYY');

  return newDate;
}


module.exports = {
  fechaLegible,
  fechaVisible,
};