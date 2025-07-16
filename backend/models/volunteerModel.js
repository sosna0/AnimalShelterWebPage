const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Volunteer = sequelize.define('Volunteer', {
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
    
    animalId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Animal',
            key: 'id'
        }
    },

    // można zmniejszyć ilość aktywności
    activityType:{
        type: DataTypes.ENUM('feeding', 'walking', 'grooming', 'training', 'cleaning'),
        allowNull: false,
        validate: {
            isIn: [['feeding', 'walking', 'grooming', 'training', 'cleaning']]
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

module.exports = Volunteer;