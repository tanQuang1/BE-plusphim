export interface IMovieError {
  slug: string;
  isError: boolean;
}

export interface IMovieErrorModel extends IMovieError, Document {}
