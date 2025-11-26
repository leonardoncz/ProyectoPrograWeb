// config/config.js
require('dotenv').config(); 

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "1234",   
    database: process.env.DB_NAME || "prograwebDB",  
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
    port: 5432
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,           
        rejectUnauthorized: false 
      }
    }
  }
};