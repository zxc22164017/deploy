const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  profile: { data: Buffer, contentType: String },
  date: { type: Date, default: Date.now },
  subscriber: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  follower: { type: [String], default: [] },
  like: { type: [mongoose.Schema.Types.ObjectId], ref: "picture" },
});

UserSchema.methods.compare = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return cb(e, result);
  }
};

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    //this =>document in mongoDB
    let hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
