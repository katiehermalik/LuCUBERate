const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;