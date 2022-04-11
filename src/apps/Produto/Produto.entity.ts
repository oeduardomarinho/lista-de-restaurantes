import { Restaurante } from '../Restaurante/Restaurante.entity';
import {
  Table,
  Column,
  Model,
  BelongsTo,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

export enum Categories {
  Doce = 'Doce',
  Salgado = 'Salgado',
  Bebida = 'Bebida',
  Prato = 'Prato',
  PratoExotico = 'PratoExotico',
  Entrada = 'Entrada',
  Principal = 'Principal',
  Sobremesa = 'Sobremesa',
}

@Table({
  tableName: 'produtos',
})
export class Produto extends Model {
  @Column({ allowNull: false })
  name!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price!: number;

  @Column({
    type: DataType.ARRAY(DataType.ENUM(...Object.values(Categories))),
    allowNull: false,
  })
  category!: Categories[];

  @Column({ type: DataType.JSONB, allowNull: false })
  @BelongsTo(() => Restaurante, {
    foreignKey: 'restaurantId',
    as: 'fk_restaurant',
  })
  restaurant!: Restaurante;

  @ForeignKey(() => Restaurante)
  @Column
  restaurantId!: number
}
