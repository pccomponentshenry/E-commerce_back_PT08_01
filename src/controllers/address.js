const { Address, Location, conn } = require("../db");

const getAddresses = async (req, res) => {
  const { userId } = req.params;

  try {

    const sqlQuery =
      `SELECT a.id, a."streetName", a."streetNumber", a.apartment, a."zipCode", a."additionalDetails", a."isDefault", l.name AS "locationName"
    FROM addresses AS a
    JOIN locations AS l ON l.id = a."locationId"
    WHERE a."userId" = '${userId}'`;

    const addresses = await conn.query(sqlQuery,
      {
        model: Address,
        mapToModel: true
      },
      {
        raw: true
      });

    res.status(200).send(addresses);
  }
  catch (error) {
    res.status(400).send(error);
  }
};

const postAddress = async (req, res) => {
  const { userId, streetName, streetNumber, apartment, zipCode, additionalDetails, location } = req.body;
  let isDefault;

  try {
    const address = await Address.findOne({ where: { userId } });

    address ? (isDefault = false) : (isDefault = true);

    const foundLocation = await Location.findOne({ where: { name: location } });
    const locationId = foundLocation.dataValues.id;

    const addressExists = await Address.findOne({
      where: { userId, streetName, streetNumber, apartment, locationId },
    });

    if (!addressExists) {
      const created = await Address.create({
        userId,
        streetName,
        streetNumber,
        apartment,
        zipCode,
        additionalDetails,
        isDefault,
        locationId,
      });

      created.dataValues.locationName = location;
      return res.status(200).send(created);
    }
    res.status(400).send("Address already exists");
  }
  catch (error) {
    res.status(400).send(error);
  }
};

const modifyAddress = async (req, res) => {
  const { id, streetName, streetNumber, apartment, zipCode, additionalDetails, locationId, isDefault } = req.body;

  try {
    if (isDefault) {
      await Address.update(
        {
          isDefault: false
        },
        {
          where: {
            isDefault: true
          }
        });
      await Address.update(
        {
          isDefault: true
        },
        {
          where: { id }
        });
    }

    await Address.update(
      {
        streetName,
        streetNumber,
        apartment,
        zipCode,
        additionalDetails,
        locationId,
      },
      { where: { id } }
    );
    res.status(200).send("Address successfully modified");
  }
  catch (error) {
    res.status(400).send(error);
  }
};

const getAddressById = async (req, res) => {
  const { id, userId } = req.params;

  try {

    const sqlQuery =
      `SELECT a.id, a."streetName", a."streetNumber", a.apartment, a."zipCode", a."additionalDetails", a."isDefault", l.name AS "locationName"
      FROM addresses AS a
      JOIN locations AS l ON l.id = a."locationId"
      WHERE a."userId" = '${userId}' AND a.id = '${id}'`;

    const address = await conn.query(sqlQuery,
      {
        model: Address,
        mapToModel: true
      },
      {
        raw: true
      });

    res.status(200).send(address[0]);
  }

  catch (error) {
    res.status(404).send(error);
  }
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const addressToDelete = await Address.findByPk(id);
    const addresses = await Address.findAll();

    if (addressToDelete.dataValues.isDefault && addresses.length > 1) {
      const addressToDefault = await Address.findOne({ where: { isDefault: false } });

      await Address.update({
        isDefault: true,
      }, {
        where: {
          id: addressToDefault.dataValues.id,
        }
      });
      await Address.destroy({
        where: {
          id
        }
      });
      return res.status(200).send(addressToDefault);
    }

    await Address.destroy({
      where: {
        id
      }
    });

    res.status(200).send("Address deleted successfully");
  }
  catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getAddresses, postAddress, modifyAddress, getAddressById, deleteAddress };
