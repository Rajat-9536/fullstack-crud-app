const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, unique: true },
  age: { type: Number, required: true },
  interest: { type: [String], required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
