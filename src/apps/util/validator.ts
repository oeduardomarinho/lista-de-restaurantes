import { Request, Response, NextFunction } from 'express';
import { CustomError } from 'express-handler-errors';
import * as yup from 'yup';

export const validatePK = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {  
  return await yup.object().shape({
    restaurantId: yup.number().integer().positive().notRequired(),
    id: yup.number().integer().positive().when('restaurantId', (restaurantId, field) =>{
      if(restaurantId && req.method !== 'POST') return field.required()
    })
  })
    .validate({...req.params})
    .then(() => next())
    .catch((err) => {
      throw new CustomError({
        code: err.name,
        message: err.errors,
        status: 400,
      });
    });
};
