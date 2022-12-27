const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('userreview',{
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        timestamps: false
      });
}