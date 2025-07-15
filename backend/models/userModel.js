const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    surname:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
            type: DataTypes.STRING,
            allowNull: false
    },
    
    role: {
        type: DataTypes.ENUM('public', 'staff', 'admin'),
        defaultValue: 'public'
    },
    
//   phone: STRING // chyba zbędne
//   created_at: TIMESTAMP // chyba zbędne
//   updated_at: TIMESTAMP // chyba zbędne

});

module.exports = User;