import mongoose, { Schema } from "mongoose";
import { IMovieModel } from "../types/movie.type";

const MovieSchema: Schema = new Schema<IMovieModel>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    origin_name: { type: String, required: true, trim: true },
    seo_name: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
    thumb_url: { type: String, trim: true },
    poster_url: { type: String, trim: true },
    is_copyright: { type: Boolean, required: true },
    sub_docquyen: { type: Boolean, required: true },
    chieurap: { type: Boolean, required: true },
    trailer_url: { type: String, trim: true },
    time: { type: String, trim: true },
    episode_current: { type: String, trim: true },
    episode_total: { type: String, trim: true },
    quality: { type: String, trim: true },
    lang: { type: String, trim: true },
    notify: { type: String, trim: true },
    showtimes: { type: String, trim: true },
    year: { type: Number, required: true, trim: true },
    view: { type: Number, trim: true },
    actor: { type: [String] },
    director: { type: [String] },
    categories_id: [{ type: mongoose.Types.ObjectId, ref: "Categories" }],
    countries_id: [{ type: mongoose.Types.ObjectId, ref: "Countries" }],
    episodes: [
      {
        server_name: { type: String, trim: true },
        server_data: [
          {
            name: { type: String, trim: true },
            slug: { type: String, trim: true },
            filename: { type: String, trim: true },
            link_embed: { type: String, trim: true },
            link_m3u8: { type: String, trim: true },
          },
        ],
      },
    ],
    dateCreated: { type: Date },
    dateModified: { type: Date },
  },
  {
    versionKey: false,
  }
);

const MovieModel = mongoose.model<IMovieModel>("Movie", MovieSchema);

export default MovieModel;
