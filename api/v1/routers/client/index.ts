import express from "express";
import ClientCountriesRouter from "./countries.router";
import ClientMovieRouter from "./movie.router";

const ClientRouter = express.Router();

ClientRouter.use("/quoc-gia", ClientCountriesRouter);
ClientRouter.use("/", ClientMovieRouter);

export default ClientRouter;
