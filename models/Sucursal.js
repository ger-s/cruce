const mongoose = require("mongoose");
const Turno = require("./Turno");

const SucursalSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "por favor, agregá un nombre."],
    unique: [true, "este nombre esta siendo utilizado"],
    trim: true,
    maxlength: [
      30,
      "el nombre de la sucursal sólo puede tener hasta 30 caracteres",
    ],
  },
  address: {
    type: String,
    required: [true, "por favor, agregá una dirección."],
    unique: [true, "esta dirección esta siendo utilizada"],
    trim: true,
    maxlength: [200, "la dirección sólo puede tener hasta 200 caracteres"],
  },
  city: {
    type: String,
    required: [true, "por favor, agregá una ciudad."],
    unique: false,
    trim: true,
  },
  zipCode: {
    type: String,
    required: [true, "por favor, agregá una dirección."],
    unique: false,
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "por favor, agregá un teléfono."],
    unique: [true,"este telefono esta siendo utilizado"],
    trim: true,
    maxlength: [15, "el teléfono sólo puede tener hasta 15 dígitos"],
  },
  operators: [
    {
      name: { type: String },
      lastName: { type: String },
      dni: { type: Number  },
      email: { type: String},
      
    },
  ],
  openingTime: {
    type: String,
    required: [true, "por favor, agregá un horario de apertura."],
    trim: true,
    unique: false
  },
  closingTime: {
    type: String,
    required: [true, "por favor, agregá un horario de cierre."],
    trim: true,
    unique: false
  },
  history: [
    {
      client: {
        name: { type: String},
        dni: { type: Number },
        email: { type: String},
        
      },
      date: { type: Date },
      sucursal: { type: String },
      state: { type: String , default: "pendiente" },
      
    },
  ],
});

module.exports =
  mongoose.models.Sucursal || mongoose.model("Sucursal", SucursalSchema);