const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new Error("Token is not provided ");
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      throw new Error("Token not matched");
    }

    const user = await User.findOne({ _id: decodedToken.userId }).select(
      "-password",
    );

    if (!user) {
      throw new Error(" user not found");
    }

    req.user = user;
  } catch (error) {
    return res.status(400).send(error.message);
  }

  next();
};
module.exports = isLoggedIn;
