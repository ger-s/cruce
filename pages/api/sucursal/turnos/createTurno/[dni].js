import Turno from "../../../../../models/Turno";
import User from "../../../../../models/User";
import dbConnect from "../../../../../utils/dbConnect";
import sendEmail from "../../../../../utils/sendEmail";
import validateJWT from "../../../../../middleware/_middleware";
import Sucursal from "../../../../../models/Sucursal";

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
 */
        const user = await User.findOne({ dni: `${req.query.dni}` });

        !user ? res.status(400).json({ success: false, successMessage: "hubo un problema con el usuario." }) : null;

        const createTurno = await Sucursal.updateOne(
          { _id: req.body.sucursal._id },
          {
            $push: {
              history: {
                client: {
                  name: `${user.name} ${user.lastName}`,
                  dni: user.dni,
                  email: user.email,
                },
                date: new Date(req.body.horaTurno),
                sucursal: req.body.sucursal.name,
              },
            },
          }
        );        
        /* sendEmail(
          user.email,
          "registro de turno",
          `Hola ${user.name}! \nTe enviamos la confirmación del turno. \nSucursal: ${req.body.sucursal.name}, \nDirección: ${createTurno.sucursal.address},\nHorario: ${createTurno.horaTurno}  \nContacto: ${createTurno.sucursal.phone}`
        ); */

        res.status(200).json({ success: true, successMessage: "Turno creado con éxito", data: createTurno });
      } catch (error) {
        res.status(400).json({ success: console.log(error) });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
