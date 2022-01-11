const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/facebook")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => {
    console.log("database connection error");
  });

module.exports = mongoose;
