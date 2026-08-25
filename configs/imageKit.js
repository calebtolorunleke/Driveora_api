import ImageKit from "@imagekit/nodejs";

export const imagekit = new ImageKit({
  publickey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEnpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
