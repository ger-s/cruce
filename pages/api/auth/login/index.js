import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import { jwtPass } from "../../../../secret.json";
import generateJWT from "../../../../utils/generateJWT";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const userFound = await User.findOne({ email: req.body.email });
        if (!userFound)
          return res.status(400).json({
            headers: { Authorization: null },
            body: {
              success: false,
              data: "",
              successMessage: "Usuario no encontrado",
              token: ""
            }
          });

        const comparePassword = await User.comparePassword(
          req.body.password,
          userFound.password
        );

        if (!comparePassword)
          return res.status(400).json({
            headers: { Authorization: null },
            body: {
              success: false,
              successMessage: "Contraseña incorrecta",
              data: "",
              token: ""
            }
          });
        // verificar si es un isAdmin  o isOperator  //
        const token = generateJWT({
          id: userFound._id,
          name: userFound.name,
          lastName: userFound.lastName,
          role: userFound.role,
          dni: userFound.dni,
          email: userFound.email,
          phone:userFound.phone
        });

        res
          .status(200)
          .json({
            headers: { Authorization: `Bearer ${token} ` },
            body: {
              success: true,
              successMessage: "Usuario logueado",
              data: ""
            }
          });
      } catch (error) {
        res
          .status(400)
          .json({
            headers: { Authorization: null },
            body: { success: false, successMessage: error }
          });
      }
      break;
  }
};
