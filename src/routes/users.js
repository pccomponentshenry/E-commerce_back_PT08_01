const { Router } = require("express");
const router = Router();
const { Users, Location } = require("../db");

router.get("/users", async (req, res) => {
  try {
    const allUsers = await Users.findAll({
      include: Users,
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: "No se encontraron Usuarios" });
  }
});

module.exports = router;
