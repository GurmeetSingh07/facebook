var nodemailer = require('nodemailer');





module.exports=(globalstorage)=>{

  let email=Object.keys(globalstorage)[0]
  let otp=globalstorage[email]
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
    to: `${email}`,
    subject: `Forget Password`,
    text: `Your OTP code is ${otp} `
  }
  
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

