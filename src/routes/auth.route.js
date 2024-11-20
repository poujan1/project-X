const express = require("express");
const router = express.Router();
const {
  signupController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");

const signupRoute = router.post("/signup", signupController);
const loginRoute = router.post("/login", loginController);
const logoutRoute = router.post("/logout", logoutController);

module.exports = { signupRoute, loginRoute, logoutRoute };
