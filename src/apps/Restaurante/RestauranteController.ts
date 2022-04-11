import { Request, Response } from 'express';
import { restauranteService } from './RestauranteService';

export const list = async (_: Request, res: Response) => {
  const response = await restauranteService.list();
  res.json(response);
};

export const listProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await restauranteService.listProducts(Number(id));
  res.json(response);
};

export const create = async (req: Request, res: Response) => {
  const response = await restauranteService.create(req.body);
  res.json(response);
};

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await restauranteService.findOne(Number(id));
  res.json(response);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await restauranteService.update(Number(id), req.body);
  res.json(response);
};

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await restauranteService.delete(Number(id));
  res.json(response);
};
