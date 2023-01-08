const { Users, Location } = require("../db");
const axios = require("axios");

const populateUser = async () => {
  const user = {
    username: "pccomponentshenry",
    email: "pccomponentshenry@gmail.com",
    isAdmin: "true"
  };
  await Users.create(user);
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.findAll({
      raw: true,
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: "No se encontraron Usuarios" });
  }
};

const getUserById = async (req, res) => {
  const { email } = req.params;
  const allUsers = await Users.findAll({
    raw: true,
  });
  try {
    allUsers.forEach(el => {
      if (el.email == email) {
        res.json({
          id: el.id,
          username: el.username,
          email: el.email,
          status: el.status,
          isAdmin: el.isAdmin,
        });
      }
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

const postUser = async (req, res) => {
  const { username, email, image } = req.body;

  try {
    const user = await Users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        username,
        image
      }
    });

    const userRegistered = user[1];
    if (userRegistered) {
      axios.post(`${process.env.BACK_URL}/email/register`, {
        name: username,
        email,
        image
      });
    };

    res.send(user[0]);
  }
  catch (error) {
    res.status(404).json(error.message);
  }
};

const putUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, status, isAdmin } = req.body;

  try {

    const updateParams = {};

    for (item in req.body) {
      if (req.body[item] && req.body[item]?.length) {
        updateParams[item] = req.body[item];
      }
    }

    await Users.update({ username, email, status, isAdmin }, { where: { id } });
    // await Users.update({
    //   isAdmin: true
    // },
    //   {
    //     where: {
    //       isAdmin: false, id
    //     }
    //   });
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { populateUser, getUsers, postUser, getUserById, putUser };
