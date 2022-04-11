import { CustomError } from 'express-handler-errors';
import { Repository } from 'sequelize-typescript';
import { Restaurante } from './Restaurante.entity';
import { connect } from '../../helper/getConnection';
import { Produto } from '../Produto/Produto.entity';
export class RestauranteService {
  private readonly repository!: Repository<Restaurante>;

  constructor(connection:Repository<Restaurante> = connect(Restaurante)) {
    this.repository = connection;
  }

  async list(): Promise<Restaurante[]> {
    return await this.repository.findAll();
  }

  async create(restaurante: Restaurante): Promise<Restaurante> {
    return await this.repository.create({ ...restaurante });
  }

  async findOne(id: number): Promise<Restaurante> {
    const data = await this.repository.findByPk(id);
    if (!data)
      throw new CustomError({
        code: 'Restaurante_NOT_FOUND',
        message: 'Restaurante not found',
        status: 404,
      });
    return data;
  }

  async update(id: number, restaurante: Restaurante): Promise<Restaurante> {
    const data = await this.repository.update(restaurante, {
      returning: true,
      where: { id },
    });
    return data[1][0];
  }

  async delete(id: number): Promise<number> {
    return await this.repository.destroy({ where: { id } });
  }

  async listProducts(id: number): Promise<Produto[]> {
    return this.repository
      .findByPk(id, {
        include: [
          {
            model: connect(Produto),
            attributes: { exclude: ['restaurant'] },
          },
        ],
        attributes: [],
      })
      .then((restaurante) => restaurante!.products)
      .catch((err) => {
        throw new CustomError({
          code: 'Restaurante_PK_INVALID',
          message: err,
          status: 400,
        });
      });
  }
}

export const restauranteService = new RestauranteService();
