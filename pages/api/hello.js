// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { jwtPass } = require('../../secret.json')
const jwt = require('jsonwebtoken')
const validateJWT = require ('../../middleware/_middleware')

const handler = async (req, res) => {
  try {
    const auth = await validateJWT(req)
    auth.status === 401 ? res.status(401).json({status: auth.status, message: auth.statusText}) : null
    
    return res.status(200).json({ name: 'ger sanchez' })
  } catch (error) {
    console.log(error)
  }
}
 export default handler