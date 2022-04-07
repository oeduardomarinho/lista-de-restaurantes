import { Request, Response, Router } from 'express';
// import replaceRoute from './apps/Replace/routes';

const routes = Router();

routes.get('/', (_: Request, res: Response) => {
  return res.json({ message: 'Ok!' });
});

// routes.use('/replace', replaceRoute);

export default routes;
