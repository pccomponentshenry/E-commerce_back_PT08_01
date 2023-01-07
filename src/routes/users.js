const { Router } = require("express");
const { getUsers, postUser, getUserById, putUser } = require("../controllers/users");
const router = Router();

router.get("/", getUsers);
router.get("/:email", getUserById);
router.post("/", postUser);
router.put("/:id", putUser);

module.exports = router;
