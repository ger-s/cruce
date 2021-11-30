import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import { jwtPass } from "../../../../secret.json";
import generateJWT from "../../../../utils/generateJWT"

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const userFound = await User.findOne({ email: req.body.email });
        if (!userFound)
          return res
            .status(400)
            .json({ success: false, data: "User not found" });


        const comparePassword = await User.comparePassword(
          req.body.password,
          userFound.password
        );

        if (!comparePassword)
          return res
            .status(400)
            .json({
              success: false,
              data: "Contraseña incorrecta",
              token: "",
            });
            // verificar si es un isAdmin  o isOperator  //
        const token = generateJWT({ id: userFound._id })

        res.status(200).json({ success: true, token:token });
      } catch (error) {
        res.status(400).json({ success: false});

    }
      break;
  }
};

