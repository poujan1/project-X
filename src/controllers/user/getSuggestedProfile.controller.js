const User = require("../../models/user.model");
const mongoose = require("mongoose");

const getSuggestedProfile = async (req, res) => {
  try {
    const currentUser = req.user._id;
    console.log(` current user is ${currentUser}`);

    const userFollowedByMe = await User.findById({ _id: currentUser }).select(
      "following",
    );

    const user = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: new mongoose.Types.ObjectId(currentUser),
            $nin: userFollowedByMe.following,
          },
        },
      },
      {
        $sample: {
          size: 10,
        },
      },
    ]);

    if (!user || user.length == 0) {
      return res.send("No users to suggest ");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(`No suggested users ${e.message}`);
  }
};
module.exports = getSuggestedProfile;
