const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    maxlength: 20,
  },
  content: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Thread", ThreadSchema);