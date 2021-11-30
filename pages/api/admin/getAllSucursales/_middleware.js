const jwt = require("jsonwebtoken");
const {jwtPass}=require("../../../../secret.json")


const validateJWT = (req, res, next) => {
  console.log(req,"REQQ",res,"RESS")
  const [type, reqToken] = (req.get.headers("Authorization") || "").split(" ");

  if (!reqToken) {
    return res.status(401).json({ msg: "No se pudo obtener token" });
  }

  jwt.verify(reqToken, jwtPass, (err, payload) => {
    if (err) return res.status(401).json({ msg: "El token no es valido" });
    req.payload = payload;
    next();
  });
};

export default validateJWT