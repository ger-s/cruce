import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "DELETE":
      // si es admin no puede autoeliminarse //
      try {
        const userDeleted = await User.deleteOne({_id: `${req.query._id}`})
        
        res.status(202).json({ success: true, data: "Usuario eliminado satisfactoriamente." });
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
