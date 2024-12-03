const jwt = require("jsonwebtoken");

const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send("Logged out successfully");
  } catch (error) {
    return res.status(400).send(`Something went wrong : ${error.message}`);
  }
};
module.exports = logoutController;
