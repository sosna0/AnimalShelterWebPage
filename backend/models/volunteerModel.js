const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel.js');
const Animal = require('./animalModel.js');

const Volunteer = sequelize.define('Volunteer', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    animalId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    activityType:{
        type: DataTypes.ENUM('walking', 'playing', 'cleaning'),
        allowNull: false,
        validate: {
            isIn: [['walking', 'playing', 'cleaning']]
        }
    },

    date:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },

    durationMinutes:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },

    message:{
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1000]
        }
    },
    

});

Volunteer.belongsTo(User, {
    foreignKey: 'userId'
});

Volunteer.belongsTo(Animal, {
    foreignKey: 'animalId'
});


module.exports = Volunteer;