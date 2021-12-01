import nodemailer from "nodemailer"

const  sendEmail=async (newUser,subject,text)=>    {

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "cruce.ecommers@gmail.com",
      pass: "gcbgikgyjrxqcric",
    },
  });


  var mailOptions = {
    from: "CRUCE",
    to: newUser.email,
    subject: subject,
    text: text,
  };




  const envio = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).jsonp(req.body);
    }
  })    }

  export default sendEmail