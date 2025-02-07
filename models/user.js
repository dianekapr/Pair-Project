// models/user.js
'use strict';
const { Model } = require('sequelize');
const bcrypt = require(`bcryptjs`)

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Profile, { foreignKey: 'UserId' });
            User.hasMany(models.Order, { foreignKey: 'UserId' });
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Customer",
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: async (user) => {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                },
            },
        }
    );

    return User;
};