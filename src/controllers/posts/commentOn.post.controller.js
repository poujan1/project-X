const Post = require("../../models/post.model");

const commentsOnPostController = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const postId = req.params.id;

    if (!text) {
      return res.status(404).send("Write something to comment");
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).send("Not allowed to comment ");
    }
    const comment = {
      user: userId,
      text: text,
    };
    post.comments.push(comment);
    await post.save();
    return res.status(201).send("comment success");
  } catch (error) {
    return res.status(500).send(`internal server error ${error}`);
  }
};

module.exports = commentsOnPostController;
