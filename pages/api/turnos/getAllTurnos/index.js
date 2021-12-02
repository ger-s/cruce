import dbConnect from "../../../../utils/dbConnect";
import Turno from "../../../../models/Turno";
import Sucursal from "../../../../models/Sucursal"
import validateJWT from "../../../../middleware/_middleware"

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {

        const auth = await validateJWT(req)
        auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null

          // trae todos los turnos (deberia filtrar por sucursal)
        const user = await Sucursal.findOne({name: `${req.query.name}`}
        
        
        );

        const turnos = await Turno.find({});
        res.status(200).json({ success: true, data: turnos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    break;
   
    default:
      res.status(400).json({ success: false });
      break;
  }
};
