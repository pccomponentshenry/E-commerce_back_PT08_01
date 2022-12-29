const { Router } = require("express");
const { getUsers, postUser, getUserById } = require("../controllers/users");
const router = Router();

router.get("/", getUsers);
router.get("/:email", getUserById);
router.post("/", postUser);

module.exports = router;
