const mongoose = require("../Database/conn");

const schema = mongoose.Schema({
  firstName: {
    type: "String",
    require: true,
    unique: true["user already exist"],
    minlength: 8,
  },
  lastName: {
    type: "String",
    require: true,
    minlength: 8,
  },
  emailId: {
    type: "String",
    require: true,
    enum: ["user", "admin"],
  },
  passWord: {
    type: "String",
    require: true,
    minlength: 8,
  },
  reEnterPassworrd: {
    type: "String",
    require: true,
    minlength: 8,
  },
  Hint: {
    type: "String",
    require: true,
    minlength: 6,
  },
});
module.exports = new mongoose.model("collection", schema);
