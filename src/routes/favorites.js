const { Router } = require("express");
const { getFavorites, postFavorites, putFavorites } = require("../controllers/favorites");
const router = Router();

router.get("/:userId", getFavorites);
router.put("/:userId/:productId", putFavorites);
router.post("/:userId/:productId", postFavorites);

module.exports = router;