require('dotenv').config();
const { Pool } = require('pg');

// console.log(`Connected to ${process.env.DB_DATABASE} database.`);

const isProduction = false;

const poolConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: isProduction ? process.env.DB_DATABASE : process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
};

const client = new Pool(poolConfig);

module.exports = client;
