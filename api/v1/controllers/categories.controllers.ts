import { BASE_URL_CRAWLING_DATA } from "./../helpers/constant";
import HttpErrors from "http-errors";
import { NextFunction, Request, Response } from "express";
import { crawlingData, generateOptions, makeSlug } from "../helpers/helpers";
import CategoriesFunction from "../functions/categories.functions";
import CategoriesModel from "../schemas/categories.schema";

const CategoriesControllers = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    try {
      const slug = makeSlug(name);

      const isDuplicatedSlug = await CategoriesFunction.checkSlugDuplicated(
        slug
      );

      if (isDuplicatedSlug) {
        return next(
          new HttpErrors.BadRequest("The categories already exits !")
        );
      }

      await CategoriesModel.create({ name, slug });

      res.status(201).json({
        success: true,
        message: "Create new categories successfully !",
      });
    } catch (error) {
      return next(new HttpErrors.BadRequest(error.message));
    }
  },
  drawlingData: async (req: Request, res: Response, next: NextFunction) => {
    const domain = BASE_URL_CRAWLING_DATA + "/v1/api/the-loai";
    const url = new URL(domain);

    try {
      const options = generateOptions(url);
      const dataCrawling = await crawlingData(options);

      const { items } = dataCrawling.data;

      for (const item of items) {
        const { name, slug } = item;

        const isDuplicateSlug = await CategoriesFunction.checkSlugDuplicated(
          slug
        );

        if (!isDuplicateSlug) {
          CategoriesModel.create({
            name,
            slug,
          });
        }
      }
      res
        .status(201)
        .json({ success: true, message: "Crawling data successfully !" });
    } catch (error) {
      next(new HttpErrors.BadRequest(error.message));
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list_categories = await CategoriesModel.find({}).select(
        "-movie_id -create_at -update_at "
      );

      res.status(200).json({ success: true, data: list_categories });
    } catch (error) {
      return next(new HttpErrors.BadRequest(error.message));
    }
  },
  getDetail: async (req: Request, res: Response, next: NextFunction) => {},
  update: async (req: Request, res: Response, next: NextFunction) => {},
  delete: async (req: Request, res: Response, next: NextFunction) => {},
};

export default CategoriesControllers;
