import dbConnect from "../../../../../utils/dbConnect";
import Turno from "../../../../../models/Turno";
import validateJWT from "../../../../../middleware/_middleware"

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "DELETE":
      
      try {

        // editar estatus de pending a cancelado 

        //estados pending - asistio - no asistio - cancelo

        const auth = await validateJWT(req)
auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null

        const sucursalDeleted = await Sucursal.deleteOne({history: {_id: `${req.query._id}`}})
        
        res.status(202).json({ success: true, data: "Turno eliminado satisfactoriamente." });
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
