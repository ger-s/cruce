import dbConnect from "../../../../../utils/dbConnect";
import Sucursal from "../../../../../models/Sucursal";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const sucursalModified = await Sucursal.findOneAndUpdate({_id: `${req.query._id}`}, req.body)
        return res.status(201).json({ success: true, data: "Sucursal modificada satisfactoriamente." });
        
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
