import dbConnect from "../../../../utils/dbConnect";
import Turno from "../../../../models/Turno";
//import sendEmail from "../../../../utils/sendEmail";
//import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {

        //const user = await User.findOne({dni: `${req.query.dni}`});
        const turnoModified = await Turno.findOneAndUpdate({_id: `${req.query._id}`}, req.body)
        
      /*   sendEmail(user.email, "Modificación de turno", `Hola ${user.name}! te enviamos la modificación del turno. \n Sucursal: ${createTurno.sucursal.name}, \n Dirección: ${createTurno.sucursal.address},\n Horario: ${createTurno.horaTurno}  \n Contacto: ${createTurno.sucursal.phone}`);
        */ 
        return res.status(201).json({ success: true, data: "Turno modificado satisfactoriamente." });

      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
