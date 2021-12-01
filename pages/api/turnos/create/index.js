import dbConnect from "../../../../utils/dbConnect";
import Turno from "../../../../models/Turno";


dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const createTurno = new Turno(req.body);
        await createTurno.save();
        res.status(200).json({success: true, data: "turno success"});
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
