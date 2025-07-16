const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Donation = sequelize.define('Donation', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },

    amount:{
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0.01
        }
    },

    donorNickname:{
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

    createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: true
        }
    }

});

module.exports = Donation;