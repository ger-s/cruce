const mongoose = require("mongoose");

const TurnoSchema = mongoose.Schema({
  turnosRestantes: {
    type: Number
  },
  horaTurno: { type: String },
  sucursal: {
    
    name: {type: String},
    phone: {type: String},
    address: {type: String}
  }

})

module.exports = mongoose.models.Turno || mongoose.model("Turno", TurnoSchema);