import dbConnect from "../../../../../utils/dbConnect";
import Turno from "../../../../../models/Turno";
import Sucursal from "../../../../../models/Sucursal";
import validateJWT from "../../../../../middleware/_middleware";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        /*   const auth = await validateJWT(req)
        auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null
 */
        // trae todos los turnos (deberia filtrar por sucursal)

        const sucursal = await Sucursal.findOne({ _id: `${req.query._id}` });

        const turnos = await Turno.find({ "sucursal.name": sucursal.name });
        turnos
          ? res.status(200).json({ success: true, data: [turnos, sucursal] })
          : res.status(404).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false, successMessage: "holaaaaa" });
      }
      break;
    case "POST":
      try {
        const sucursal = await Sucursal.findOne({ _id: `${req.query._id}` });

        const turnos = await Turno.find({
          "sucursal.name": sucursal.name,
          horaTurno: {
            $gte: new Date(req.body.day),
            $lte: new Date(req.body.dayAfter),
          },
        });
        turnos
          ? res.status(200).json({ success: true, data: [turnos, sucursal] })
          : res.status(404).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false, successMessage: error });
      }
      break;
    default:
      res.status(400).json({ success: false, successMessage: "ey" });
      break;
  }
};
