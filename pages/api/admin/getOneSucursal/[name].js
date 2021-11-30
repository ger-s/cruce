import dbConnect from "../../../../utils/dbConnect";
import Sucursal from "../../../../models/Sucursal";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const sucursal = await Sucursal.findOne({name: `${req.query.name}`});
        res.status(200).json({ success: true,successMessage:"Usuario encontrado", data:sucursal });
      } catch (error) {
        res.status(400).json({ success: false ,successMessage:error});
      }
    break;
   
    default:
      res.status(400).json({ success: false });
      break;
  }
};