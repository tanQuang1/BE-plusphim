import express from "express";
import CategoriesControllers from "../../controllers/categories.controllers";

const AdminCategoriesRouter = express.Router();
AdminCategoriesRouter.post("/", CategoriesControllers.create);
AdminCategoriesRouter.get("/", CategoriesControllers.getAll);
export default AdminCategoriesRouter;
