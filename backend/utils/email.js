const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',

    host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  }, 
  });



  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.to,
    subject: data.subject,
    html: data.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };