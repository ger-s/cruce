import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";
import validateJWT from "../../../../../middleware/_middleware";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "DELETE":
      // si es admin no puede autoeliminarse //
      try {
        // const auth = await validateJWT(req);
        // auth.status === 401
        //   ? res
        //       .status(401)
        //       .json({ status: auth.status, message: auth.statusText })
        //   : null;
        // auth.token.role !== "admin"
        //   ? res.status(401).json({ status: false, message: "NO SOS ADMIN " })
        //   : null;

        const userDeleted = await User.deleteOne({ _id: `${req.query._id}` });

        res
          .status(202)
          .json({
            success: true,
            successMessage: "usuario eliminado satisfactoriamente",
            data: "",
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
