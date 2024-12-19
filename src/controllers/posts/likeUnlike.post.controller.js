const Notification = require("../../models/notification.model");
const Post = require("../../models/post.model");
const User = require("../../models/user.model");

const likeUnlikePostController = async (req, res) => {
  const postId = req.params.id;
  const currentUser = req.user._id;
  console.log(`current user `, currentUser);
  console.log(`post id `, postId);

  try {
    if (!postId) {
      return res.send(400).send("like/Unlike failed ");
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.send(400).send("something went wrong");
    }
    // unlike post
    if (post.likes.includes(currentUser)) {
      await Post.updateOne(
        { _id: postId },
        {
          $pull: {
            likes: currentUser,
          },
        },
      );
      await User.updateOne(
        { _id: currentUser },
        {
          $pull: {
            likedpost: postId,
          },
        },
      );

      return res.status(200).send("post unliked");
    } else {
      // liked post
      await Post.updateOne(
        {
          _id: postId,
        },
        {
          $push: {
            likes: currentUser,
          },
        },
      );
      await User.updateOne(
        { _id: currentUser },
        {
          $push: {
            likedpost: postId,
          },
        },
      );
      const notification = new Notification({
        from: currentUser,
        to: post.user,
        type: "like",
      });
      await notification.save();

      return res.status(200).send("post liked ");
    }
  } catch (error) {
    return res.status(400).send(`something went wrong ${error.message}`);
  }
};

module.exports = likeUnlikePostController;
