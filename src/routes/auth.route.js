const express = require("express");
const router = express.Router();
const { signupcontroller } = require("../controllers/auth.controller");

const signuproute = router.get("/signup", signupcontroller);

module.exports = { signuproute };
