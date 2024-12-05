const User = require("../../models/user.model");
const cloudinary = require("cloudinary").v2;
const updateProfile = async (req, res) => {
  const userId = req.user;
  let { fullName, username, bio, link, profileImg, coverImg } = req.body;

  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const uploadImage = async (image, folder) => {
      if (image) {
        const result = await cloudinary.uploader.upload(image, { folder });
        return result.secure_url;
      }
      return null;
    };
    const [uploadProfileImage, uploadCoverImage] = await Promise.all([
      uploadImage(profileImg, "profile_images"),
      uploadImage(coverImg, "cover_images"),
    ]);

    const updates = {
      fullName,
      username,
      bio,
      link,
      profileImg: uploadProfileImage || currentUser.profileImg,
      coverImg: uploadCoverImage || currentUser.coverImg,
    };
    Object.keys(updates).forEach((keys) => {
      if (updates[keys] !== undefined) {
        currentUser[keys] = updates[keys];
      }
    });

    await currentUser.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: currentUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error.message}`,
    });
  }
};

module.exports = updateProfile;
