import dbConnect from "../../../../../utils/dbConnect";
import Sucursal from "../../../../../models/Sucursal";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "DELETE":
      try {
        const sucursalDeleted = await Sucursal.deleteOne({_id: `${req.query._id}`})
        
        res.status(201).json({ success: true,successMessage:"Sucursal eliminada satisfactoriamente",data:""  });
      } catch (error) {
        res.status(400).json({ success: false , successMessage:error});
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
