import { PutObjectCommand } from "@aws-sdk/client-s3";
import { BUCKET_NAME } from "./constant";

const putObjectCommentInput = (
  url: string,
  imageBuffer: Buffer
): PutObjectCommand => {
  const commandPoster = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: "img/" + url,
    Body: Buffer.from(imageBuffer),
  });
  return commandPoster;
};

export default putObjectCommentInput;
