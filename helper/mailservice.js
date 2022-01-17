const res = require('express/lib/response');
var nodemailer = require('nodemailer');





module.exports= async (globalstorage,emailId)=>{
  try{
  
  let otp=globalstorage[emailId];
  // console.log(email)
  //  console.log(otp)

  
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arjunsingh4368.18@gmail.com',
      pass: 'A8146260465@1222223'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  mailOptions = {
    from: `arjunsingh4368.18@gmail.com`,
    to: `${emailId}`,
    subject: `Forget Password`,
    text: `Your OTP code is ${otp} `
  }
  
  
  const sendEmail = await transporter.sendMail(mailOptions)
      
  console.log('Email sent: ' + info.response);
  
  }
  catch(e){
    console.log(e)
    throw e;
  }
}

