const mongoose = require("mongoose");

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
      dni: { type: Number, unique: [true,"este dni esta siendo utilizado"] },
      email: { type: String, unique: [true, "este mail esta siendo utilizado"]},
      
    },
  ],
  openingTime: {
    type: String,
    required: [true, "por favor, agregá un horario de apertura."],
    trim: true,
  },
  closingTime: {
    type: String,
    required: [true, "por favor, agregá un horario de cierre."],
    trim: true,
  },
  history: [
    {
      // ver si aplica unique: true o al ser del model user no es necesario
      client: {
        name: { type: String},
        dni: { type: Number },
        email: { type: String},
        
      },
      date: { type: Date },
      sucursal: { type: String },
      state: { type: String },
      
    },
  ],
});

module.exports =
  mongoose.models.Sucursal || mongoose.model("Sucursal", SucursalSchema);
