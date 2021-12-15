const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_PASS, { expiresIn: 86400 });
};

module.exports = generateJWT;



   
