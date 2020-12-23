const mongoose = require('mongoose');
require('mongoose-type-url');

const cubeSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
  },
  visual_aid: {
    type: String,
  },
  link: {
    type: String,
  },
  link_alias: {
    type: String,
  },
  notes: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {timestamps: true});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;

