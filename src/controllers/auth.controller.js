const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateTokenAndSendCookie = require("../utils/generateJwtToken");

const signupController = async (req, res) => {
  try {
    const { username, password, email, fullName } = req.body;

    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!username || !password || !email || !fullName) {
      return res.send("username,password ,email and fullname are required");
    }
    if (!emailRegx.test(email)) {
      return res.send("Please provide valid email address");
    }
    if (password?.toLowerCase().includes(username?.toLowerCase())) {
      return res.send("password should not contain username on it");
    }
    if (!passwordRegex.test(password)) {
      return res.send(
        "password should contain minimum 8 characters,uppercase ,lowecase number and special character",
      );
    }

    const encodedPassword = await bcrypt.hash(password, 10);

    const isUsernameOrEmailAlreadyExist = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isUsernameOrEmailAlreadyExist) {
      return res.status(400).send("Username or email is already exist");
    }

    const user = await new User({
      username: username,
      password: encodedPassword,
      email: email,
      fullName: fullName,
    });

    console.log(user);

    if (user) {
      // generateTokenAndSendCookie(user._id, res);
      await user.save();
      return res.status(201).json({
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
    return res.status(400).send(error.message);
  }
};
const loginController = async (req, res) => {
  try {
    const { username, password } = req?.body;
    if (!username && !password) {
      return res.status(400).send("please provide username and password");
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
const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send("Logged out successfully");
  } catch (error) {
    return res.status(400).send(`Something went wrong : ${error.message}`);
  }
};

const getLoggedInUser = (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    res.send(user);
  } catch (error) {
    return res.status(400).send(`Something went wrong : ${error.message}`);
  }
};
module.exports = {
  signupController,
  loginController,
  logoutController,
  getLoggedInUser,
};
