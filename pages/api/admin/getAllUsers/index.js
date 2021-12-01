import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true,successMessage:"Usuarios encontrados", data: users });
      } catch (error) {
        res.status(400).json({ success: false ,successMessage:error});
      }
    break;
   
    default:
      res.status(400).json({ success: false });
      break;
  }
};
