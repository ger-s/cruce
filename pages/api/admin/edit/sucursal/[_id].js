import dbConnect from "../../../../../utils/dbConnect";
import Sucursal from "../../../../../models/Sucursal";
import validateJWT from "../../../../../middleware/_middleware";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
       /*  const auth = await validateJWT(req);
        auth.status === 401
          ? res
              .status(401)
              .json({ status: auth.status, message: auth.statusText })
          : null;
        auth.token.role !== "admin"
          ? res.status(401).json({ status: false, message: "NO SOS ADMIN " })
          : null; */
          
        const sucursalModified = await Sucursal.findOneAndUpdate(
          { _id: `${req.query._id}` },
          req.body
        );
        return res.status(201).json({
          success: true,
          successMessage: "Sucursal modificada satisfactoriamente",
          data: "",
        });
      } catch (error) {
        res.status(400).json({ success: false, successMessage: error });
      }
      break;
      case "POST":
      try {

        const addOperator = await Sucursal.updateOne(
          { _id: `${req.query._id}` },
          {
            $push: {
              operators: {
                name: req.body.name,
                lastName: req.body.lastName,
                dni:req.body.dni,
                email: req.body.email
                
              },
            },
          }
        )
        return res.status(201).json({
          success: true,
          successMessage: "Operario asignado.",
          data: addOperator,
        });

      } catch(error) {
        res.status(400).json({ success: false, successMessage: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
