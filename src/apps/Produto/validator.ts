import { Request, Response, NextFunction } from 'express';
import { CustomError } from 'express-handler-errors';
import * as yup from 'yup';
import { Categories } from './Produto.entity';

export const validateProduct = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  let productSchema = yup.object().shape({
    name: yup.string().nullable(false),
    price: yup.number().positive().nullable(false),
    category: yup
      .array(yup.mixed<Categories>().oneOf(Object.values(Categories)))
      .nullable(false),
  });

  return await productSchema
    .validate(req.body)
    .then(() => next())
    .catch((err) => {
      throw new CustomError({
        code: err.name,
        message: err.errors,
        status: 400,
      });
    });
};
