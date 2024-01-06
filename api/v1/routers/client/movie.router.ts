import express from "express";
import MovieControllers from "../../controllers/movie.controller";

const ClientMovieRouter = express.Router();

ClientMovieRouter.get("/quoc-gia/:slug", MovieControllers.getMovieByCountries);
ClientMovieRouter.get("/phim/:slug", MovieControllers.getMovieBySlug);
export default ClientMovieRouter;
