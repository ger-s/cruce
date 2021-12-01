import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":

    try {
      const user = await User.findOne({ _id: `${req.query._id}` });

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "cruce.ecommers@gmail.com",
          pass: "af2!sgBw4S",
        },
      });

      var mailOptions = {
        from: "Hello World",
        to: "gaston.castagneri@gmail.com",
        subject: "Recibo de tus cursos en Hello World",
        text: texto,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(200).jsonp(req.body);
        }
      });


    }catch(error)   {
     res.status(400).json(  {success:false  })


    } 

}
    
    
    }
