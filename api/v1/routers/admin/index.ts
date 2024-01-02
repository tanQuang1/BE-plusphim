import express from "express";
import AdminCountriesRouter from "./countries.routers";
import AdminCategoriesRouter from "./categories.router";
import AdminCrawlingDataRouter from "./crawlingData.router";

const AdminRouter = express.Router();

AdminRouter.use("/quoc-gia", AdminCountriesRouter);
AdminRouter.use("/the-loai", AdminCategoriesRouter);
AdminRouter.use("/crawlingData", AdminCrawlingDataRouter);
export default AdminRouter;
