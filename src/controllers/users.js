const { Users, Location } = require("../db");

const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.findAll({
      raw: true
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: "No se encontraron Usuarios" });
  }
};

const postUser = async (req, res) => {
  const { username, email, status, isAdmin, location } = req.body;
  try {
    /* const findLocation = await Location.findOne({
      where: {
        name: location,
      }
    }) */
    await Users.create({
      username,
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
};

module.exports = { getUsers, postUser }