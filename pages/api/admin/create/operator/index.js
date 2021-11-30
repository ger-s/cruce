import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";


dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const createOperator = new User(req.body);
        await createOperator.save();
        res.status(200).json({success: true,successMessage:"operador creado", data: ""});
      } catch (error) {
        res.status(400).json({ success:false,successMessage:error});
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
