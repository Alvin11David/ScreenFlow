import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicImages = path.resolve(__dirname, "..", "public", "images");

const jobs = [
  { src: "blog-1.png", dst: "blog-1.webp", width: 800, quality: 80 },
  { src: "blog-2.png", dst: "blog-2.webp", width: 800, quality: 80 },
  { src: "blog-3.png", dst: "blog-3.webp", width: 800, quality: 80 },
];

for (const job of jobs) {
  const src = path.join(publicImages, job.src);
  const dst = path.join(publicImages, job.dst);
  if (!fs.existsSync(src)) {
    console.log(`Skipping ${job.src} (not found)`);
    continue;
  }
  await sharp(src)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality })
    .toFile(dst);
  console.log(`Optimized ${job.src} -> ${job.dst}`);
  fs.unlinkSync(src);
  console.log(`Deleted ${job.src}`);
}
