import dbConnect from "../../../../../utils/dbConnect";
import Turno from "../../../../../models/Turno";
import validateJWT from "../../../../../middleware/_middleware"
import Sucursal from "../../../../../models/Sucursal"

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      
      try {

        // editar estatus de pending a cancelado 

        //estados pending - asistio - no asistio - cancelo
        
        /* 
          const auth = await validateJWT(req)
          auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null 
        */

        // Busco la sucursal
         const sucursal = await Sucursal.findOne(
          { _id:  `${req.query._id}` }
        );

        // Mapeo todos los turnos de esa sucursal para encontrar el turno a cancelar.
        sucursal.history.map(turno => {
          const turnoString = turno._id.toString();

          if (turnoString ===  req.body._id) {
            turno.state = req.body.state;
            sucursal.save()
          }
        })
        
        res.status(202).json({ success: true, data: "Turno eliminado satisfactoriamente." });
      } 
      catch (error) {
        res.status(400).json({ success: console.log(error) });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
