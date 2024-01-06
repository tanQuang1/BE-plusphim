import https from "https";
import slugify from "slugify";
import { ICountriesModel } from "../types/countries.type";
import { ICategoriesModel } from "../types/categories.type";

const breadCrumbData = [
  {
    type: "single",
    breadCrumb: {
      name: "Phim Lẻ",
      slug: "/danh-sach/phim-le",
    },
  },
  {
    type: "series",
    breadCrumb: {
      name: "Phim Bộ",
      slug: "/danh-sach/phim-bo",
    },
  },

  {
    type: "hoathinh",
    breadCrumb: {
      name: "Hoạt Hình",
      slug: "/danh-sach/hoat-hinh",
    },
  },
  {
    type: "tvshows",
    breadCrumb: {
      name: "Tv Shows",
      slug: "/danh-sach/tv-shows",
    },
  },
  {
    type: "Vietsub",
    breadCrumb: {
      name: "Phim Vietsub",
      slug: "/danh-sach/phim-vietsub",
    },
  },
  {
    type: "Lồng Tiếng",
    breadCrumb: {
      name: "Phim Lồng Tiếng",
      slug: "/danh-sach/phim-long-tieng",
    },
  },
  {
    type: "Thuyết Minh",
    breadCrumb: {
      name: "Phim Thuyết Minh",
      slug: "/danh-sach/phim-thuyet-minh",
    },
  },
  {
    type: "Vietsub + Thuyết minh",
    breadCrumb: {
      name: "Phim Thuyết Minh",
      slug: "/danh-sach/phim-thuyet-minh",
    },
  },
  {
    type: "series ongoing",
    breadCrumb: {
      name: "Phim Bộ Đang Chiếu",
      slug: "/danh-sach/phim-bo-dang-chieu",
    },
  },

  {
    type: "series completed",
    breadCrumb: {
      name: "Phim Bộ Hoàn Thành Trọn Bộ",
      slug: "/danh-sach/phim-bo-hoan-thanh",
    },
  },

  {
    type: "trailer",
    breadCrumb: {
      name: "Phim Sắp Chiếu",
      slug: "/danh-sach/phim-sap-chieu",
    },
  },
];
export interface IOptions {
  hostname: string;
  port: string | number;
  path: string;
  method: string;
}
export function makeSlug(text: string) {
  const slug = slugify(text, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
  return slug;
}

export function generateOptions(url: URL): IOptions {
  return {
    hostname: url.hostname,
    port: url.port || 443,
    path: url.pathname + url.search,
    method: "GET",
  };
}

export async function crawlingData(options: IOptions) {
  const data: string = await new Promise((resolve, rejects) => {
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve(data);
      });
    });
    req.on("error", (error) => {
      rejects(error);
    });

    req.end();
  });
  const jsonData = JSON.parse(data);

  return jsonData;
}

export const getS3ObjectUrl = (Bucket: string, Key: string) => {
  const s3ObjectUrl = `https://${Bucket}.s3.amazonaws.com/${Key}`;
  return s3ObjectUrl;
};

export const getBreadCrumbList = (
  type: string | null = null,
  status: string | null = null,
  lang: string | null = null,
  seriesStatus: string | null = null
) => {
  const valueBreadCrumb = [type, status, lang, seriesStatus];
  const breadCrumb: {
    name: string;
    slug: string;
  }[] = [];
  for (const value of valueBreadCrumb) {
    breadCrumbData.map((item) => {
      if (value === item.type) {
        breadCrumb.push(item.breadCrumb);
      }
    });
  }
  return breadCrumb;
};

export const getBreadCrumbCategoriesAndCountries = (
  countries: ICountriesModel[],
  categories: ICategoriesModel[]
) => {
  const breadCrumb: {
    name: string;
    slug: string;
  }[] = [];

  for (const item of countries) {
    breadCrumb.push({ name: item.name, slug: `/quoc-gia/${item.slug}` });
  }
  for (const item of categories) {
    breadCrumb.push({ name: item.name, slug: `/quoc-gia/${item.slug}` });
  }

  return breadCrumb;
};
