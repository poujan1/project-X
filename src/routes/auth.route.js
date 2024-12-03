const express = require("express");
const router = express.Router();

const signupController = require("../controllers/auth/signup.controller.js");

const loginController = require("../controllers/auth/login.controller.js");

const logoutController = require("../controllers/auth/logout.controller.js");

const getLoggedInUser = require("../controllers/auth/getLoggedInUser.controller.js");

const isLoggedIn = require("../middlewares/is_logged_in_user.js");

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/getuser", isLoggedIn, getLoggedInUser);
module.exports = router;
