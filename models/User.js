const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "por favor, agregá un nombre."],
      trim: true,
      unique: false,
      maxlength: [30, "los nombres sólo pueden tener hasta 30 caracteres"],
    },
    lastName: {
      type: String,
      required: [true, "por favor, agregá un apellido."],
      unique: false,
      trim: true,
      maxlength: [30, "los apellidos sólo pueden tener hasta 40 caracteres"],
    },
    password: {
      required: [true, "por favor, agregá una contraseña."],
      unique: false,
      type: String
    },
    dni: {
      type: String,
      unique: true,
      required: [true, "por favor, agregá el DNI."],
      maxlength: [10, "los DNI sólo pueden tener hasta 10 carácteres"],
      minlength: [7, "los DNI sólo pueden tener desde 7 carácteres"],
    },
    salt: { type: String, default: ""},
    email: {
      type: String,
      required: true,
      //validate: [validateEmail, 'por favor, ingresá un email válido.'],
    },
    creationDate: {
      type: Date
    },
    phone:{
     type:Number,
     required:true,
    },

    // rol: "admin" o "operator" o "user"  en string
    role: {
      type: String,
      default: 'user'
    },
    type: { type: String, default: "default" },
    

  },
  { versionKey: false }
);

// Para añadir metodos de instancia
UserSchema.methods.switchAdmin = async function (password, salt) {
  await User.updateOne({ _id: this._id }, { role: !this.role });
};

UserSchema.static("hash", function (password, salt) {
  return bcrypt.hash(password, salt);
});



UserSchema.statics.comparePassword=async function (password,newPassword) {
return bcrypt.compare(password,newPassword)

}


// Before create
UserSchema.pre("save", async function (next) {
  // Checkear si es usuario default
  if (this.type !== "default") return next();
  // Prevenir que se cree un usuario admin
  this.role = 'user';
  const salt = await bcrypt.genSalt();
  this.salt = salt
  // Guardar el salt
  // Generar la contraseña hasheada
  
  const hashedPassword = await bcrypt.hash(this.password, salt);
  // Guardar contraseña hasheada
  this.password = hashedPassword;
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
