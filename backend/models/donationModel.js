const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel.js');

const Donation = sequelize.define('Donation', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },

    nickname:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 100]
        }
    },

    message:{
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1000]
        }
    },

    paymentStatus:{
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'completed', 'failed']]
        }
    },

});

Donation.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = Donation;