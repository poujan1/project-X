const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

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
const getSuggestedProfile = async (req, res) => {
  const currentUser = req.user._id;
  // console.log(await User.findById(currentUser));
  const userFollowedByme = await User.find({ _id: currentUser }).select(
    "following",
  );
  console.log(userFollowedByme);
  const user = await User.aggregate([
    {
      $match: {
        _id: { $ne: currentUser },
      },
    },
    {
      $sample: {
        size: 10,
      },
    },
  ]);
  // console.log(user);
  res.send(user);
};

/// optimized code using references (chatGpt).....
// const followOrUnfollow = async (req, res) => {
//   const session = await mongoose.startSession(); // Start a session for transaction (optional)
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.status(400).send("Something went wrong in following the user");
//     }

//     const verifiedUser = req.user;
//     if (!verifiedUser) {
//       return res.status(400).send("Something went wrong");
//     }
//     const verifiedUserId = verifiedUser._id;
//     if (id == verifiedUserId) {
//       return res.status(400).send("Can't follow/unfollow self");
//     }

//     const requestedUser = await User.findById(id).session(session);
//     const currentUser = verifiedUser;

//     const isFollowing = currentUser.following.includes(requestedUser._id);

// Start transaction
//     session.startTransaction();

//     if (isFollowing) {
// Unfollow: remove user from both following and followers arrays
//       await User.updateOne(
//         { _id: currentUser._id },
//         { $pull: { following: requestedUser._id } },
//         { session },
//       );
//       await User.updateOne(
//         { _id: requestedUser._id },
//         { $pull: { followers: currentUser._id } },
//         { session },
//       );
//     } else {
// Follow: add user to both following and followers arrays
//       await User.updateOne(
//         { _id: currentUser._id },
//         { $addToSet: { following: requestedUser._id } },
//         { session },
//       );
//       await User.updateOne(
//         { _id: requestedUser._id },
//         { $addToSet: { followers: currentUser._id } },
//         { session },
//       );
//     }

// Commit the transaction
//     await session.commitTransaction();
//     session.endSession();

//     return res.status(201).send("Following/Unfollowing successful");
//   } catch (error) {
//     await session.abortTransaction(); // Abort if any error occurs
//     session.endSession();
//     return res.status(400).send(`Error encountered: ${error.message}`);
//   }
// };

// const updateProfile = (req, res) => {};
// const getSuggestedProfile = (req, res) => {};

module.exports = {
  getUserProfile,
  getSuggestedProfile,
  followOrUnfollow,
  // updateProfile,
};
