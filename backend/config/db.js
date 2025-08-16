const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(
	process.env.DB_NAME || 'database', 
	process.env.DB_USER || 'username', 
	process.env.DB_PASS || 'password', 
	{
		host: process.env.DB_HOST || 'localhost',
		dialect: process.env.DB_DIALECT || 'sqlite',
		logging: process.env.NODE_ENV === 'development' ? console.log : false,
		storage: path.resolve(process.env.DB_STORAGE || './database.sqlite'),
	}
);

module.exports = sequelize;