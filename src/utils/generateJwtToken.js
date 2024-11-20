const jwt = require("jsonwebtoken");

const generateTokenAndSendCookie = async (userId, res) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
    res.cookie(token);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};
module.exports = generateTokenAndSendCookie;
