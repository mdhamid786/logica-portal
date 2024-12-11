const { Sequelize } = require('sequelize');
require('dotenv').config(); // Ensure environment variables are loaded

// Create a new instance of Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // Ensure port is an integer
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Directly use password
  database: process.env.DB_NAME,
  logging: false, // Disable logging, enable if you need debug info
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
