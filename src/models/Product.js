const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type: DataTypes.STRING,
      allowNull:false
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,    
    },
    description:{
      type: DataTypes.TEXT,
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,  
    }

  },{timestamps:false});
};
