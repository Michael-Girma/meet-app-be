'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.User, {
        foreignKey: "toUser",
        onDelete: "CASCADE",
        as: "ToUser"
      }),

      Request.belongsTo(models.User, {
        foreignKey: "fromUser",
        onDelete: "CASCADE",
        as: "FromUser"
      })
    }
  }
  Request.init({
    message: DataTypes.STRING,
    time: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};