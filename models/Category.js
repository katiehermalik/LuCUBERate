const mongoose = require('mongoose');
require('mongoose-type-url');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cubes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cube'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;