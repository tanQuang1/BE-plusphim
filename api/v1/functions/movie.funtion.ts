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
import { CountriesFunction } from "./countries.funtion";
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
  // getPromiseCrawlingMovie: async (
  //   item_slug: string,

  //   s3: S3Client
  // ) => {
  //   const list_promise_per_page: Promise<any>[] = [];

  //   const url_movie = new URL(
  //     BASE_URL_CRAWLING_DATA + "/v1/api/phim/" + item_slug
  //   );
  //   const options_movie = generateOptions(url_movie);
  //   const dataCrawlingMovie = await crawlingData(options_movie);
  //   const {
  //     name,
  //     slug,
  //     origin_name,
  //     type,
  //     status,
  //     thumb_url,
  //     poster_url,
  //     is_copyright,
  //     sub_docquyen,
  //     chieurap,
  //     trailer_url,
  //     time,
  //     episode_current,
  //     episode_total,
  //     quality,
  //     lang,
  //     notify,
  //     showtimes,
  //     year,
  //     view,
  //     actor,
  //     director,
  //     category,
  //     country,
  //     episodes,
  //   } = dataCrawlingMovie.data.item;
  //   const {
  //     titleHead: seo_name,
  //     seoSchema: { dateModified, dateCreated },
  //     descriptionHead: content,
  //   } = dataCrawlingMovie.data.seoOnPage;

  //   const resizeImageThumb = await resizeImage(
  //     BASE_URL_IMAGE + thumb_url,
  //     200,
  //     300
  //   );
  //   const resizeImagePoster = await resizeImage(
  //     BASE_URL_IMAGE + poster_url,
  //     200,
  //     300
  //   );
  //   const categories_id = await CategoriesFunction.getArrayIdCategories(
  //     category
  //   );
  //   const countries_id = await CountriesFunction.getArrayIdCountries(country);

  //   const commandThumb = putObjectCommentInput(
  //     poster_url,
  //     resizeImageThumb as string
  //   );

  //   const commandPoster = putObjectCommentInput(
  //     thumb_url,
  //     resizeImagePoster as string
  //   );
  //   list_promise_per_page.push(s3.send(commandThumb));
  //   list_promise_per_page.push(s3.send(commandPoster));
  //   const url_thumb_aws = getS3ObjectUrl(
  //     commandThumb.input.Bucket,
  //     commandThumb.input.Key
  //   );
  //   const url_poster_aws = getS3ObjectUrl(
  //     commandPoster.input.Bucket,
  //     commandThumb.input.Key
  //   );
  //   const list_data_movie_per_page = {
  //     name,
  //     slug,
  //     origin_name,
  //     content,
  //     seo_name,
  //     type,
  //     status,
  //     thumb_url: url_thumb_aws,
  //     poster_url: url_poster_aws,
  //     is_copyright,
  //     sub_docquyen,
  //     chieurap,
  //     trailer_url,
  //     time,
  //     episode_current,
  //     episode_total,
  //     quality,
  //     lang,
  //     notify,
  //     showtimes,
  //     year,
  //     view,
  //     actor,
  //     director,
  //     categories_id,
  //     countries_id,
  //     dateModified,
  //     dateCreated,
  //     episodes,
  //   };

  //   return {
  //     list_promise_per_page,
  //     list_data_movie_per_page,
  //   };
  // },
};

export default MovieFunctions;
