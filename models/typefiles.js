'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TypeFiles.init({
    typename: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true, 
      },
    },
    moneypay: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true, 
      },
    },
  }, {
    sequelize,
    modelName: 'TypeFiles',
  });
  return TypeFiles;
};