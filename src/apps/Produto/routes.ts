import { Router } from 'express';
import { validateProduct } from './validator';
import { validatePK } from '../util/validator';
import * as controller from './ProdutoController';
import 'express-async-errors';

const route = Router({ mergeParams: true });

route.get('/:id', validatePK, controller.findOne);
route.post('/', validatePK, validateProduct, controller.create);
route.put('/:id', validatePK, controller.update);
route.delete('/:id', validatePK, controller.deleteOne);

export default route;
