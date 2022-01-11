const mongoose = require("../Database/conn");
const collection = require("../models/schema");

class userController {
  signUp = async (req, res) => {
    try {
      const {firstName, lastName, emailId, passWord, reEnterpassWord, Hint } =req.body;

        console.log(req.body)
     
      if (!firstName||!lastName||!emailId||!passWord||!reEnterpassWord||!Hint)
  
     {
       
        return res.status(206).json({ message: "please fill the field", success: false });
      }

      if(passWord!=reEnterpassWord)
      {
          return res.status(400).json({ message: "please enter the same passWord", success: false})
      }

      const userexits = await collection.findOne({ emailId: emailId });
      if (userexits) {
        return res .status(400).json({ message: "User Allready Exist", success: false });     
      }
      
      
      
      else {
        const adding = new collection({ firstName, lastName,  emailId, passWord, reEnterpassWord, Hint,
         
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

  login = async (req, res) => {

    try {
        const {emailId, passWord } = req.body; 
       
        console.log(req.body);
        if(!emailId || !passWord)
        {
           return res.status(206).json({"message":"Please fill the Field","success":false})
        }
        const user = await collection.findOne({emailId })
        if (!user) return res.status(404).json({ "message": "not found","success":false });

        if (user.passWord != passWord) {
            return res.json({ "message": "Invalid passWord" })
        }

        else {
            const token = tokenGenerator(user)

            return res.json({ "message": " User Welcome", token })

        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ "message": "server error","success":false })
    }


  };

}

module.exports = new userController();
