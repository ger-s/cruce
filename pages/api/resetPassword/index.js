const bcrypt = require("bcrypt");
import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import { secretSalt } from '../../../secret.json'

//se importa esta funcion mailer
const sendPasswordReset = (code, email) => {};

dbConnect();

export default async (req, res) => {
  const resetCode = Math.floor(100000 + Math.random() * 900000);
  const { method } = req;

  const hashedCode = bcrypt.hash(resetCode, bcrypt.genSalt(secretSalt))

  switch (method) {
    case "POST":
      try {
        const userFound = await User.findOne({ email: req.body.email });
        if (!userFound)
          return res.status(400).json({
            success: false,
            successMessage: "usuario no encontrado",
          });
        // se necesita guardar desde el front el email enviado,
        // para enviarlo en el put
        // también se va a guardar el reset code para el put
        sendPasswordReset(resetCode, req.body.email);
        return res.status(200).json({
          success: true,
          successMessage: "usuario encontrado",
          code: hashedCode
        });
      } catch (error) {
        console.log(error);
      }
      break;

    case "PUT":
      try {
        if (resetCode !== req.body.code) {
          return res.status(400).json({
            success: false,
            successMessage: "código de 6 dígitos incorrecto",
          });
        }
        const userFound = await User.findOneAndUpdate(
          { email: req.body.email },
          { password: req.body.password }
        );
        if (!userFound)
          return res.status(400).json({
            success: false,
            successMessage: "usuario no encontrado",
          });
        const userUpdated = await User.findOne({ email: req.body.email });
        res.status(200).json({
          success: true,
          successMessage: "cambio de contraseña exitoso",
          data: userUpdated,
        });
      } catch (error) {
        res.status(400).json({ success: false, successMessage: error });
      }
      break;
  }
};
