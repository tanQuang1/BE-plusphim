import { NextFunction, Request, Response } from 'express';
import Yup from 'yup';

interface ErrorType extends Error, Yup.ValidationError {
  status: number;
  message: string;
}
const errorHandler = (
  error: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);

  if (!error) return next();

  res.status(error.status).json({
    success: false,
    status: error.status || 500,
    message: error.message || 'Something went wrong on server',
  });
};

export default errorHandler;
