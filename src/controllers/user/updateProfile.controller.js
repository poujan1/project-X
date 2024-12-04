const User = require("../../models/user.model");
// const bcrypt = require("bcrypt");

// const updateProfile = async (req, res) => {
//   const { fullName, username, currentPassword, newPassword, email, bio, link } =
//     req.body;
//   let { profileImg, coverImg } = req.body;
//   const userId = req.user;
//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "something went wrong" });
//     }
//     if (
//       (!currentPassword && newPassword) ||
//       (!newPassword && currentPassword)
//     ) {
//       res
//         .status(400)
//         .json({ message: "please provide current and new password" });
//     }
//     if (currentPassword && newPassword) {
//       const passwordRegex =
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

//       if (newPassword.test(passwordRegex)) {
//         const isPasswordCorrect = bcrypt.compare(
//           currentPassword,
//           user.password,
//         );
//         if (!isPasswordCorrect) {
//           return res.status(400).send("current password is not valid ");
//         }
//       } else {
//         return res.json({ Error: "password must contains ..." });
//       }
//     }
//   } catch (error) {
//     return res.status(400).json({
//       message: `Something went wrong ${error.message}`,
//     });
//   }
// };

const updateProfile = async (req, res) => {
  const userId = req.user;
  console.log(userId);

  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }
    const fieldsToUpdate = ["fullName", "username", "bio", "link"];
    let isUpdated = false;
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        currentUser[field] = req.body[field];
        isUpdated = true;
      }
    });
    if (!isUpdated) {
      return res.status(200).json({
        message: "Nothing is updated",
      });
    }

    await currentUser.save();
    return res.status(201).json({
      message: "user updated successfully",
      user: currentUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Something went wrong ${error.message}`,
    });
  }
};
module.exports = updateProfile;
