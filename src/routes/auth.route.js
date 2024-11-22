const express = require("express");
const router = express.Router();

const {
  signupController,
  loginController,
  logoutController,
  getLoggedInUser,
} = require("../controllers/auth.controller");
const isLoggedIn = require("../middlewares/is_logged_in_user");

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/getuser", isLoggedIn, getLoggedInUser);
module.exports = router;
