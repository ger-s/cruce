import dbConnect from "../../../../../../utils/dbConnect";
import Sucursal from "../../../../../../models/Sucursal";
import validateJWT from "../../../../../../middleware/_middleware";
const mongoose = require('mongoose')
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
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
        const sucursal = await Sucursal.findOne({
          _id: `${req.query._id}`,
        });
        
        const index = await sucursal.history.findIndex(turno => turno._id.toString() === req.body._id )
        
        console.log(index)
        
        await sucursal.history.splice(index, 1)
          
        const sucursalModified = await Sucursal.findOneAndUpdate(
          { _id: `${req.query._id}` },
          sucursal
        );
        return res.status(201).json({
          success: true,
          successMessage: "Turno borrado satisfactoriamente",
          data: sucursal,
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
