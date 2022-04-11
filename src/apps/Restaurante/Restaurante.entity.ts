import { Produto } from '../Produto/Produto.entity';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

export enum daysOfWeeks {
  Sunday = 'sun',
  Monday = 'mon',
  Tuesday = 'tue',
  Wednesday = 'wed',
  Thursday = 'thu',
  Friday = 'fri',
  Saturday = 'sat',
}

export class Horario extends DataType.JSONB {
  day!: daysOfWeeks;
  openingTime!: Array<number>;
  closingTime!: Array<number>;
}

@Table({
  tableName: 'restaurantes',
})
export class Restaurante extends Model {
  public static readonly timeLimit: number = 15;

  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  address!: string;

  @Column({ type: DataType.ARRAY<Horario>(new Horario()), allowNull: false })
  work_schedule!: Array<Horario>;

  @HasMany(() => Produto)
  products!: Array<Produto>;
}
