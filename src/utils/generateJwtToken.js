const jwt = require("jsonwebtoken");

const generateTokenAndSendCookie = async (userId, res) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15d",
    });
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // in milli seconds
      httpOnly: true, // prevents xss attack
    });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};
module.exports = generateTokenAndSendCookie;
