const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('address', {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    streetName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    streetNumber: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    apartment: {
      type: DataTypes.STRING(10)
    },
    zipCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    additionalDetails: {
      type: DataTypes.STRING(100)
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  });
};