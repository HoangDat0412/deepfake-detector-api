'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checkouts.init({
    userid: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      }
    },
    moneypay: {
      type:DataTypes.FLOAT,
      validate: {
        notEmpty: true, 
      }
    },
    payment_method:{
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      }
    },
  }, {
    sequelize,
    modelName: 'Checkouts',
  });
  return Checkouts;
};