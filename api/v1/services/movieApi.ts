import api from "./axiosConfig";
import { BASE_URL_CRAWLING_DATA } from "../helpers/constant";

export async function getSingleMove(slug: string) {
  return await api.get(BASE_URL_CRAWLING_DATA + `phim/${slug}`);
}

export async function getManyMovie(page: number = 1) {
  return await api.get(
    BASE_URL_CRAWLING_DATA + `danh-sach/phim-moi?page=${page}`
  );
}

export async function saveSingleMovie(slug: string) {
  return await api.get(
    `http://localhost:5000/api/v1/admin/crawlingData/singleMovie/${slug}`
  );
}
