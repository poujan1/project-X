const bcrypt = require("bcrypt");
const User = require("../../models/user.model.js");

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
    return res.status(400).send(`something went wrong ${error.message}`);
  }
};
module.exports = signupController;
