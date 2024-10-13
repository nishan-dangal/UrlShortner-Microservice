const mongoose = require('mongoose');

//define Url schema
const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true },
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
