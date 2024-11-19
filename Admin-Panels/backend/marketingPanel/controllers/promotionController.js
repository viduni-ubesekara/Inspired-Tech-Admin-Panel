const Promotion = require("../models/promotion");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "inspiretech26@gmail.com",
    pass: "nymx ghht szou fdxo", // Use the app password generated in the previous step
  },
});

const getImageContentType = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  if (extension === "jpg" || extension === "jpeg") {
    return "image/jpeg";
  } else if (extension === "png") {
    return "image/png";
  }
  return null;
};

exports.createPromotion = async (req, res) => {
  try {
    const {
      promotionName,
      promotionKey,
      startDate,
      endDate,
      userEmail,
      promotionType,
      number,
      description,
      imageName,
      imageBase64,
    } = req.body;

    // Create a new promotion
    const promotion = new Promotion({
      promotionName,
      promotionKey,
      startDate,
      endDate,
      userEmail,
      number,
      promotionType,
      description,
      imageName,
      imageBase64,
    });
    await promotion.save();

    // Sending email
    const mailOptions = {
      from: "inspiretech26@gmail.com",
      to: userEmail,
      subject: promotionName,
      html: `<p>${description}</p><img src="data:${getImageContentType(
        imageName
      )};base64,${imageBase64}" />`, // Embedding image using data URI
      attachments: [
        {
          filename: imageName,
          content: imageBase64,
          encoding: "base64",
          contentType: getImageContentType(imageName),
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json(promotion); // Respond only after email is sent successfully
      }
    });
  } catch (error) {
    console.error("Error creating promotion:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all promotions
exports.getAllPromotions = async (req, res) => {
  try {
    // Fetch all promotions from the database
    const promotions = await Promotion.find();

    // Respond with the array of promotions
    res.status(200).json(promotions);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE a promotion by ID
exports.deletePromotion = async (req, res) => {
  try {
    const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!deletedPromotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.json({ message: "Promotion deleted successfully", deletedPromotion });
  } catch (error) {
    console.error("Error deleting promotion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPromotion);
  } catch (error) {
    console.error("Error updating promotion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
