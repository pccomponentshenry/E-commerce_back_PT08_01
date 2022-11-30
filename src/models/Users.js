const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: `Username can't be empty`
        },
        len: {
          args: [3, 20],
          msg: 'Username must have 3 to 20 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    category: {
      type: DataTypes.ENUM('buyer', 'seller')
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'banned', 'deleted')
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    timestamps: false
  });
};