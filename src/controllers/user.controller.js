const User = require("../models/user.model");

const getUserProfile = async (req, res) => {
  try {
    const verifiedUser = req.user.username;
    if (!verifiedUser) {
      return res.status(400).send("Error in getting profile");
    }

    const params = req.params;
    const username = params.username.toLowerCase();

    if (!username) {
      return res.send("Error something went wrong");
    }
    if (username !== verifiedUser) {
      return res.status(400).send("Could not get profile info");
    }
    const user = await User.findOne({ username: username }).select("-password");

    if (!user) {
      return res.status(400).send("Something went wrong!!");
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong!!!");
  }
};
// const followOrUnfollow = (req, res) => {};
// const updateProfile = (req, res) => {};
// const getSuggestedProfile = (req, res) => {};

module.exports = {
  getUserProfile,
  // getSuggestedProfile,
  // followOrUnfollow,
  // updateProfile,
};
