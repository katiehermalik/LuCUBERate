const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String
    },
    theme: {
      type: String,
      default: "dark",
    },
    newUser: {
      type: Boolean,
      default: true,
    },
    showGuideModal: {
      type: Boolean,
      default: true,
    },
    cubes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cube",
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
