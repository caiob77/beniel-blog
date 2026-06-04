// Recomprime as imagens de public/images para tamanhos sãos de web.
// - Reduz para no máximo 1600px de largura (sem ampliar)
// - Reexporta como WebP de qualidade 72
// - Converte JPG/PNG -> WebP e remove o original
// Uso: node scripts/optimize-images.mjs
import { glob, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images");
const MAX_WIDTH = 1600;
const QUALITY = 72;

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for await (const file of glob(`${ROOT}/**/*.{jpg,jpeg,png,webp}`)) {
  const ext = path.extname(file).toLowerCase();
  const before = (await stat(file)).size;
  const target = file.replace(/\.\w+$/, ".webp");
  const tmp = `${target}.tmp`;

  await sharp(file)
    .rotate() // respeita orientação EXIF antes de descartar metadados
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(tmp);

  // Substitui o destino .webp e remove o original se a extensão mudou.
  await rename(tmp, target);
  if (ext !== ".webp" && file !== target) await unlink(file);

  const after = (await stat(target)).size;
  totalBefore += before;
  totalAfter += after;
  count++;
  const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
  console.log(
    `${path.relative(process.cwd(), target)}  ${kb(before)} -> ${kb(after)}`,
  );
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)}MB`;
console.log(
  `\n${count} imagens · ${mb(totalBefore)} -> ${mb(totalAfter)} ` +
    `(-${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`,
);
