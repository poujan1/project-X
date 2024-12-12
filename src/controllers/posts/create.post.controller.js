const Post = require("../../models/post.model");
const User = require("../../models/user.model.js");
const cloudinary = require("cloudinary").v2;

const createPostController = async (req, res) => {
  const currentUser = req.user;

  const { text } = req.body;
  let { img } = req.body;

  try {
    if (!(text || img)) {
      return res
        .status(400)
        .send("posting content should have some text or image ");
    }
    const verifiedUser = await User.findById(currentUser._id);

    if (!verifiedUser) {
      return res.send(404).send("Something went wrong user not found");
    }
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    const newpost = new Post({
      user: verifiedUser,
      text: text,
      image: img,
    });
    await newpost.save();
    return res.status(201).send("new post uploaded");
  } catch (error) {
    return res.status(400).send(`something went wrong ${error.message}`);
  }
};

module.exports = createPostController;
