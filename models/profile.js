'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    bio: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    bornDate: DataTypes.DATE,

    UserId: {
      type: DataTypes.INTEGER,
      references:{
        model: "User",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};