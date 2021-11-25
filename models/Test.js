const mongoose = require('mongoose')

const TestSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'por favor, agregá un título.'],
    unique: true,
    trim: true,
    maxlength: [40, 'los títulos sólo pueden tener hasta 40 caracteres']
  },
  description: {
    type: String,
    required: [true, 'por favor, agregá una descripción.'],
    maxlength: [200, 'las descripciones sólo pueden tener hasta 200 caracteres']
  }
})

module.exports = mongoose.models.Test || mongoose.model('Test', TestSchema);