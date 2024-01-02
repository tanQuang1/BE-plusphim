import mongoose, { Document } from "mongoose";

export interface ICategories {
  name: string;
  slug: string;
}

export interface ICategoriesModel extends ICategories, Document {}
