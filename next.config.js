const { dbUrl } = require('./secret.json')

module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI: dbUrl
  }
}
