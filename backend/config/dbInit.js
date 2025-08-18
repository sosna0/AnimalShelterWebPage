const sequelize = require('./db');
const seedDatabase = require("./dbSeed");

// NOTES:
/*
    1. Function to initialize the database connection and synchronize models.
    Called in app.js.

    2. Based on the NODE_ENV variable (development mode), it runs alter on the tables 
    and seeds the database with initial data.
*/

async function initDatabase() {
	try {
		await sequelize.authenticate();
		console.log('✅ Connection has been established.');
		
		await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
		console.log('✅ Database is synchronized.');
		
		if (process.env.NODE_ENV === 'development') {
			console.log('🌱 Seeding database...');
			await seedDatabase(sequelize);
		}
	} catch (error) {
		console.error('❌ Database initialization error:', error);
		throw error;
	}

    console.log('🚀 Database is ready for use.');
}

module.exports = initDatabase;
