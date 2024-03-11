'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vnpays extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vnpays.init({
    orderid: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
    },
    moneyPay: {
      type:DataTypes.FLOAT,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Vnpays',
  });
  return Vnpays;
};