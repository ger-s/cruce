import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import validateJWT from "../../../../middleware/_middleware";
import sendEmail from "../../../../utils/sendEmail";
const bcrypt = require("bcrypt");

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    // validar la contraseña antigua (hasheada que sea correcta)
    case "PUT":
      try {
        /* const auth = await validateJWT(req)
        auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null */
        // req.body.passConfirmation va a ser una key que se mete desde el front en el req.body
        // sería el input del "ingrese su contraseña actual"
        if (req.body.passConfirmation) {
          // en el localsotrage se guarda el user desde jwt, busco al usuario real desde esa id
          const userFound = await User.findOne({
            _id: req.query._id
          });
          // se comparan la supuesta contraseña actual, con la real traída con el findOne (hasheada)
          if (
            await User.comparePassword(
              req.body.passConfirmation,
              userFound.password
            )
          ) {
            //esto hashea la nueva pass
            const salt=await bcrypt.genSalt()
            const newPassHashed = await bcrypt.hash(req.body.newPassword, salt);
            // si todo sale bien, se updatea el usuario
            const userModified = await User.findOneAndUpdate(
              { _id: `${req.query._id}` },
              { password: newPassHashed }

            )
            sendEmail(req.body.email, "Cambio de contraseña", `Cambio de contraseña exitoso!`);
            res.status(201).json({ 
              success: true,
              successMessage: "Cambio de contraseña exitoso",
              data: userModified,
            });
            
          } else {
            res
              .status(400)
              .json({
                success: false,
                successMessage: "la contraseña ingresada es incorrecta",
                data: ""
              });
          }
        } else {
          const user = await User.findOne({ _id: `${req.query._id}` });

          if (req.body.role && req.body.role !== "user")
            return res
              .status(400)
              .json({
                success: false,
                successMessage: "no tiene permisos de admin!"
              });
          else {
            const userModified = await User.findOneAndUpdate(
              { _id: `${req.query._id}` },
              req.body
            );

            sendEmail(
              userModified.email,
              "Cambio de datos CRUCE",
              `Se modificaron los datos exitosamente!`
            );

            res
              .status(201)
              .json({
                success: true,
                successMessage: "Usuario modificado satisfactoriamente",
                data: ""
              });
          }
        }
      } catch (error) {
        res
          .status(400)
          .json({
            success: false,
            successMessage: error,
            data: console.log(error)
          });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
