const express = require("express");

const getUserProfile = require("../controllers/user/getUserProfile.controller");
const getSuggestedProfile = require("../controllers/user/getsuggestedprofile.controller");
const followOrUnfollow = require("../controllers/user/followunfollow.controller");
const updateProfile = require("../controllers/user/updateProfile.controller");

const isLoggedIn = require("../middlewares/is_logged_in_user");

const router = express.Router();
router.get("/profile/:username", isLoggedIn, getUserProfile),
  router.get("/suggested", isLoggedIn, getSuggestedProfile),
  router.post("/follow/:id", isLoggedIn, followOrUnfollow),
  router.post("/updateProfile", isLoggedIn, updateProfile);

module.exports = router;
