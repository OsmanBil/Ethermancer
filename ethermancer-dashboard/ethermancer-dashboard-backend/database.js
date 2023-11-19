const { Pool } = require('pg');

console.log(`Connected to my_database database.`);

const isProduction = false;  // Setzen Sie dies auf true für Produktionsumgebung

const poolConfig = {
  host: 'database-1.cxindoou3tc6.us-east-1.rds.amazonaws.com',          // Ersetzen Sie dies durch Ihre Datenbank-Host-Adresse
  port: 5432,                // Ersetzen Sie dies durch Ihren Datenbank-Port, wenn er nicht 5432 ist
  database: isProduction ? 'postgres' : 'postgres',  // Ersetzen Sie dies durch Ihre Datenbanknamen
  user: 'postgres',           // Ersetzen Sie dies durch Ihren Datenbankbenutzernamen
  password: 'postgresDB',   // Ersetzen Sie dies durch Ihr Datenbankpasswort
  ssl: {
    rejectUnauthorized: false
  }
};

const client = new Pool(poolConfig);

module.exports = client;
