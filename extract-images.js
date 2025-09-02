// extract-images.js (CommonJS)
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const inDir = path.join(process.cwd(), "generated");
const outImgDir = path.join(process.cwd(), "public", "images-temp");

if (!fs.existsSync(inDir)) {
  console.error("❌ Не найдена папка generated/");
  process.exit(1);
}
if (!fs.existsSync(outImgDir)) fs.mkdirSync(outImgDir, { recursive: true });

const exts = {
  "image/svg+xml": "svg",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
};

const files = fs.readdirSync(inDir).filter(f => f.endsWith(".tsx") || f.endsWith(".jsx"));
let totalFound = 0, totalWritten = 0;

for (const file of files) {
  const p = path.join(inDir, file);
  let src = fs.readFileSync(p, "utf-8");

  // ищем все data:image/...;base64,....
  const regex = /src=["'](data:(image\/[a-zA-Z+.-]+);base64,([A-Za-z0-9+/=]+))["']/g;
  let m, replaced = 0;

  const seen = new Map(); // чтобы одинаковые картинки в файле не писать по несколько раз

  while ((m = regex.exec(src)) !== null) {
    totalFound++;
    const fullDataUri = m[1];
    const mime = m[2];
    const b64 = m[3];
    const ext = exts[mime] || "bin";
    const buf = Buffer.from(b64, "base64");
    const hash = crypto.createHash("sha1").update(buf).digest("hex").slice(0, 12);
    const fileName = `${hash}.${ext}`;
    const outPath = path.join(outImgDir, fileName);

    if (!seen.has(fullDataUri)) {
      if (!fs.existsSync(outPath)) {
        fs.writeFileSync(outPath, buf);
        totalWritten++;
      }
      seen.set(fullDataUri, `/images-temp/${fileName}`);
    }

    const url = seen.get(fullDataUri);
    src = src.replace(fullDataUri, url);
    replaced++;
  }

  if (replaced > 0) {
    fs.writeFileSync(p, src, "utf-8");
    console.log(`✅ ${file}: заменено ${replaced}, изображения → public/images-temp/`);
  }
}

console.log(`\n📦 Найдено data:image: ${totalFound}, записано файлов: ${totalWritten}`);
console.log(`🗂  Каталог: public/images-temp`);
