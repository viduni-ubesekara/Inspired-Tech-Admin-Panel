const Question = require("../models/Question");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "inspiretech26@gmail.com",
    pass: "nymx ghht szou fdxo", // Use the app password generated in the previous step
  },
});

// Handle question submission
exports.submitQuestion = async (req, res) => {
  try {
    const { firstName, lastName, email, question } = req.body;

    // Create a new question object
    const newQuestion = new Question({
      firstName,
      lastName,
      email,
      question,
    });

    // Save the question to the database
    await newQuestion.save();

    // Sending email
    const mailOptions = {
      from: "inspiretech26@gmail.com", // Your email address
      to: "inspiretech26@gmail.com",
      replyTo: req.body.email, // User's email address
      subject: "Question Successfully Submitted",
      text: req.body.question,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Question submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
