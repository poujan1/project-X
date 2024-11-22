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
const loginController = async (req, res) => {
  try {
    const { username, password } = req?.body;
    if (!username && !password) {
      return res.status(400).send("requried fields");
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).send("user not found!! sign Up");
    }
    const verifyPassword = await bcrypt.compare(password, user?.password || "");

    if (!verifyPassword) {
      return res.status(400).send("Incorrect password");
    }
    const cookie = await generateTokenAndSendCookie(user._id, res);
  } catch (error) {
    return res.status(400).send("Error");
  }

  res.send("logged in success");
};
const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send("logout succes");
  } catch (error) {
    res.send(error.message);
  }
};

const getLoggedInUser = (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    // res.send(User.findOne(user._id));
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  signupController,
  loginController,
  logoutController,
  getLoggedInUser,
};
