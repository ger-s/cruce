import dbConnect from "../../../utils/dbConnect";
import User, { distinct } from "../../../models/User";
import jwt from "jsonwebtoken";
import { jwtPass } from "../../../secret.json";
import generateJWT from "../../../utils/generateJWT";
import sendEmail from "../../../utils/sendEmail";
import Sucursal from "../../../models/Sucursal"

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
       
const findUser=await User.findOne({dni:`${req.query.dni }`}  )
        ///Sendmail el 2do parametro es el subject y el 3ero es el texto del email
 const dni =findUser.dni

const turnoUser=await Sucursal.findOne( {_id:req.body._id})

const historyUser= turnoUser.history.filter(data=>data.client.dni===dni)

        sendEmail(findUser.email, "Recordatorio de turno", `Hola ${historyUser[0].client.name } \nRecorda el turno para el día ${new Date(historyUser[0].date).toLocaleDateString('es-AR')} a las ${new Date(historyUser[0].date).toLocaleTimeString('es-AR')} en ${historyUser[0].sucursal} `);

        res.status(201).json({
          success: true,
          successMessage: "Email enviado",
          data: findUser,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          successMessage: "Envio de email fallido",
          data: console.log(error),
        });
      }

      break;
  }
};