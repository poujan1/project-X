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

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Something went wrong!!!");
  }
};
const followOrUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Something went wrong in following the user");
    }

    const verifiedUser = req.user;
    if (!verifiedUser) {
      return res.status(400).send("something went wrong");
    }
    const verifiedUserId = verifiedUser._id;
    if (id == verifiedUserId) {
      return res.status(400).send("cant follow unfollow self");
    }
    const requestedUser = await User.findById(id);

    const currentUser = await User.findById(verifiedUserId);

    const isFollowing = currentUser.following.includes(requestedUser._id);

    if (isFollowing) {
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { following: requestedUser._id },
      });
      await User.findByIdAndUpdate(requestedUser._id, {
        $pull: { followers: currentUser._id },
      });
    } else {
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { following: requestedUser._id },
      });
      await User.findByIdAndUpdate(requestedUser._id, {
        $push: { followers: currentUser._id },
      });
    }

    return res.status(201).send("following unfollowing successful");
  } catch (error) {
    return res.status(400).send(`Error encountered :${error.message}`);
  }
};

// const updateProfile = (req, res) => {};
// const getSuggestedProfile = (req, res) => {};

module.exports = {
  getUserProfile,
  // getSuggestedProfile,
  followOrUnfollow,
  // updateProfile,
};
