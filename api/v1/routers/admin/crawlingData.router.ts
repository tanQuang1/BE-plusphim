import express from "express";
import CountriesControllers from "../../controllers/countries.controllers";
import CategoriesControllers from "../../controllers/categories.controllers";
import MovieControllers from "../../controllers/movie.controller";

const AdminCrawlingDataRouter = express.Router();

AdminCrawlingDataRouter.get("/quoc-gia", CountriesControllers.drawlingData);
AdminCrawlingDataRouter.get("/the-loai", CategoriesControllers.drawlingData);
// AdminCrawlingDataRouter.get("/movie", MovieControllers.drawlingData);

AdminCrawlingDataRouter.get(
  "/singleMovie/:slug",
  MovieControllers.drawingSingleMovie
);
AdminCrawlingDataRouter.get(
  "/manyMovie/:currentPage",
  MovieControllers.drawlingManyMovie
);
export default AdminCrawlingDataRouter;
