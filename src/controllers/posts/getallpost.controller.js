const express = require("express");
const Post = require("../../models/post.model.js");

const getAllPostController = async (req, res) => {
  // if using populate select(-password ) doesnot work just like that

  const allPost = await Post.find()
    .populate({
      path: "user",
      select: "-password",
    })
    .populate({
      path: "comments.user",
      select: "-password",
    });
  console.log(allPost);
  res.send(allPost);
};
module.exports = getAllPostController;
