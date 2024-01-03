import { BASE_URL_CRAWLING_DATA } from "../helpers/constant";
import api from "./axiosConfig";

export async function crawlingCategories() {
  return await api.get(BASE_URL_CRAWLING_DATA + "/the-loai");
}
