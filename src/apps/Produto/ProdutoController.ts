import { Request, Response } from 'express';
import ProdutoService from './ProdutoService';
import { restauranteService } from '../Restaurante/RestauranteService';

export const create = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const restaurant = await restauranteService.findOne(Number(restaurantId));
  const response = await ProdutoService.create(restaurant, req.body);
  res.json(response);
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProdutoService.findOne(Number(id));
  res.json(response);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProdutoService.update(Number(id), req.body);
  res.json(response);
};

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await ProdutoService.delete(Number(id));
  res.json(response);
};
