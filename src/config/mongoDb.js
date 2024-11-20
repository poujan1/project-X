const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { connectDb };
