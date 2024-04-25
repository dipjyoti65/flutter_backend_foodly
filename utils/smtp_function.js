const nodemailer = require('nodemailer');

async function sendEmail(userEmail,messsage){
  const transporter =  nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.AUTH_EMAIL,
      pass:process.env.AUTH_PASSWORD,
    }
  })
}