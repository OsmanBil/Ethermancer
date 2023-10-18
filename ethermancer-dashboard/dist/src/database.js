"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB_TEST, ENV, } = process.env;
console.log(ENV);
console.log(`Connected to ${POSTGRES_DB} database.`);
const isProduction = ENV === 'dev'; // Oder wie immer Sie Ihre Produktionsumgebung identifizieren
const poolConfig = Object.assign({ host: POSTGRES_HOST, port: 5432, database: ENV === 'dev' ? POSTGRES_DB_TEST : POSTGRES_DB, user: POSTGRES_USER, password: POSTGRES_PASSWORD }, (isProduction
    ? {
        ssl: {
            rejectUnauthorized: false,
        },
    }
    : {}));
const client = new pg_1.Pool(poolConfig);
exports.default = client;
