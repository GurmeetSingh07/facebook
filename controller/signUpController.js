const mongoose = require("../Database/conn");
const collection = require("../models/schema");
const tokenGenerator = require("../middleware/genjwt");
const { storage } = require("debug/src/browser");
const mailservice = require('../helper/mailservice')

// 
module.exports = localdata = {}




class userController {
  signUp = async (req, res) => {
    try {
      const { firstName, lastName, emailId, password, reEnterPassword, Hint } = req.body;

      console.log(req.body)

      if (!firstName || !lastName || !emailId || !password || !reEnterPassword || !Hint) {
        return res.status(206).json({ message: "please fill the field", "success": false });
      }

      if (password != reEnterPassword) {
        return res.status(400).json({ message: "please enter the same  password", "success": false })
      }

      const userexits = await collection.findOne({ emailId: emailId });
      if (userexits) {
        return res.status(400).json({ message: "User Allready Exist", "success": false });
      }

      else {
        const adding = new collection({ firstName, lastName, emailId, password, reEnterPassword, Hint });
        const result = await adding.save();
        return res.status(200).json({ message: "user successfully register", "success": true, result });
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
        res.json({ "message": "false" })
      }
      else {

        let stroage = {}

        stroage[emailId] = Math.floor(Math.random() * 99999);
        localdata[emailId] = stroage[emailId]
        console.log(localdata)

        mailservice(localdata)


        return res.json({ "message": "true" });
      }
    }
    catch (err) {
      console.log(err)
      res.json({ "message": err.message })
    }
  }

 reset=(req,res)=>
 {
let  email=Object.keys(localdata)[0]
  let   otp=localdata[email]
   console.log( email)
   console.log( otp)
   if(req.emailId || req.otp)
   {

   }
   


   return res.json({ "message": "true" });
 }


}

module.exports = new userController();
