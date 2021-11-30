const jwt = require("jsonwebtoken");
const { jwtPass } = require("../secret.json");

const generateJWT = (payload) => {
  return jwt.sign(payload, jwtPass, { expiresIn: 86400 });
};

module.exports = generateJWT;



   
