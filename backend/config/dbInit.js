const sequelize = require('./db');
const seedDatabase = require("./dbSeed");

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
