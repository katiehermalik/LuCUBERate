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
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;