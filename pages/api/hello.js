// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { jwtPass } = require('../../secret.json')
const jwt = require('jsonwebtoken')
const validateJWT = require ('../../middleware/validateJwt/_middleware')

const handler = async (req, res) => {
  try {
    const auth = await validateJWT(req)
    console.log(auth.status)
    auth.status !== 401 ? res.status(200).json({ name: 'ger sanchez' }) : res.status(401).json({
      status: auth.status,
      message: auth.statusText
    })
  } catch (error) {
    console.log(error)
  }
}
 export default handler