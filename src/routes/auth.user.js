const userContoller = require("../controllers/user.controller");
const express = require("express");
const {
  getUserProfile,
  getSuggestedProfile,
  followOrUnfollow,
  updateProfile,
} = require("../controllers/user.controller.js");
const isLoggedIn = require("../middlewares/is_logged_in_user");

const router = express.Router();
router.get("/profile/:username", isLoggedIn, getUserProfile),
  router.get("/suggested", isLoggedIn, getSuggestedProfile),
  router.post("/follow/:id", isLoggedIn, followOrUnfollow),
  // router.post("/updateProfile", isLoggedIn, updateProfile);

  (module.exports = router);
