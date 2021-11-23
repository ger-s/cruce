const mongoose = require('mongoose')
const { dbUrl } = require('../../secret.json')

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose