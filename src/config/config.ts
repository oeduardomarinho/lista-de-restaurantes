import { config } from 'dotenv';

const envfile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
const envdir = process.cwd();

config({ path: `${envdir}/${envfile}` });

export const server = {
  host: process.env.SERVER || 'localhost',
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
};

export const dbConnections = {
  validateOnly: process.env.DB_VALIDATEONLY ? true : false,
  postgres: {
    host: String(process.env.POSTGRES_HOST),
    port: Number(process.env.POSTGRES_PORT),
    username: String(process.env.POSTGRES_USER),
    password: String(process.env.POSTGRES_PASSWORD),
    database_name: String(process.env.POSTGRES_DB),
  },
};
