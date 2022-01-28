'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlacklistedToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  BlacklistedToken.init({
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BlacklistedToken',
  });

  BlacklistedToken.isBlacklisted = async function (token){
    const blacklistedTokens = await this.findAll({ where: { token } });

    return blacklistedTokens.length && true;
  }

  return BlacklistedToken;
};