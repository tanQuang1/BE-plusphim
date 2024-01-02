import HttpErrors from "http-errors";
import { NextFunction, Request, Response } from "express";
import {
  BASE_URL_CRAWLING_DATA,
  BASE_URL_IMAGE,
  DEFAULT_TYPE_IMAGE,
} from "../helpers/constant";
import {
  crawlingData,
  generateOptions,
  getS3ObjectUrl,
} from "../helpers/helpers";
import { S3Client } from "@aws-sdk/client-s3";
import MovieModel from "../schemas/movie.schema";
import MovieFunctions from "../functions/movie.funtion";
import {
  getManyMovie,
  getSingleMove,
  saveSingleMovie,
} from "../services/movieApi";
import CategoriesFunction from "../functions/categories.functions";
import { CountriesFunction } from "../functions/countries.funtion";
import putObjectCommentInput from "../helpers/putObjectCommandInput";
import resizeImage from "../helpers/resizeImage";
import MovieErrorModel from "../schemas/moviesError.schema";
import loadImageFromUrl from "../helpers/loadImageFromUrl";

const MovieControllers = {
  drawingSingleMovie: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_AWS,
        secretAccessKey: process.env.SECRET_KEY_AWS,
      },
      region: process.env.REGION_AWS,
    });
    const { slug } = req.params;

    const isExitsMove = await MovieFunctions.checkMovieExits(slug);
    if (isExitsMove) {
      return res
        .status(400)
        .json({ success: false, message: "Movie is exits" });
    }
    const movie = await getSingleMove(slug);
    if (!movie) {
      await MovieErrorModel.create({ slug });
      return res.status(400).json({ success: false, message: movie });
    }
    const {
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
    } = movie.data.item;
    let { thumb_url, poster_url } = movie.data.item;
    if (!thumb_url) {
    }
    const {
      titleHead: seo_name,
      seoSchema: { dateModified, dateCreated },
      descriptionHead: content,
      og_image,
    } = movie.data.seoOnPage;

    if (!thumb_url) {
      thumb_url = og_image[0].slice(og_image[0].lastIndexOf("/") + 1);
    }

    if (!poster_url) {
      poster_url = og_image[1].slice(og_image[1].lastIndexOf("/") + 1);
    }

    // console.log(BASE_URL_IMAGE + thumb_url);
    const resizeImageThumb = await resizeImage(
      "https://img.ophim9.cc/uploads/movies/hac-kim-co-dien-thumb.jpg",
      200,
      300
    );
    // console.log(resizeImageThumb);

    //load image axios
    // const image = await loadImageFromUrl(
    //   "https://img.ophim9.cc/uploads/movies/hac-kim-co-dien-thumb.jpg"
    // );

    // const resizeImagePoster = await resizeImage(
    //   BASE_URL_IMAGE + poster_url,
    //   200,
    //   300,
    //   DEFAULT_TYPE_IMAGE
    // );
    // if (!resizeImageThumb || !resizeImagePoster) {
    //   await MovieErrorModel.create({ slug });
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Save image error" });
    // }
    // const categories_id = await CategoriesFunction.getArrayIdCategories(
    //   category
    // );
    // const countries_id = await CountriesFunction.getArrayIdCountries(country);

    // const commandThumb = putObjectCommentInput(
    //   poster_url,
    //   resizeImageThumb as string
    // );
    // const commandPoster = putObjectCommentInput(
    //   thumb_url,
    //   resizeImagePoster as string
    // );
    // const responseS3Thumb = await s3.send(commandThumb);
    // const responseS3Poster = await s3.send(commandPoster);

    // if (
    //   responseS3Thumb.$metadata.httpStatusCode !== 200 ||
    //   responseS3Poster.$metadata.httpStatusCode !== 200
    // ) {
    //   await MovieErrorModel.create({ slug });
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Save image error" });
    // }
    // const url_thumb_aws = getS3ObjectUrl(
    //   commandThumb.input.Bucket,
    //   commandThumb.input.Key
    // );
    // const url_poster_aws = getS3ObjectUrl(
    //   commandPoster.input.Bucket,
    //   commandThumb.input.Key
    // );
    // await MovieModel.create({
    //   name,
    //   slug,
    //   origin_name,
    //   content,
    //   seo_name,
    //   type,
    //   status,
    //   thumb_url: url_thumb_aws,
    //   poster_url: url_poster_aws,
    //   is_copyright,
    //   sub_docquyen,
    //   chieurap,
    //   trailer_url,
    //   time,
    //   episode_current,
    //   episode_total,
    //   quality,
    //   lang,
    //   notify,
    //   showtimes,
    //   year,
    //   view,
    //   actor,
    //   director,
    //   categories_id,
    //   countries_id,
    //   dateModified,
    //   dateCreated,
    //   episodes,
    // });

    res
      .status(201)
      .json({ success: true, message: " Create movie successfully !" });
    try {
    } catch (error) {
      await MovieErrorModel.create({ slug });
      return next(new HttpErrors.BadRequest(error.message));
    }
  },
  drawlingManyMovie: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { numberPage } = req.params;
    if (isNaN(Number(numberPage))) {
      return res.status(400).json({
        success: false,
        message: "Number Page crawling must is number",
      });
    }
    try {
      const data = await getManyMovie();
      const {
        params: {
          pagination: { totalItems, totalItemsPerPage, currentPage },
        },
      } = data.data;
      const totalPage = Math.ceil(totalItems / totalItemsPerPage);
      for (
        let page = totalPage;
        page >= totalPage - Number(numberPage);
        page--
      ) {
        const list_movie = await getManyMovie(page);
        const { items } = list_movie.data;
        for (const item of items) {
          await saveSingleMovie(item.slug);
        }
      }
      res.status(200).json({
        success: true,
        data: "Success",
      });
    } catch (error) {
      return next(new HttpErrors.BadRequest(error.message));
    }
  },
  // drawlingData: async (req: Request, res: Response, next: NextFunction) => {
  //   const url = new URL(BASE_URL_CRAWLING_DATA + "/v1/api/danh-sach/phim-moi");
  //   // fromIni
  //   const s3 = new S3Client({
  //     credentials: {
  //       accessKeyId: process.env.ACCESS_KEY_AWS,
  //       secretAccessKey: process.env.SECRET_KEY_AWS,
  //     },
  //     region: process.env.REGION_AWS,
  //   });
  //   try {
  //     const options = generateOptions(url);
  //     const dataCrawling = await crawlingData(options);
  //     const { items } = dataCrawling.data;
  //     const {
  //       params: {
  //         pagination: { totalItems, totalItemsPerPage, currentPage },
  //       },
  //     } = dataCrawling.data;
  //     let list_promise_first_page: Promise<any>[] = [];
  //     let list_data_movie_first_page: any[] = [];
  //     for (const item of items) {
  //       const value = await MovieFunctions.getPromiseCrawlingMovie(
  //         item.slug,
  //         s3
  //       );
  //       list_promise_first_page = [
  //         ...list_promise_first_page,
  //         ...value.list_promise_per_page,
  //       ];
  //       list_data_movie_first_page.push(value.list_data_movie_per_page);
  //     }
  //     list_promise_first_page.push(
  //       MovieModel.insertMany(list_data_movie_first_page)
  //     );
  //     await Promise.all(list_promise_first_page);
  //     for (let page = 2; page <= 2; page++) {
  //       const url = new URL(
  //         BASE_URL_CRAWLING_DATA + `/v1/api/danh-sach/phim-moi?page=${page}`
  //       );
  //       const options = generateOptions(url);
  //       const dataCrawling = await crawlingData(options);
  //       const { items: items_page } = dataCrawling.data;
  //       const list_promise_per_page: Promise<any>[] = [];
  //       const list_data_movie_per_page: any[] = [];
  //       for (const item of items_page) {
  //         const value_return = await MovieFunctions.getPromiseCrawlingMovie(
  //           item.slug,
  //           s3
  //         );
  //       }
  //       list_promise_per_page = [
  //         ...list_promise_per_page,
  //         ...value_return.list_promise_per_page,
  //       ];
  //       if (page === 2) {
  //         await Promise.all(list_promise_per_page);
  //       } else {
  //         Promise.all(list_promise_per_page);
  //       }
  //     }
  //     res.status(200).json({
  //       success: true,
  //       message:
  //         "crawling movie successfully !" +
  //         Math.ceil(totalItems / totalItemsPerPage),
  //     });
  //   } catch (error) {
  //     next(new HttpErrors.BadRequest(error.message));
  //   }
  // },
};

