import express from "express";
import CountriesControllers from "../../controllers/countries.controllers";

const AdminCountriesRouter = express.Router();

AdminCountriesRouter.post("/", CountriesControllers.create);
AdminCountriesRouter.get("/quoc-gia", CountriesControllers.getAll);
export default AdminCountriesRouter;
