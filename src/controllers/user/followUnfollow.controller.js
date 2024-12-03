const notification = require("../../models/notification.model.js");
const User = require("../../models/user.model.js");
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
      const notification = await new Notification({
        from: requestedUser._id,
        to: currentUser._id,
        type: "follow",
      });
      console.log(notification);
      await notification.save();
    }
    return res.status(201).send("following unfollowing successful");
  } catch (error) {
    return res.status(400).send(`Error encountered :${error.message}`);
  }
};
module.exports = followOrUnfollow;
