import sharp from "sharp";
import { resolve } from "node:path";

/**
 * Generate PWA icons from the brand SVGs. Reproducible SSOT: the SVGs in
 * src/assets are the source; regenerate with `bun run gen:icons`.
 *
 * Android install criteria require a 192px and a 512px icon; the maskable
 * variant lets Android apply its own icon-shape mask without clipping content.
 */
const root = resolve(import.meta.dirname, "..");
const logo = resolve(root, "src/assets/xclues-logo.svg");
const maskable = resolve(root, "src/assets/xclues-icon-maskable.svg");
const outDir = resolve(root, "public/assets");

const jobs: Array<[src: string, size: number, out: string]> = [
  [logo, 192, "icon-192.png"],
  [logo, 512, "icon-512.png"],
  [maskable, 512, "icon-maskable-512.png"],
];

for (const [src, size, out] of jobs) {
  await sharp(src, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(resolve(outDir, out));
  console.log(`wrote public/assets/${out} (${size}x${size})`);
}
