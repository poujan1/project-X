const getSuggestedProfile = async (req, res) => {
  try {
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
    console.log(user);

    const filteredUsers = user.filter((user) => {
      return user != user.userFollowedByme.following.includes(user._id);
    });
    // console.log(user);
    res.send(filteredUsers);
  } catch (e) {
    res.status(400).send(`No suggested users ${e.message}`);
  }
};
module.exports = getSuggestedProfile;
