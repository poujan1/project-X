const User = require("../../models/user.model.js");
const bcrypt = require("bcrypt");
const changePassword = async (req, res) => {
  const currentUserId = req.user;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword && !newPassword) {
    return res
      .status(400)
      .send(
        "Current Password and New password both are required to change password",
      );
  }
  const passwordRegx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const testPasswordWithRegx = passwordRegx.test(newPassword);
  if (!testPasswordWithRegx) {
    return res.status(400).send("password shuould contain ...");
  }
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) {
    return res.status(400).send("User not found..");
  }
  const isPasswordCorrect = bcrypt.compare(
    currentPassword,
    currentUser.password,
  );
  if (!isPasswordCorrect) {
    return res.status(400).send("Try using valid old password");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(
    currentUserId,
    { $set: { password: hashedPassword } },
    { new: true },
    // Return the updated document
  );
  return res.status(201).json({
    message: `password changed successfully`,
  });
};
module.exports = changePassword;
