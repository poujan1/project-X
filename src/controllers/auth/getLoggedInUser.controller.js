const getLoggedInUser = (req, res) => {
  try {
    const user = req.user;
    console.log(user);

    res.send(user);
  } catch (error) {
    return res.status(400).send(`Something went wrong : ${error.message}`);
  }
};
module.exports = getLoggedInUser;
