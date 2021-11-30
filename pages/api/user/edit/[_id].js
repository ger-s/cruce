import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";


dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {

// validar la contraseña antigua (hasheada que sea correcta)
    case "PUT":
      try {
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
            res.status(400).json({ success: [false, "la contraseña ingresada es incorrecta."] });
          }
        } else {
          const userModified = await User.findOneAndUpdate({_id: `${req.query._id}`}, req.body)
        }
        return res.status(201).json({ success: true, data: "Usuario modificado satisfactoriamente." });
        
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};