const { Router } = require("express");
const { getReviews, postReview } = require("../controllers/review");
const router = Router();

router.get("/", getReviews);
router.post("/", postReview);

module.exports = router;