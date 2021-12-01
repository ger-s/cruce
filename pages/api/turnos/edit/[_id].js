import dbConnect from "../../../../utils/dbConnect";
import Turno from "../../../../models/Turno";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const turnoModified = await Turno.findOneAndUpdate({_id: `${req.query._id}`}, req.body)
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
