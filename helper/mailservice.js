const res = require('express/lib/response');
var nodemailer = require('nodemailer');





module.exports= async (globalstorage,emailId)=>{
  try{
  
  let otp=globalstorage["otp"];
  console.log(emailId)
  //  console.log(otp)

  
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dummyt902@gmail.com',
      pass: '@12346788@'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  mailOptions = {
    from: `dummyt902@gmail.com`,
    to: `${emailId}`,
    subject: `Forget Password`,
    text: `Your OTP code is ${otp} `
  }
  
  
  const sendEmail = await transporter.sendMail(mailOptions)
}
  catch(e){
    console.log(e)
    throw e;
  }
}

