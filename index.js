const express = require("express");
const { connectDb } = require("./src/config/mongoDb");
const authRouter = require("./src/routes/auth.route");
const cookieParser = require("cookie-parser");
const userRouter = require("./src/routes/auth.user.js");

const dotenv = require("dotenv").config();

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);

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
