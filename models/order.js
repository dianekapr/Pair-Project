'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {foreignKey: "UserId"})
      Order.belongsTo(models.Product, {foreignKey: "OrderId"})
    }
  }
  Order.init({
    
    UserId: {
      type: DataTypes.INTEGER,
      references:{
        model: "User",
        key: "id"
      }
    },

    ProductId: {
      type: DataTypes.INTEGER,
      references:{
        model: "User",
        key: "id"
      }
    },
    
    totalPrice: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};