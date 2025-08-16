const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel.js');
const Animal = require('./animalModel.js');

const Adoption = sequelize.define('Adoption', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    animalId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status:{
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending',
        validate: {
            isIn: [['Pending', 'Approved', 'Rejected']]
        }
    },    

});

Adoption.belongsTo(User, {
    foreignKey: 'userId'
});

Adoption.belongsTo(Animal, {
    foreignKey: 'animalId'
});

module.exports = Adoption;