const jwt = require("jsonwebtoken");



const validateJWT = (req, res, next) => {
  const [type, reqToken] = (req.get("Authorization") || "").split(" ");

  if (!reqToken) {
    return res.status(401).json({ msg: "No se pudo obtener token" });
  }

  jwt.verify(reqToken, "SECRET", (err, payload) => {
    if (err) return res.status(401).json({ msg: "El token no es valido" });
    req.payload = payload;
    next();
  });
};

module.exports = validateJWT;