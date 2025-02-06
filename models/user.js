// models/user.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Profile, { foreignKey: 'UserId' });
            User.hasMany(models.Order, { foreignKey: 'UserId' });
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Username already exists' 
            },
            validate: {
                notEmpty: {
                    msg: 'Username is required'
                },
                len: {
                    args: [3, 20], 
                    msg: 'Username must be between 3 and 20 characters'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email already exists' 
            },
            validate: {
                isEmail: {
                    msg: 'Invalid email format'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isStrongPassword(value) {
                    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                        throw new Error('Password must contain at least one lowercase letter, one uppercase letter, and one number');
                    }
                },
                len: {
                    args: [8, 255], 
                    msg: 'Password must be between 8 and 255 characters'
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Customer'
        }
    }, {
        sequelize,
        modelName: 'User'
    });

    return User;
};