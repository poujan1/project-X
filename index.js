const express = require("express");
const { connectDb } = require("./src/config/mongoDb");
const {
  signupRoute,
  loginRoute,
  logoutRoute,
} = require("./src/routes/auth.route");
const dotenv = require("dotenv").config();

const server = express();
server.use(express.json());

server
  .use("/api/auth", signupRoute)
  .use("/api/auth", loginRoute)
  .use("/api/auth", logoutRoute);

connectDb()
  .then(() => {
    const PORT = process.env.PORT;
    server.listen(PORT || 5000, () => {
      console.log(`Server is listening at port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
