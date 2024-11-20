const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateTokenAndSendCookie = require("../utils/generateJwtToken");
const signupController = async (req, res) => {
  try {
    const { username, password, email, fullName } = req.body;
    if (!(username && password && email && fullName)) {
      return res.send("username passowrd email and fullname are requried");
    }
    const encodedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      username: username,
      password: encodedPassword,
      email: email,
      fullName: fullName,
    });
    console.log(user);

    if (user) {
      generateTokenAndSendCookie(user._id, res);
      await user.save();
      res.status(201).json({
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
        bio: user.bio,
        link: user.link,
      });
    } else {
      return res.status(400).send("something went wrong");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const loginController = (req, res) => {
  res.send("this is login controller");
};
const logoutController = (req, res) => {
  res.send("this is logout controller");
};
module.exports = { signupController, loginController, logoutController };
