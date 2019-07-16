const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
      type: Array,
      required: true,
      trim: true
  }
});

module.exports = mongoose.model("Tool", ToolSchema);
