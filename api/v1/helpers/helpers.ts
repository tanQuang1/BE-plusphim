import https from "https";
import slugify from "slugify";
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
