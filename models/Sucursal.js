const mongoose = require("mongoose");

const SucursalSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "por favor, agregá un nombre."],
    unique: true,
    trim: true,
    maxlength: [30, "el nombre de la sucursal sólo puede tener hasta 30 caracteres"],
  },
  address: {
    type: String,
    required: [true, "por favor, agregá una dirección."],
    unique: true,
    trim: true,
    maxlength: [200, "la dirección sólo puede tener hasta 200 caracteres"],
  },
  phone: {
    type: Number,
    required: [true, "por favor, agregá un teléfono."],
    unique: true,
    maxlength: [15, "el teléfono sólo puede tener hasta 15 dígitos"]
  },
  operators: [{
    name: { type: String },
    lastName: { type: String },
    dni: { type: Number },
    email: { type: String }
  }],
  openingTime: { 
    type: Date,
    required: [true, "por favor, agregá un horario de apertura."],
    unique: true
  },
  closingTime: {
    type: Date,
    required: [true, "por favor, agregá un horario de cierre."],
    unique: true
  },
  history: [{
    client: {
      name: {type: String},
      dni: {type: Number},
      email: {type: String}
    },
    date: {type: Date},
    sucursal: {type: String},
    state: {type: String}
  }]
})

module.exports = mongoose.models.Sucursal || mongoose.model("Sucursal", SucursalSchema);