import mongoose, { Schema } from "mongoose";
import { ICountriesModel } from "../types/countries.type";

const CountriesSchema: Schema = new Schema<ICountriesModel>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
  },
  {
    versionKey: false,
  }
);

const CountriesModel = mongoose.model<ICountriesModel>(
  "Countries",
  CountriesSchema
);

export default CountriesModel;
