const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
      defaultValue: "created",
    }
  }, {
    timestamps: false
  });
};