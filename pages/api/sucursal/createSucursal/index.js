import Turno from "../../../../models/Turno";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";
import sendEmail from "../../../../utils/sendEmail";
import validateJWT from "../../../../middleware/_middleware";
import Sucursal from "../../../../models/Sucursal";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {

       /*  const auth = await validateJWT(req);
        auth.status === 401
          ? res
              .status(401)
              .json({ status: auth.status, message: auth.statusText })
          : null; */

        const sucursal = await new Sucursal(req.body);
        await sucursal.save();

        res.status(200).json({success: true, successMessage: "Sucursal creada" ,data: sucursal});
        
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
