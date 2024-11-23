const User = require("../models/user.model");

const getUserProfile = async (req, res) => {
  try {
    // const { userid } = req.user;
    console.log(req.user);

    // if (!userid) {
    //   return res.send("Error something went wrong");
    // }
    // const user = await User.find({ _id: userid }).select("-password");

    // if (!user) {
    //   return res.send("user profile is not avaiable");
    // }
    // console.log(user);
    res.send("user");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const followOrUnfollow = (req, res) => {};
const updateProfile = (req, res) => {};
const getSuggestedProfile = (req, res) => {};

module.exports = {
  getUserProfile,
  getSuggestedProfile,
  followOrUnfollow,
  updateProfile,
};
