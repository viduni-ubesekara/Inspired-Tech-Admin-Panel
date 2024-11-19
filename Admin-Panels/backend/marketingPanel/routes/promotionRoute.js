const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotionController");

router.post("/createpromotions", promotionController.createPromotion);

// GET request to get all promotions
router.get("/getpromotions", promotionController.getAllPromotions);

router.delete("/delete/:id", promotionController.deletePromotion);

router.put("/updatepromotion/:id", promotionController.updatePromotion);

module.exports = router;
