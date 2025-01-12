const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: String,
    phone: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
