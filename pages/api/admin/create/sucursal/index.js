import dbConnect from "../../../../../utils/dbConnect";
import Sucursal from "../../../../../models/Sucursal";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const createSucursal = new Sucursal(req.body);
        await createSucursal.save();
        res.status(200).json({ success: true, data: "Sucursal success" });
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }
  }
};
