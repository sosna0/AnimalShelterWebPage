const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './database.sqlite', 
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });

// sequelize.sync({alter: true}) // {force: true} - drop and recreate tables
//   .then(() => {
//     console.log('Database is synchronized.');
//   })
//   .catch(error => {
//     console.error('An error occurred during database synchronization: ', error);
//   });

module.exports = sequelize;