import dbConnect from "../../../../utils/dbConnect";
import Sucursal from "../../../../models/Sucursal";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const sucursales = await Sucursal.find({});
        res.status(200).json({ success: true,successMessage:"Sucursales encontradas" ,data:sucursales });
      } catch (error) {
        res.status(400).json({ success:false , successMessage:error  });
      }
    break;
   
    default:
      res.status(400).json({ success: false });
      break;
  }
};
