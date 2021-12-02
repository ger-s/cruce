import Turno from "../../../../models/Turno";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";
import sendEmail from "../../../../utils/sendEmail";


dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    

    case "POST":
      try {
        const user = await User.findOne({dni: `${req.query.dni}`});
        console.log("userrrrr", user)
        const createTurno = new Turno(req.body);
        await createTurno.save();
       
        console.log("turno", createTurno)
        sendEmail(user.email, "registro de turno", `Hola ${user.name}! \nTe enviamos la confirmación del turno. \nSucursal: ${createTurno.sucursal.name}, \nDirección: ${createTurno.sucursal.address},\nHorario: ${createTurno.horaTurno}  \nContacto: ${createTurno.sucursal.phone}`);


        res.status(200).json({success: true, data: "turno success"});
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }
 
    default:
      res.status(400).json({ success: false });
      break;
  }
};
