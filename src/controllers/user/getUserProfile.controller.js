const User = require("../../models/user.model");

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

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong!!!");
  }
};
module.exports = getUserProfile;
