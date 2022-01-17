const mongoose = require("../Database/conn");
const collection = require("../models/schema");
const tokenGenerator = require("../middleware/genjwt");
const { storage } = require("debug/src/browser");
const mailservice = require('../helper/mailservice');

 
module.exports = localdata = {}




class userController {
  signUp = async (req, res) => {
    try {
      const { firstName, lastName, emailId, password,  Hint } = req.body;

      console.log(req.body)

      if (!firstName || !lastName || !emailId || !password  || !Hint) {
        return res.status(206).json({ message: "please fill the field", "success": false });
      }


      const userExist = await collection.findOne({ emailId: emailId });
      if (userExist) {
        return res.status(400).json({ message: "User Already Exist", "success": false });
      }

      else {
        const adding = new collection({ firstName, lastName, emailId, password,  Hint });
        const result = await adding.save();
        return res.status(200).json({ message: "user successfully register", success: true });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json(e, { message: "server error", "success": false });
    }
  };

  login = async (req, res) => {

    try {
      const { emailId, password } = req.body;

      console.log(req.body);
      if (!emailId || !password) {
        return res.status(206).json({ "message": "Please fill the Field", "success": false })
      }
      const user = await collection.findOne({ emailId: emailId })
      if (!user) return res.status(404).json({ "message": "not found", "success": false });
      if (user.password != password) {
        return res.status(400).json({ "message": "Invalid   password", "success": false })
      }

      else {
        const token = tokenGenerator(user)

        return res.status(200).json({ "message": " User Welcome", "success": true, token })

      }
    }
    catch (e) {
      console.log(e)
      return res.status(500).json({ "message": "server error", "success": false })
    }
  };


  forget = async (req, res) => {
    try {

      const { emailId } = req.body
      if (!emailId) {
        res.json({ "message": "invalid Email", success: false })
      }
      else {

        const emailExist = collection.findOne({email:emailId});
        if(!emailExist) return res.json({success: false, message:"emailId not registered"});

        let storage = {}

        storage[emailId] = Math.floor(Math.random() * 99999);
        localdata[emailId] = storage[emailId]
        console.log(localdata)

        await mailservice(localdata,emailId);


        return res.json({ "message": "email successfully sent",success:true });
      }
    }
    catch (err) {
      console.log(err)
      return res.status(500).json({ "message": err.message })
    }
  }

 reset=(req,res)=>
 {
   const {emailId,otp,newPassword} = req.body;

  let otp=localdata[emailId]
  console.log( emailId)
  console.log( otp)
    
   


   return res.json({ "message": "true" });
 }


}

module.exports = new userController();
