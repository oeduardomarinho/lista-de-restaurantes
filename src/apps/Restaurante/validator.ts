import { Request, Response, NextFunction } from 'express';
import { CustomError } from 'express-handler-errors';
import { daysOfWeeks, Restaurante } from './Restaurante.entity';
import * as yup from 'yup';

export const validateRestaurant = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const timeRegex = /\d{2}:\d{2}/g; // HH:mm

  let work_scheduleSchema = yup
    .object()
    .shape({
      day: yup
        .mixed<daysOfWeeks>()
        .oneOf(Object.values(daysOfWeeks))
        .nullable(false),
      openingTime: yup.string().nullable(false),
      closingTime: yup.string().nullable(false),
    })
    .test(
      'verifyTimeFormat',
      'Time format invalid, use HH:mm',
      ({ openingTime, closingTime }) =>
        [openingTime, closingTime].every((v) => v?.match(timeRegex))
    )
    .test(
      'verifyWorkTimeLimit',
      `Work schedule must take longer than ${Restaurante.timeLimit} minutes`,
      ({ openingTime: oT, closingTime: cT }) => {
        var [openingTime, closingTime] = [oT, cT].map((time): number[] =>
          time!.split(':').map((v) => Number(v))
        );
        return (
          workTimeInMinutes(openingTime, closingTime) >= Restaurante.timeLimit
        );
      }
    );

  let restaurantSchema = yup.object().shape({
    name: yup.string().nullable(false),
    address: yup.string().nullable(false),
    work_schedule: yup.array().of(work_scheduleSchema).nullable(false),
  });

  return await restaurantSchema
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

function workTimeInMinutes(
  openingTime: number[],
  closingTime: number[]
): number {
  var [start, end] = [openingTime, closingTime].map(
    ({ 0: hour, 1: minute }): number => hour * 60 + minute
  );

  return end - start;
}
