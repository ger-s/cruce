const jwt = require("jsonwebtoken");
const { jwtPass } = require('../secret.json')


const validateJWT = async (req, res, role) => {
  try {
    const reqToken = await req.headers.authorization.split(" ")[1];
    let type;
    if (!reqToken) {
      return new Response("Auth required", {
        status: 401,
        headers: {
          "WW-Authenticate": "Basic realm='Secure Area'"
        }
      })
    }
    jwt.verify(reqToken, jwtPass, (err, payload) => {
      if (err) return new Response("Auth required", {
        status: 401,
        headers: {
          "WW-Authenticate": "Basic realm='Secure Area'"
        }
      })
      type = payload;
      console.log("TYPEEE",type.role)
    });


    if (!type) {
      return new Response("Auth required", {
        status: 401,
        headers: {
          "WW-Authenticate": "Basic realm='Secure Area'"
        }
      })
    }
    
    return {status: true, token: type}
      
  } catch (err) {
    return new Response("Auth required", {
      status: 401,
      headers: {
        "WW-Authenticate": "Basic realm='Secure Area'"
      }
    })
  }
}


export default validateJWT