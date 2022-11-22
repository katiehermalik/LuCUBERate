const mongoose = require("mongoose");
require("mongoose-type-url");

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
      type: String,
    },
    link_alias_1: {
      type: String,
    },
    link_2: {
      type: String,
    },
    link_alias_2: {
      type: String,
    },
    link_3: {
      type: String,
    },
    link_alias_3: {
      type: String,
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
