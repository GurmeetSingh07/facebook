const mongoose = require("../Database/conn");
const collection = require("../models/schema");

class userController {
  signUp = async (req, res) => {
    try {
      const {firstName, lastName, emailId, passWord, reEnterPassword, Hint } =req.body;

        console.log(req.body)
     
      if (!firstName||!lastName||!emailId||!passWord||!reEnterPassword||!Hint)
  
     {
       
        return res.status(206).json({ message: "please fill the field", success: false });
      }

      if(passWord!=reEnterPassword)
      {
          return res.status(400).json({ message: "please enter the same password", success: false})
      }

      const userexits = await collection.findOne({ emailId: emailId });
      if (userexits) {
        return res .status(400).json({ message: "User Allready Exist", success: false });     
      }
      
      
      
      else {
        const adding = new collection({ firstName, lastName,  emailId, passWord, reEnterPassword, Hint,
         
        });
        
         
         
      
     
        const result = await adding.save();
        return res
          .status(200)
          .json({
            message: "user successfully register",
            success: true,
            result,
          });
      }
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json(e, { message: "server error", success: false });
    }
  };
}

module.exports = new userController();
