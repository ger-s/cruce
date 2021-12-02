import dbConnect from "../../../../../utils/dbConnect";
import User from "../../../../../models/User";
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
        const createOperator = new User(req.body);
        await createOperator.save();
        res
          .status(200)
          .json({ success: true, successMessage: "operador creado", data: "" });
      } catch (error) {
        res.status(400).json({ success: false, successMessage: error });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
