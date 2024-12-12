const express = require("express");
const { connectDb } = require("./src/config/mongoDb");
const authRouter = require("./src/routes/auth.route");
const cookieParser = require("cookie-parser");
const userRouter = require("./src/routes/auth.user.js");
const cloudinary = require("cloudinary").v2;
const postRouter = require("./src/routes/post.route.js");

const dotenv = require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDIANARY_API_KEY,
  api_secret: process.env.CLOUDIANARY_API_SECRET,
});
const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.use("/api/posts", postRouter);

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
