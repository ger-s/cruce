import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";
import validateJWT from "../../../../../middleware/_middleware"

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {

        const auth = await validateJWT(req)
        auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null
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
