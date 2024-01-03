import jimp from "jimp";
import { DEFAULT_TYPE_IMAGE } from "./constant";
import sharp from "sharp";
// import axios from "axios";

function resizeImage(
  path: string,
  width: number,
  height: number,
  type = DEFAULT_TYPE_IMAGE
): Promise<{ success: Boolean; data: Buffer }> {
  return new Promise((resolve, reject) => {
    jimp
      .read("https://img.ophim9.cc/uploads/movies/hac-kim-co-dien-thumb.jpg")
      .then((image) => {
        return image
          .resize(width, height)
          .quality(80) // Set JPEG quality to 80
          .getBufferAsync(type);
      })
      .then((result) => {
        console.log(result);
        resolve({ success: true, data: result });
      })
      .catch((error) => {
        console.error("Error processing image:", error);
        reject({ success: false, data: error });
      });
  });
}

//use sharp
// async function resizeImage(path: string, width: number, height: number) {
//   // return new Promise((resolve, reject) => {
//   //   sharp(path)
//   //     .rotate()
//   //     .resize(width, height)
//   //     .jpeg({ mozjpeg: true })
//   //     .toBuffer()
//   //     .then((data) => {
//   //       resolve(data);
//   //     })
//   //     .catch((error) => {
//   //       reject(error);
//   //     });
//   // });

//use axios
//   const data = await axios.get(path, { responseType: "arraybuffer" });
//   console.log(data);
//   return data;
// }

export default resizeImage;
