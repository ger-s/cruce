import dbConnect from "../../../../utils/dbConnect";
import Sucursal from "../../../../models/Sucursal";
import validateJWT from "../../../../middleware/_middleware";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const auth = await validateJWT(req);

        if (auth.status === 401) {
          return res.status(401).json({ success: false, successMessage: auth.token })
        }
        if (auth.token?.role.length < 2) {
          return res.status(401).json({ success: false, message: "Problema en el usuario " })
        }
        const sucursales = await Sucursal.find({});
        res
          .status(200)
          .json({
            success: true,
            successMessage: "Sucursales encontradas",
            data: sucursales,
            role: auth.token?.role
          });
      } catch (error) {
        res.status(400).json({body: { success: false, successMessage: error }});
      }
      break;

    default:
      res.status(400).json({body: { success: false }});
      break;
  }
};