export default MovieControllers;

// const url_movie = new URL(
//   BASE_URL_CRAWLING_DATA + "/v1/api/phim/" + item.slug
// );
// const options_movie = generateOptions(url_movie);
// const dataCrawlingMovie = await crawlingData(options_movie);
// const {
//   name,
//   slug,
//   origin_name,
//   type,
//   status,
//   thumb_url,
//   poster_url,
//   is_copyright,
//   sub_docquyen,
//   chieurap,
//   trailer_url,
//   time,
//   episode_current,
//   episode_total,
//   quality,
//   lang,
//   notify,
//   showtimes,
//   year,
//   view,
//   actor,
//   director,
//   category,
//   country,
//   episodes,
// } = dataCrawlingMovie.data.item;
// const {
//   titleHead: seo_name,
//   seoSchema: { dateModified, dateCreated },
//   descriptionHead: content,
// } = dataCrawlingMovie.data.seoOnPage;
// const isDuplicatedSlugMovie = await MovieFunctions.checkSlugDuplicated(
//   slug
// );

// if (isDuplicatedSlugMovie) {
//   break;
// }
// const resizeImageThumb = await resizeImage(
//   BASE_URL_IMAGE + thumb_url,
//   200,
//   300,
//   DEFAULT_TYPE_IMAGE
// );
// const resizeImagePoster = await resizeImage(
//   BASE_URL_IMAGE + poster_url,
//   200,
//   300,
//   DEFAULT_TYPE_IMAGE
// );
// const categories_id = await CategoriesFunction.getArrayIdCategories(
//   category
// );
// const countries_id = await CountriesFunction.getArrayIdCountries(
//   country
// );

