const express = require("express");
const server = express();
const { signuproute } = require("./src/routes/auth.route");
const dotenv = require("dotenv").config();
const { connectDb } = require("./src/config/mongoDb");
const PORT = process.env.PORT;

server.use("/api/auth", signuproute);

connectDb()
  .then(() => {
    server.listen(PORT || 5000, () => {
      console.log(`Server is listening at port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
