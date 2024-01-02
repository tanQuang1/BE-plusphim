import mongoose from "mongoose";
import CountriesModel from "../schemas/countries.schema";
import { ICategoriesModel } from "../types/categories.type";

export const CountriesFunction = {
  checkSlugDuplicated: async (slug: string) => {
    const countries = await CountriesModel.exists({
      slug,
    });
    if (countries) {
      console.log(countries);
      return true;
    }
    return false;
  },
  getArrayIdCountries: async (categories: ICategoriesModel[]) => {
    const array_id: mongoose.Types.ObjectId[] = [];
    for (const item of categories) {
      const dataCountries = await CountriesModel.findOne({ slug: item.slug });
      array_id.push(dataCountries._id);
    }
    return array_id;
  },
};
