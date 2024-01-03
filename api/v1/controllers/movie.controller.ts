import HttpErrors from "http-errors";
import { NextFunction, Request, Response } from "express";
import { BASE_URL_IMAGE } from "../helpers/constant";
import { getS3ObjectUrl } from "../helpers/helpers";
import { S3Client } from "@aws-sdk/client-s3";
import MovieModel from "../schemas/movie.schema";
import MovieFunctions from "../functions/movie.funtion";

import putObjectCommentInput from "../helpers/putObjectCommandInput";
import resizeImage from "../helpers/resizeImage";
import MovieErrorModel from "../schemas/moviesError.schema";
import {
  getManyMovie,
  getSingleMove,
  saveSingleMovie,
} from "../services/movieApi";

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
    console.log(slug);
    try {
      const isExitsMove = await MovieFunctions.checkMovieExits(slug);
      if (isExitsMove) {
        return res
          .status(400)
          .json({ success: false, message: "Movie is exits" });
      }

      const movie = await getSingleMove(slug);
      if (!movie) {
        await MovieErrorModel.findOneAndUpdate(
          { slug },
          { slug },
          { upsert: true }
        );
        return res
          .status(400)
          .json({ success: false, message: "Can't find movie" });
      }
      const objectMovie = await MovieFunctions.createObjectMovie(movie.data);

      // const resizeImageThumb = await resizeImage(
      //   BASE_URL_IMAGE + objectMovie.thumb_url,
      //   640,
      //   960
      // );

      // const resizeImagePoster = await resizeImage(
      //   BASE_URL_IMAGE + objectMovie.poster_url,
      //   1920,
      //   1080
      // );
      // if (!resizeImageThumb.success || !resizeImagePoster.success) {
      //   await MovieErrorModel.findOneAndUpdate(
      //     { slug },
      //     { slug },
      //     { upsert: true }
      //   );
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Save image error" });
      // }
      // const commandThumb = putObjectCommentInput(
      //   objectMovie.poster_url,
      //   resizeImageThumb.data
      // );
      // const commandPoster = putObjectCommentInput(
      //   objectMovie.thumb_url,
      //   resizeImagePoster.data
      // );
      // const responseS3Thumb = await s3.send(commandThumb);
      // const responseS3Poster = await s3.send(commandPoster);

      // if (
      //   responseS3Thumb.$metadata.httpStatusCode !== 200 ||
      //   responseS3Poster.$metadata.httpStatusCode !== 200
      // ) {
      //   await MovieErrorModel.findOneAndUpdate(
      //     { slug },
      //     { slug },
      //     { upsert: true }
      //   );
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

      await MovieModel.create({
        ...objectMovie,
        // thumb_url: url_thumb_aws,
        // poster_url: url_poster_aws,
      });
      res
        .status(201)
        .json({ success: true, message: "Crawling data movie successfully" });
    } catch (error) {
      return next(new HttpErrors.BadRequest(error.message));
    }
  },
  drawlingManyMovie: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { currentPage } = req.params;
    if (isNaN(Number(currentPage))) {
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
      if (Number(currentPage) > totalPage) {
        return res.status(400).json({
          success: false,
          message: "Current Page is greater than the total number of pages",
        });
      }

      const list_movie = await getManyMovie(currentPage);
      const { items } = list_movie.data;
      for (const item of items) {
        await saveSingleMovie(item.slug);
      }

      res.status(200).json({
        success: true,
        data: "Success",
      });
    } catch (error) {
      return next(new HttpErrors.BadRequest(error.message));
    }
  },
};

export default MovieControllers;
