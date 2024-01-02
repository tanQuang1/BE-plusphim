import { Schema } from "mongoose";
import * as yup from "yup";
import httpError from "http-errors";
import { NextFunction, Request, Response } from "express";

export const validationRequest =
  (schema: yup.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.validate(req.body);
      req.body = result;
      next();
    } catch (error) {
      return next(httpError.BadRequest(error.message));
    }
  };

export const CountriesAndCategoriesValidation = yup.object({
  name: yup.string().required("Name is required"),
});
