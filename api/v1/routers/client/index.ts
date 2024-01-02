import express from "express";
import ClientCountriesRouter from "./countries.router";

const ClientRouter = express.Router();

ClientRouter.use("/quoc-gia", ClientCountriesRouter);
export default ClientRouter;
