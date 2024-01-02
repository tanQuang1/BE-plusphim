import express from "express";
import CountriesControllers from "../../controllers/countries.controllers";

const ClientCountriesRouter = express.Router();

ClientCountriesRouter.get("/", CountriesControllers.getAll);

export default ClientCountriesRouter;
