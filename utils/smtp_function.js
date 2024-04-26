const nodemailer = require('nodemailer');

async function sendEmail(userEmail,messsage){
  const transporter =  nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.AUTH_EMAIL,
      pass:process.env.AUTH_PASSWORD,
    }
  });

  const mailOptions = {
    from : process.env.AUTH_EMAIL,
    to:userEmail,
    subject:"Foodly Verfication Code",
    html: `<h1>Fooldy Email Verfication </h1>
           <p>Your Verfication code is :</p>
           <h2 style="color: blue;">${messsage}</h2>
           <p>Plesae enter this code on the verification page to complete your regisration process</p>
           <p>If you did not request this, please ignore this email,</p>`
  };

  try{
    await transporter.sendMail(mailOptions);
    console.log("Verfication email sent"); 
  }catch(error){
    console.log("Email sending failed with an error: ",error);
  }
}

module.exports = sendEmail;