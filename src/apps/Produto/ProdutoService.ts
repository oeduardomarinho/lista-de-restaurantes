import { CustomError } from 'express-handler-errors';
import { Repository } from 'sequelize-typescript';
import { Produto } from '../Produto/Produto.entity';
import { connect } from '../../helper/getConnection';
import { Restaurante } from 'apps/Restaurante/Restaurante.entity';

class ProdutoService {
  private readonly repository!: Repository<Produto>;

  constructor() {
    this.repository = connect(Produto);
  }

  async create(restaurant: Restaurante, produto: Produto): Promise<Produto> {
    return this.repository.create({
      ...produto,
      restaurant: restaurant,
      restaurantId: restaurant.id,
    });
  }

  async findOne(id: number): Promise<Produto> {
    const data = await this.repository.findByPk(id, {
      attributes: { exclude: ['restaurant'] },
    });
    if (!data)
      throw new CustomError({
        code: 'Produto_NOT_FOUND',
        message: 'Produto not found',
        status: 404,
      });
    return data;
  }

  async update(id: number, Produto: Produto): Promise<Produto> {
    const data = await this.repository.update(Produto, {
      returning: true,
      where: { id },
    });
    return data[1][0];
  }

  async delete(id: number): Promise<number> {
    return await this.repository.destroy({ where: { id } });
  }
}

export default new ProdutoService();
