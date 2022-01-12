const mongoose = require("../Database/conn");
const validator=require("validator")

const schema = mongoose.Schema({
  firstName: {
    type: "String",
    require: true,
    unique: true["user already exist"],
    minlength: 4,
  },
  lastName: {
    type: "String",
    require: true,
  },
  emailId: {
    type: "String",
    require: true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is Invalid")
      }
    }
  },
  password: {
    type: "String",
    require: true,
    minlength: 8,
  },
  reEnterPassword: {
    type: "String",
    require: true,
    minlength: 8,
  },
  Hint: {
    type: "String",
    require: true,
    minlength: 6,
  }
});
module.exports = new mongoose.model("collection", schema);
