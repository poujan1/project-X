const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    followers: {
      type: String,
    },
    profileImg: {
      type: String,
    },
    coverImg: {
      type: String,
    },
    bio: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);

module.exports = User;
