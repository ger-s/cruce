import dbConnect from "../../../../../utils/dbConnect";
import Sucursal from "../../../../../models/Sucursal";
import validateJWT from "../../../../../middleware/_middleware";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
         const auth = await validateJWT(req);
        auth.status === 401
          ? res
              .status(401)
              .json({ status: auth.status, message: auth.statusText })
          : null;
        auth.token.role !== "admin"
          ? res.status(401).json({ status: false, message: "NO SOS ADMIN " })
          : null; 
        const createSucursal = new Sucursal(req.body);
        await createSucursal.save();
        res
          .status(201)
          .json({ success: true, successMessage: "¡Sucursal creada!", data: createSucursal });
      } catch (error) {
        res.status(400).json({ success: false, successMessage: error });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
