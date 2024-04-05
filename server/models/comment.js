const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, require: true },
  date: { type: Date, default: Date.now },
  post: { type: String },
});

module.exports = mongoose.model("comment", CommentSchema);
