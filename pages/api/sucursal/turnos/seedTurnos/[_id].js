import dbConnect from "../../../../../utils/dbConnect";
import Sucursal from "../../../../../models/Sucursal";
import Turno from "../../../../../models/Turno";
import validateJWT from "../../../../../middleware/_middleware";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
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
          const sucursal = await Sucursal.findOne({ _id: `${req.query._id}` });

          console.log(req.body.horaTurno[0], req.body.horaTurno[1], req.body.horaTurno[2])

          const turno = await new Turno({
            turnosRestantes: req.body.turnosRestantes,
            horaTurno: new Date(2021, 11, req.body.horaTurno[0], req.body.horaTurno[1], req.body.horaTurno[2]),
            sucursal: {
            name: sucursal.name,
            phone: sucursal.phone,
            address: sucursal.address
          } });
          await turno.save()
  
          res.status(200).json({ success: true, data: [turno, sucursal] });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
  
      default:
        res.status(400).json({ success: false });
        break;
    }
};