// const commandThumb = putObjectCommentInput(
//   poster_url,
//   resizeImageThumb as string
// );

// const commandPoster = putObjectCommentInput(
//   thumb_url,
//   resizeImagePoster as string
// );
// list_promise_first_page.push(s3.send(commandThumb));
// list_promise_first_page.push(s3.send(commandPoster));
// const url_thumb_aws = getS3ObjectUrl(
//   commandThumb.input.Bucket,
//   commandThumb.input.Key
// );
// const url_poster_aws = getS3ObjectUrl(
//   commandPoster.input.Bucket,
//   commandThumb.input.Key
// );

// list_data_movie_first_page.push({
//   name,
//   slug,
//   origin_name,
//   content,
//   seo_name,
//   type,
//   status,
//   thumb_url: url_thumb_aws,
//   poster_url: url_poster_aws,
//   is_copyright,
//   sub_docquyen,
//   chieurap,
//   trailer_url,
//   time,
//   episode_current,
//   episode_total,
//   quality,
//   lang,
//   notify,
//   showtimes,
//   year,
//   view,
//   actor,
//   director,
//   categories_id,
//   countries_id,
//   dateModified,
//   dateCreated,
//   episodes,
// });
//__________________________________________________________________________________

// const url_movie = new URL(
//   BASE_URL_CRAWLING_DATA + "/v1/api/phim/" + item.slug
// );
// const options_movie = generateOptions(url_movie);
// const dataCrawlingMovie = await crawlingData(options_movie);
// const {
//   name,
//   slug,
//   origin_name,
//   type,
//   status,
//   thumb_url,
//   poster_url,
//   is_copyright,
//   sub_docquyen,
//   chieurap,
//   trailer_url,
//   time,
//   episode_current,
//   episode_total,
//   quality,
//   lang,
//   notify,
//   showtimes,
//   year,
//   view,
//   actor,
//   director,
//   category,
//   country,
//   episodes,
// } = dataCrawlingMovie.data.item;
// const {
//   titleHead: seo_name,
//   seoSchema: { dateModified, dateCreated },
//   descriptionHead: content,
// } = dataCrawlingMovie.data.seoOnPage;
// const isDuplicatedSlugMovie =
//   await MovieFunctions.checkSlugDuplicated(slug);

// if (isDuplicatedSlugMovie) {
//   break;
// }
// const resizeImageThumb = await resizeImage(
//   BASE_URL_IMAGE + thumb_url,
//   200,
//   300,
//   DEFAULT_TYPE_IMAGE
// );
// const resizeImagePoster = await resizeImage(
//   BASE_URL_IMAGE + poster_url,
//   200,
//   300,
//   DEFAULT_TYPE_IMAGE
// );
// const categories_id = await CategoriesFunction.getArrayIdCategories(
//   category
// );
// const countries_id = await CountriesFunction.getArrayIdCountries(
//   country
// );

// const commandThumb = putObjectCommentInput(
//   poster_url,
//   resizeImageThumb as string
// );

// const commandPoster = putObjectCommentInput(
//   thumb_url,
//   resizeImagePoster as string
// );
// list_promise.push(s3.send(commandThumb));
// list_promise.push(s3.send(commandPoster));
// const url_thumb_aws = getS3ObjectUrl(
//   commandThumb.input.Bucket,
//   commandThumb.input.Key
// );
// const url_poster_aws = getS3ObjectUrl(
//   commandPoster.input.Bucket,
//   commandThumb.input.Key
// );
// list_data_movie_per_page.push({
//   name,
//   slug,
//   origin_name,
//   content,
//   seo_name,
//   type,
//   status,
//   thumb_url: url_thumb_aws,
//   poster_url: url_poster_aws,
//   is_copyright,
//   sub_docquyen,
//   chieurap,
//   trailer_url,
//   time,
//   episode_current,
//   episode_total,
//   quality,
//   lang,
//   notify,
//   showtimes,
//   year,
//   view,
//   actor,
//   director,
//   categories_id,
//   countries_id,
//   dateModified,
//   dateCreated,
//   episodes,
// });
