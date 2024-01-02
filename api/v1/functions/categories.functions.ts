import mongoose from "mongoose";
import CategoriesModel from "../schemas/categories.schema";
import { ICategoriesModel } from "../types/categories.type";

const CategoriesFunction = {
  checkSlugDuplicated: async (slug: string) => {
    const categories = await CategoriesModel.exists({ slug });
    if (categories) {
      return true;
    }
    return false;
  },
  getArrayIdCategories: async (categories: ICategoriesModel[]) => {
    const array_id: mongoose.Types.ObjectId[] = [];
    for (const item of categories) {
      const dataCategories = await CategoriesModel.findOne({ slug: item.slug });
      array_id.push(dataCategories._id);
    }
    return array_id;
  },
};

export default CategoriesFunction;
