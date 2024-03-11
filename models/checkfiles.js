'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checkfiles.init({
    userid: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      }
    },
    des: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      }
    },
    file: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      }
    },
    urlfile: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      }
    },
    type: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true, 
      }
    }
  }, {
    sequelize,
    modelName: 'Checkfiles',
  });
  return Checkfiles;
};