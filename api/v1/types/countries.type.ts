import mongoose, { Document } from "mongoose";

export interface ICountries {
  name: string;
  slug: string;
}

export interface ICountriesModel extends ICountries, Document {}
