const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('users', {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(30),
      //allowNull: false,
    /*   validate: {
        notNull: {
          msg: `Username can't be empty`
        },
        len: {
          args: [3, 30],
          msg: 'Username must have 3 to 30 characters'
        }
      } */
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use'
      },
      validate: {
        isEmail: {
          msg: 'Please provide a valid email'
        },
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'banned', 'deleted'),
      defaultValue: "active",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    timestamps: false
  });
};