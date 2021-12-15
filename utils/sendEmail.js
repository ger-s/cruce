import { sendError } from "next/dist/server/api-utils";
import nodemailer from "nodemailer";

const sendEmail = async (user, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_GOOGLE,
        pass: process.env.PASS_GOOGLE,
      },
    });
  
    const mailOptions = {
      from: "CRUCE",
      to: user,
      subject: subject,
      text: text,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).jsonp(req.body);
      }
    });
  } catch (err) {
    console.log(err)
  }
};

export default sendEmail;
