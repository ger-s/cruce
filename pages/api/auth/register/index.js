import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import { jwtPass } from "../../../../secret.json";
import generateJWT from "../../../../utils/generateJWT";
import sendEmail from "../../../../utils/sendEmail";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const newUser = new User(req.body);

        await newUser.save();

        const token = generateJWT({ id: newUser._id });
        ///Sendmail el 2do parametro es el subject y el 3ero es el texto del email
        sendEmail(newUser.email, "Cuenta creada en Cruce", `Bienvenido a CRUCE ${newUser.name}! \n Te registraste correctamente!`);

        res.status(201).json({
          success: true,
          successMessage: "¡Registro existoso!",
          token: token,
          data: newUser,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          successMessage: "Registro fallido",
          data: error,
        });
      }

      break;
  }
};
