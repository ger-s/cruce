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
      type: String,
      required: [true, "por favor, agregá una contraseña."],
    },
    dni: {
      type: String,
      required: [true, "por favor, agregá el DNI."],
      maxlength: [10, "los DNI sólo pueden tener hasta 10 carácteres"],
      minlength: [7, "los DNI sólo pueden tener desde 7 carácteres"],
    },
    email: {
      type: String,
      required: true,
    },
    admin: { type: Boolean, default: false },
    operator: { type: Boolean, default: false },
    type: { type: String, default: "default" },
  },
  { versionKey: false }
);

// Para añadir metodos de instancia
UserSchema.methods.switchAdmin = async function (password, salt) {
  await User.updateOne({ _id: this._id }, { admin: !this.admin });
};

// Para añadir metodos de clase
UserSchema.static("hash", function (password, salt) {
  return bcrypt.hash(password, salt);
});


// Before create
UserSchema.pre("save", async function (next) {
  let user = this
  console.log(user)
  // Checkear si es usuario default
  if (!(user.type === "default")) return next();
  // Prevenir que se cree un usuario admin
  user.admin = false;
  user.operator = false;
  // Crear el salt
  const salt = await bcrypt.genSalt(10, user.password);
  // Guardar el salt
  // Generar la contraseña hasheada
  const hashedPassword = await user.hash(user.password, salt);
  // Guardar contraseña hasheada
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
