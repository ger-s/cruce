import dbConnect from "../../../../utils/dbConnect";
import Sucursal from "../../../../models/Sucursal";
import validateJWT from "../../../../middleware/_middleware";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        /* const auth = await validateJWT(req);
        auth.status === 401
          ? res
              .status(401)
              .json({ status: auth.status, message: auth.statusText })
          : null;
        auth.token.role !== "admin"
          ? res.status(401).json({ status: false, message: "NO SOS ADMIN " })
          : null; */
        const sucursales = await Sucursal.find({});
        res
          .status(200)
          .json({
            success: true,
            successMessage: "Sucursales encontradas",
            data: sucursales,
          });
      } catch (error) {
        res.status(400).json({ success: false, successMessage: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
