const jwt = require("jsonwebtoken");
const { jwtPass } = require('../secret.json')


const validateJWT = async (req, res, role) => {
  try {
    const reqToken = await req.headers.authorization.split(" ")[1];
    let type;
    if (!reqToken) {
      return {status: 401, token: null}
    }
    jwt.verify(reqToken, jwtPass, (err, payload) => {
      if (err) return {status: 401, token: null}
      type = payload;
      //console.log("TYPEEE",type.role)
    });
    
    if (!type) {
      return {status: 401, token: null}
    }
    
    return {status: true, token: type}
      
  } catch (err) {
    return {status: 401, token: null}
  }
}


export default validateJWT