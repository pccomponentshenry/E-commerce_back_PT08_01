const { Router } = require("express");
const router = Router();
const { Users, Location } = require("../db");

router.get("/", async (req, res) => {
  try {
    const allUsers = await Users.findAll({
       raw: true 
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: "No se encontraron Usuarios" });
  }
});
router.post("/", async (req, res) => {
  const { email, status, isAdmin, location } = req.body;
  try {
    /* const findLocation = await Location.findOne({
      where: {
        name: location,
      }
    }) */
    await Users.create({
      username: email,
      email,
      status,
      isAdmin,
      //LocationId: findLocation.dataValues.id
    },
    )
    res.send('User created successfully')

  } catch (error) {
    res.status(404).json(error.message)
  }
});

module.exports = router;
