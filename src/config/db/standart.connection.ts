import { Sequelize } from 'sequelize-typescript';
import { Restaurante } from '../../apps/Restaurante/Restaurante.entity';
import { Produto } from '../../apps/Produto/Produto.entity';
import { dbConnections } from '../config';
import { Client } from 'pg';

const client: Client = new Client({
  database: 'postgres',
  user: dbConnections.postgres.username,
  password: dbConnections.postgres.password,
  host: dbConnections.postgres.host,
  port: dbConnections.postgres.port,
});

client
  .connect()
  .then(async () => {
    await client
      .query('CREATE DATABASE "' + dbConnections.postgres.database_name + '"')
      .catch(() => {});
  })
  .finally(() => client.end());

const connection: Sequelize = new Sequelize(
  dbConnections.postgres.database_name,
  dbConnections.postgres.username,
  dbConnections.postgres.password,
  {
    dialect: 'postgres',
    host: dbConnections.postgres.host,
    port: dbConnections.postgres.port,
    models: [Restaurante, Produto],
    repositoryMode: true,
    validateOnly: dbConnections.validateOnly
  }
);


export { connection };
