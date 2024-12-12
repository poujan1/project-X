const express = require("express");
const isLoggedIn = require("../middlewares/is_logged_in_user");
const createPostController = require("../controllers/posts/create.post.controller");
const deletePostController = require("../controllers/posts/delete.post.controller");
const likeUnlikePostController = require("../controllers/posts/likeUnlike.post.controller");
const commentsOnPostController = require("../controllers/posts/commentOn.post.controller");
const router = express.Router();

router.post("/create", isLoggedIn, createPostController);
router.delete("/delete/:id", isLoggedIn, deletePostController);
router.post("/likes/:id", isLoggedIn, likeUnlikePostController);
router.post("/comment/:id", isLoggedIn, commentsOnPostController);
module.exports = router;
