const express = require("express");
const { connectDb } = require("./src/config/mongoDb");
const authrouter = require("./src/routes/auth.route");
const cookieParser = require("cookie-parser");
const userAuth = require("./src/routes/auth.user.js");

const dotenv = require("dotenv").config();

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));

server.use("/api/auth", authrouter);
server.use("/api/user", userAuth);

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
