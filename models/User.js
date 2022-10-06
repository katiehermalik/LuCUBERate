const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    // type: mongoose.SchemaTypes.Email,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cubes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cube'
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;

// categories: [{
//   id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Category',
//     required: true,
//     },
//   title: {
//       type: String,
//       required: true,
//     }
// }]

// categories: [{
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Category'
// }]