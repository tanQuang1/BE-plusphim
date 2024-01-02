import mongoose, { Document } from "mongoose";

export interface IServerData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}
export interface IEpisodes {
  server_name: string;
  server_data: IServerData[];
}
export interface IMovie {
  name: string;
  slug: string;
  origin_name: string;
  seo_name: string;
  content: string;
  type: string;
  status: string;
  thumb_url: string;
  poster_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  categories_id: mongoose.Types.ObjectId[];
  countries_id: mongoose.Types.ObjectId[];
  episodes: IEpisodes[];
  dateModified: Date;
  dateCreated: Date;
}

export interface IMovieModel extends IMovie, Document {}
