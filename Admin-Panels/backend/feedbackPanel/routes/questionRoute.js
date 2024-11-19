const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// POST request to submit a question
router.post("/submit", questionController.submitQuestion);

module.exports = router;
