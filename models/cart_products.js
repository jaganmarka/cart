'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart_products.belongsTo(models.carts, { foreignKey: 'cartId' });
    }
  };
  cart_products.init({
    cartId: {
      type: DataTypes.INTEGER,
      references: {
        model: "carts",
        key: "id"
      }
    },
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart_products',
  });
  return cart_products;
};