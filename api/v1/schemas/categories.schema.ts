import mongoose, { Schema } from "mongoose";
import { ICategoriesModel } from "../types/categories.type";

const CategoriesSchema: Schema = new Schema<ICategoriesModel>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
  },
  {
    versionKey: false,
  }
);

const CategoriesModel = mongoose.model<ICategoriesModel>(
  "Categories",
  CategoriesSchema
);

export default CategoriesModel;
