import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const user = await User.findOne({dni: `${req.query.dni}`});
        res.status(200).json({ success: true,successMessage:"usuario encontrado", data:user });
      } catch (error) {
        res.status(400).json({ success: false ,successMessage:error});
      }
    break;
   
    default:
      res.status(400).json({ success: false });
      break;
  }
};
