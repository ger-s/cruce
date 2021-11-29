const jwt = require("jsonwebtoken");
const jwtPass = require("../secret.json");

const generateJWT = (payload) => {
  return jwt.sign(payload, "SECRET", { expiresIn: 86400 });
};

module.exports = generateJWT;



   
