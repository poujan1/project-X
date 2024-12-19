const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    profileImg: {
      type: String,
      default: "",
      lowercase: true,
    },
    coverImg: {
      type: String,
      default: "",
      lowercase: true,
    },
    bio: {
      type: String,
      default: "",
      lowercase: true,
    },
    link: {
      type: String,
      default: "",
      lowercase: true,
    },
    likedpost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "Post",
      },
    ],
  },

  { timestamps: true },
);
const User = mongoose.model("User", userSchema);

module.exports = User;
