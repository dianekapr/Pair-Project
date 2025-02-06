'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey : 'CategoryId'})
      Product.hasMany(models.Order, {foreignKey : 'OrderId'})
    }

    get formatRupiah(){ 
      return `Rp${this.price.toLocaleString('id-ID')},00`;
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,

    CategoryId: {
      type: DataTypes.INTEGER,
      references:{
        model: "Categories",
        key: "id"
      }
    },

    imageUrl: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};