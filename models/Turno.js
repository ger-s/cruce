const mongoose = require("mongoose");

const TurnoSchema = mongoose.Schema({
  turnosRestantes: {
    type: Number
  },
  horaTurno: { type: Date },
  sucursal: {
    name: {type: String},
    phone: {type: Number},
    address: {type: String}
  }
})

module.exports = mongoose.models.Turno || mongoose.model("Turno", TurnoSchema);