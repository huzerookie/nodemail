require("dotenv").config();
const express = require("express");
const executeMail = require("./mail").executeMail;
const bodyParser = require("body-parser");
const app = express();

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

app.post("/sendMail", (req, res) => {
  // Handle the POST request
  console.log(req.body); // Access the request body here
  try {
    const mailBody = `${req.body.message}\n\nFrom ${req.body.email}`;
    const mailOptions = {
      from: req.body.name,
      to: process.env.TO,
      subject: req.body.subject,
      text: mailBody,
    };
    executeMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (e) {
    res.status(500).send({ message: "Error sending mail", error: e });
  }
  // Send a response
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
