const mongoose = require("mongoose");
const { Schema } = mongoose;

const PictureSchema = new Schema({
  id: { type: String },
  picture: { data: Buffer, contentType: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: [String], default: [] },
  like: { type: [String], default: [] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  comment: { type: [String], default: [] },
});
PictureSchema.index({ title: "text", description: "text", tag: "text" });

module.exports = mongoose.model("Picture", PictureSchema);
