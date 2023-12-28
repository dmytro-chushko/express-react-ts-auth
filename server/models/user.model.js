const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, uniqe: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: String, default: true },
  activationLink: { type: String },
});

module.exports = model("User", UserSchema);
