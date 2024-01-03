import { S3Client } from "@aws-sdk/client-s3";
import { BASE_URL_CRAWLING_DATA, BASE_URL_IMAGE } from "../helpers/constant";
import {
  crawlingData,
  generateOptions,
  getS3ObjectUrl,
} from "../helpers/helpers";
import putObjectCommentInput from "../helpers/putObjectCommandInput";
// import resizeImage from "../helpers/resizeImage";
import MovieModel from "../schemas/movie.schema";
import CategoriesFunction from "./categories.functions";
import CountriesFunction from "./countries.funtion";
import { IMovieModel } from "../types/movie.type";
import resizeImage from "../helpers/resizeImage";

const MovieFunctions = {
  checkMovieExits: async (slug: string): Promise<boolean> => {
    const isExitsMovie = await MovieModel.exists({ slug });
    if (isExitsMovie) {
      return true;
    }
    return false;
  },
  checkSlugDuplicated: async (slug: string): Promise<boolean> => {
    const movie = await MovieModel.exists({ slug });

    if (movie) {
      return true;
    }

    return false;
  },
  createObjectMovie: async (data: any) => {
    let {
      item: {
        slug,
        name,
        origin_name,
        type,
        status,
        is_copyright,
        sub_docquyen,
        chieurap,
        trailer_url,
        time,
        episode_current,
        episode_total,
        quality,
        lang,
        notify,
        showtimes,
        year,
        view,
        actor,
        director,
        category,
        country,
        episodes,
        thumb_url,
        poster_url,
      },
      seoOnPage: {
        titleHead: seo_name,
        seoSchema: { dateModified, dateCreated },
        descriptionHead: content,
        og_image,
      },
    } = data;

    if (!thumb_url) {
      thumb_url = og_image[0].slice(og_image[0].lastIndexOf("/") + 1);
    }

    if (!poster_url) {
      poster_url = og_image[1].slice(og_image[1].lastIndexOf("/") + 1);
    }

    const categories_id = await CategoriesFunction.getArrayIdCategories(
      category
    );
    const countries_id = await CountriesFunction.getArrayIdCountries(country);

    return {
      slug,
      name,
      origin_name,
      seo_name,
      content,
      type,
      status,
      thumb_url,
      poster_url,
      is_copyright,
      sub_docquyen,
      chieurap,
      trailer_url,
      time,
      episode_current,
      episode_total,
      quality,
      lang,
      notify,
      showtimes,
      year,
      view,
      actor,
      director,
      categories_id,
      countries_id,
      episodes,
      dateModified,
      dateCreated,
    };
  },
};

export default MovieFunctions;
