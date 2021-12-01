import dbConnect from "../../../../utils/dbConnect";
import Turno from "../../../../models/Turno";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "DELETE":
      
      try {
        const sucursalDeleted = await Turno.deleteOne({_id: `${req.query._id}`})
        
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
