import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import validateJWT from "../../../../middleware/_middleware"

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // const auth = await validateJWT(req)
        // auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null
        const user = await User.findOne({dni: `${req.query.dni}`});
        res.status(200).json({ success: true,successMessage: "success", data: user });
      } catch (error) {
        res.status(400).json({ success: false,successMessage:error });
      }
    break;

    case "PUT":
      try {

        const user = await User.updateOne({dni: `${req.query.dni}`}, {conTurno: false});
        res.status(200).json({ success: true,successMessage: "success", data: user });
      } catch (error) {
        res.status(400).json({ success: false,successMessage:error });
      }
      break;
   
    default:
      res.status(400).json({ success: false });
      break;
  }
};
