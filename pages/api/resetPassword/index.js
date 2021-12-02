import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
const { secretSalt } = require ('../../../secret.json')
import sendEmail from '../../../utils/sendEmail'
const bcrypt = require("bcrypt");


dbConnect();
const resetCode = (Math.floor(100000 + Math.random() * 900000)).toString();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        

        console.log("code", resetCode);
        const salt = await bcrypt.genSalt(secretSalt)
        const hashedCode = await bcrypt.hash(resetCode, salt)
        const userFound = await User.findOne({ email: req.body.email });
        if (!userFound)
          return res.status(400).json({ body: {
            success: false,
            successMessage: "usuario no encontrado",
          }});
        // se necesita guardar desde el front el email enviado,
        // para enviarlo en el put
        // también se va a guardar el reset code para el put
        const email = await sendEmail(req.body.email, "code", `Código para restauración: ${resetCode} .`);
        return res.status(200).json({ headers: {}, body: {
          success: true,
          successMessage: "usuario encontrado",
          code: hashedCode
        }});
      } catch (error) {
        console.log(error);
      }
    case "PUT":
      try {
        if (resetCode !== req.body.code) {
          return res.status(400).json({
            success: false,
            successMessage: "código de 6 dígitos incorrecto",
          });
        }
        const salt=await bcrypt.genSalt()
        const newHash = await bcrypt.hash(req.body.password, salt);
        await User.updateOne(
          { email: req.body.email },
          { password: newHash },
        );
        const userUpdated = await User.findOne({ email: req.body.email });
        res.status(200).json({
          success: true,
          successMessage: "cambio de contraseña exitoso",
          data: userUpdated,
        });
      } catch (error) {
        res.status(400).json({ success: false, successMessage: `algo sale mal ${error}` });
      }
      break;
  }
};
