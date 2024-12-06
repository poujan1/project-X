const User = require("../../models/user.model.js");
const bcrypt = require("bcrypt");
const generateTokenAndSendCookie = require("../../utils/generateJwtToken.js");

const loginController = async (req, res) => {
  try {
    const { username, password } = req?.body;
    if (!username && !password) {
      return res
        .status(400)
        .json({ message: "please provide username and password" });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).send("Not created account yet!! sign Up");
    }
    const verifyPassword = await bcrypt.compare(password, user?.password || "");

    if (!verifyPassword) {
      return res.status(400).send("Invalid credentials");
    }
    const cookie = await generateTokenAndSendCookie(user._id, res);
  } catch (error) {
    return res.status(400).send(`Something went wrong : ${error.message}`);
  }

  res.send("Logged in successfully");
};

module.exports = loginController;
