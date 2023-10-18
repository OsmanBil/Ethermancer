import dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  ENV,
} = process.env;

console.log(ENV);

console.log(`Connected to ${POSTGRES_DB} database.`);

// const isProduction = ENV === 'dev'; // das hier verwenden wenn mit ssl gearbeitet wird

const isProduction = ENV !== 'dev'; 

const poolConfig: PoolConfig = {
  host: POSTGRES_HOST,
  port: 5432,
  database: ENV === 'dev' ? POSTGRES_DB_TEST : POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  ...(isProduction
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
};

const client: Pool = new Pool(poolConfig);

export default client;
