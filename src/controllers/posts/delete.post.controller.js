const Post = require("../../models/post.model");
const cloudinary = require("cloudinary").v2;

const deletePostController = async (req, res) => {
  const postId = req.params.id;
  const currentUser = req.user._id;

  try {
    const post = await Post?.findById(postId);

    if (!post || post === null) {
      return res.status(400).send("Nothing to delete");
    }
    const user = post.user;

    if (user.toString() !== currentUser.toString()) {
      return res.status(400).send("unauthorized to delete post");
    }

    if (post.image) {
      const imgId = post.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(postId);
    return res.status(201).send("post deleted successfully");
  } catch (error) {
    return res.status(400).send(`something went wrong ${error.message}`);
  }
};

module.exports = deletePostController;
