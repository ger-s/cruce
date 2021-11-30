import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const userModified = await User.findOneAndUpdate({_id: `${req.query._id}`}, req.body)
        return res.status(201).json({ success: true,successMessage:"Usuario modificado satisfactoriamente." ,data:"" });
        
      } catch (error) {
        res.status(400).json({ success: false , successMessage:error });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
