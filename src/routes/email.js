const { Router } = require("express");
const { sendEmail, sendEmailRegister } = require("../controllers/email");

const router = Router();

router.post("/register", sendEmailRegister)
router.post('/', sendEmail)


module.exports = router;