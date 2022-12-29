const { Address, Location } = require('../db');

const getAddresses = async (req, res) => {
  const { userId } = req.params;

  try {
    const addresses = await Address.findAll({
      attributes: ["id", "streetName", "streetNumber", "apartment", "zipCode", "additionalDetails", "isDefault"],
      where: {
        userId
      },
      include: {
        model: Location,
        attributes: ["name"],
      },
      raw: true
    });

    res.status(200).send(addresses);
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const postAddress = async (req, res) => {
  const { userId, streetName, streetNumber, apartment, zipCode, additionalDetails, locationId } = req.body;
  let isDefault;

  try {
    const address = await Address.findOne({ where: { userId } });

    address ? isDefault = false : isDefault = true;

    const addressExists = await Address.findOne({ where: { userId, streetName, streetNumber, apartment, locationId } });

    if (!addressExists) {
      const created = await Address.create({ userId, streetName, streetNumber, apartment, zipCode, additionalDetails, isDefault, locationId });
      return res.status(200).send(created);
    }
    res.status(400).send("Address already exists");
  }
  catch (error) {
    res.status(400).send(error);
  }

}

const modifyAddress = async (req, res) => {
  const { id, streetName, streetNumber, apartment, zipCode, additionalDetails, locationId } = req.body;

  try {
    await Address.update({ streetName, streetNumber, apartment, zipCode, additionalDetails, locationId }, { where: { id } });
    res.status(200).send("Address successfully modified");
  }
  catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getAddresses, postAddress, modifyAddress };