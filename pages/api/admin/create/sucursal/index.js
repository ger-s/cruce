import dbConnect from "../../../../../utils/dbConnect";
import Sucursal from "../../../../../models/Sucursal";
import validateJWT from "../../../../../middleware/_middleware"
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const auth = await validateJWT(req)
        auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null
        const createSucursal = new Sucursal(req.body);
        await createSucursal.save();
        res.status(200).json({ success: true,successMessage:"sucursal creada", data: "" });
      } catch (error) {
        res.status(400).json({ success:false, successMessage:error });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
