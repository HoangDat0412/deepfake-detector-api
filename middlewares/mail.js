"use strict";
const nodemailer = require("nodemailer");



const sendmail = async (to,subject,htmlContent)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure:false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "hoang2811dat@gmail.com",
          pass: "20112003htad2020",
        },
      });
    const info = await transporter.sendMail({
        from: 'hoang2811dat@gmail.com', // sender address
        to:to, // list of receivers
        subject: subject, // Subject line
        text: "Hello world?", // plain text body
        html: htmlContent, // html body
      });
    return info
}

module.exports = sendmail

