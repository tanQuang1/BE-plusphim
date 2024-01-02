import mongoose, { Schema } from "mongoose";
import { IMovieErrorModel } from "../types/movie_error.type";

const MovieErrorSchema: Schema = new Schema<IMovieErrorModel>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isError: { type: Boolean, default: true, required: true },
  },
  {
    versionKey: false,
  }
);

const MovieErrorModel = mongoose.model<IMovieErrorModel>(
  "Movies_Error",
  MovieErrorSchema
);

export default MovieErrorModel;
