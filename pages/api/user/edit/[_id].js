import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {

// validar la contraseña antigua (hasheada que sea correcta)
    case "PUT":
      
    try {
        const userModified = await User.findOneAndUpdate({_id: `${req.query._id}`}, req.body)

        // utiliza un Json {} para solo modificar la pass
        
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