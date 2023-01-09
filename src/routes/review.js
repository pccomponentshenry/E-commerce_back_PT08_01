const { Router } = require("express");
const { getReviews, postReview, getStarsPerProduct } = require("../controllers/review");
const router = Router();

router.get("/", getReviews);
router.get("/:productId", getStarsPerProduct);
router.post("/", postReview);

module.exports = router;