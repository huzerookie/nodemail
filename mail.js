// Install the Nodemailer library using npm: npm install nodemailer

// Import the required modules
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using your Hostinger email credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTPHOST,
  port: process.env.SMTPPORT,
  secure: true, // Set to true if using SSL/TLS
  auth: {
    user: process.env.TO, // Your Hostinger email address
    pass: process.env.MAILPASSWORD, // Your Hostinger email password
  },
});

// Send the email
const executeMail = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully!");
    }
  });
  return;
};

module.exports = {
  executeMail,
};
