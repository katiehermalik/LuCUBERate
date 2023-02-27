const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema(
  {
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
    link_1: {
      url: { type: String },
      alias: { type: String },
    },
    link_2: {
      url: { type: String },
      alias: { type: String },
    },
    link_3: {
      url: { type: String },
      alias: { type: String },
    },
    notes: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;
