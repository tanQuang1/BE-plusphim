import HttpErrors from "http-errors";
import { NextFunction, Request, Response } from "express";
import { CountriesFunction } from "../functions/countries.funtion";
import { crawlingData, generateOptions, makeSlug } from "../helpers/helpers";
import CountriesModel from "../schemas/countries.schema";
import { BASE_URL_CRAWLING_DATA } from "../helpers/constant";

const CountriesControllers = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    try {
      const slug = makeSlug(name);
      const isDuplicateSlug = await CountriesFunction.checkSlugDuplicated(slug);
      if (isDuplicateSlug) {
        return next(
          new HttpErrors.BadRequest("The countries is already exits")
        );
      }
      await CountriesModel.create({
        name,
        slug,
      });
      return res
        .status(201)
        .json({ success: true, message: "Create countries successfully !" });
    } catch (error) {
      return next(new HttpErrors.BadRequest(error.message));
    }
  },
  drawlingData: async (req: Request, res: Response, next: NextFunction) => {
    const domain = BASE_URL_CRAWLING_DATA + "/v1/api/quoc-gia";
    const url = new URL(domain);
    try {
      const options = generateOptions(url);
      const dataCrawling = await crawlingData(options);

      const { items } = dataCrawling.data;

      for (const item of items) {
        {
          const { name, slug } = item;
          const isDuplicateSlug = await CountriesFunction.checkSlugDuplicated(
            slug
          );

          if (!isDuplicateSlug) {
            await CountriesModel.create({ name, slug });
          }
        }
      }
      res.status(200).json({
        success: true,
        message: "Crawling data countries successfully !",
      });
    } catch (error) {
      next(new HttpErrors.BadRequest(error.message));
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list_countries = await CountriesModel.find({}).select(
        "-movie_id -create_at -update_at"
      );

      res.status(200).json({
        success: true,
        data: list_countries,
      });
    } catch (error) {
      return next(new HttpErrors.BadRequest(error.message));
    }
  },
  getDetail: async (req: Request, res: Response, next: NextFunction) => {},
  update: async (req: Request, res: Response, next: NextFunction) => {},
  delete: async (req: Request, res: Response, next: NextFunction) => {},
};

export default CountriesControllers;
