import { Request, Response, Router } from 'express';
import restauranteRoute from './apps/Restaurante/routes';
import produtoRoute from './apps/Produto/routes';

const routes = Router();

routes.get('/', (_: Request, res: Response) => {
  return res.sendStatus(200);
});

routes.use('/restaurant', restauranteRoute);
routes.use('/restaurant/:restaurantId/product', produtoRoute);

export default routes;
