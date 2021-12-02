import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import validateJWT from "../../../../middleware/_middleware"


dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {

// validar la contraseña antigua (hasheada que sea correcta)
    case "PUT":
      try {
        
        const auth = await validateJWT(req)
        auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null
        // req.body.passConfirmation va a ser una key que se mete desde el front en el req.body
        // sería el input del "ingrese su contraseña actual"
        if (req.body.passConfirmation) {
          // en el localsotrage se guarda el user desde jwt, busco al usuario real desde esa id
          const userFound = await User.findOne({ _id: localstorage.getItem("user").id });
          // se comparan la supuesta contraseña actual, con la real traída con el findOne (hasheada)
          if (await User.comparePassword(req.body.passConfirmation, userFound.password)) {
            // si todo sale bien, se updatea el usuario
            const userModified = await User.findOneAndUpdate({_id: `${req.user._id}`}, {password: req.body.newPassword})
          } else {
            res.status(400).json({ success: false, successMessage:"la contraseña ingresada es incorrecta",data:"" });
          }
        } else {
          const userModified = await User.findOneAndUpdate({_id: `${req.query._id}`}, req.body)
        }
        sendEmail(userModified.email, "Cambio de datos CRUCE", `Se modificaron los datos exitosamente!`);
        return res.status(201).json({ success: true, successMessage:"Usuario modificado satisfactoriamente",data: "" });
      } catch (error) {
        res.status(400).json({ success: false,successMessage:error });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
