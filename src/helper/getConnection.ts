import { Model, Repository } from 'sequelize-typescript';
import { connection } from '../config/db/standart.connection';

export function connect<T extends Model>(Type: { new (): T }): Repository<T> {
  return connection.getRepository(Type);
}
