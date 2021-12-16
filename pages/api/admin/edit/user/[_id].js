import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";
import validateJWT from "../../../../../middleware/_middleware";
import Sucursal from "../../../../../models/Sucursal";


// esta ruta sirve siendo admin poder cambiar el role de user a operador

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
        const userModified = await User.updateOne(
          { _id: `${req.query._id}` },
          {role: req.body.role}
          );
        
        if (req.body._id) {
          const sucursal = await Sucursal.updateOne(
            { _id: `${req.body._id}` },
            {
              $pull: {
                operators: {
                  dni: req.body.dni
                }
              }
            }
          )
        }
          res
          .status(201)
          .json({
            success: true,
            successMessage: "Usuario modificado satisfactoriamente.",
            data: "",
          });
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, successMessage: error });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
