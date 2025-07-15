const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Adoption = sequelize.define('Adoption', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
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

    status:{
        type: DataTypes.ENUM('pending', 'approved', 'rejected', 'completed'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'approved', 'rejected', 'completed']]
        }
    },    


});

module.exports = Adoption;