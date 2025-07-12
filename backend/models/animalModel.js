const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Animal = sequelize.define('Animal', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [1, 100]
        }
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1000]
        }
    },

    species: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['dog', 'cat', 'other']]
        }
    },

    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    },

    gender: {
        type: DataTypes.ENUM('male', 'female', 'unknown'),
        allowNull: false,
        validate: {
            isIn: [['male', 'female', 'unknown']]
        }
    },

    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            min: 0,
            max: 100,
            isFloat: true
        }
    },

    adoptionStatus: {
        type: DataTypes.ENUM('available', 'unavailable', 'adopted'),
        defaultValue: 'available',
        validate: {
            isIn: [['available', 'unavailable', 'adopted']]
        }
    },

    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },

});

module.exports = Animal;