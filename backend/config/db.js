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

// to jest po to, żeby wyrzucić stare dane z każdym nowym odpaleniem aplikacji
sequelize.sync({force: true}) // {force: true} - drop and recreate tables // było alter
  .then(() => {
    console.log('Database is synchronized.');
  })
  .catch(error => {
    console.error('An error occurred during database synchronization: ', error);
  });

module.exports = sequelize;