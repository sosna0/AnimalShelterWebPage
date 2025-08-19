const { Sequelize } = require('sequelize');
const path = require('path');

// NOTES:
/*
	1. Function to create a new Sequelize instance and connect to the database.

	2. All parameters are taken from environment variables, with fallback values provided.

	3. Additional logging is enabled based on the DB_LOGGING environment variable.
*/

const sequelize = new Sequelize(
	process.env.DB_NAME || 'database', 
	process.env.DB_USER || 'username', 
	process.env.DB_PASS || 'password', 
	{
		host: process.env.DB_HOST || 'localhost',
		dialect: process.env.DB_DIALECT || 'sqlite',
		logging: process.env.DB_LOGGING === 'true' ? console.log : false,
		storage: path.resolve(process.env.DB_STORAGE || './database.sqlite'),
	}
);

module.exports = sequelize;