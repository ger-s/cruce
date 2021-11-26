const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "por favor, agregá un nombre."],
      trim: true,
      maxlength: [30, "los nombres sólo pueden tener hasta 30 caracteres"],
    },
    lastName: {
      type: String,
      required: [true, "por favor, agregá un apellido."],
      trim: true,
      maxlength: [30, "los apellidos sólo pueden tener hasta 40 caracteres"],
    },
    password: {
      type: String
    },
    dni: {
      type: String,
      required: [true, "por favor, agregá el DNI."],
      maxlength: [10, "los DNI sólo pueden tener hasta 10 carácteres"],
      minlength: [7, "los DNI sólo pueden tener desde 7 carácteres"],
    },
    salt: { type: String, default: ""},
    email: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
    isOperator: { type: Boolean, default: false },
    type: { type: String, default: "default" },
  },
  { versionKey: false }
);

// Para añadir metodos de instancia
UserSchema.methods.switchAdmin = async function (password, salt) {
  await User.updateOne({ _id: this._id }, { admin: !this.admin });
};

UserSchema.static("hash", function (password, salt) {
  return bcrypt.hash(password, salt);
});

// Before create
UserSchema.pre("save", async function (next) {
  // Checkear si es usuario default
  if (this.type !== "default") return next();
  // Prevenir que se cree un usuario admin
  this.isAdmin = false;
  this.isOperator = false;
  const salt = await bcrypt.genSalt();
  this.salt = salt
  // Guardar el salt
  // Generar la contraseña hasheada
  const hashedPassword = await bcrypt.hash(this.password, salt);
  // Guardar contraseña hasheada
  this.password = hashedPassword;
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
