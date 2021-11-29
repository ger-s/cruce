import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";
import { jwtPass } from "../../../../secret.json";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
         
        const newUser = new User(req.body);

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, jwtPass, {
          expiresIn: 86400, //24h
        });

        res.status(200).json({ success: true, data: token });
      } catch (error) {
        res.status(400).json({ success: console.log(error)});
      }

      break;
  }
};
