// rename-images-by-alt.js (CommonJS) — группировка по имени файла компонента
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SRC_DIR = path.join(process.cwd(), "generated");
const IMG_ROOT = path.join(process.cwd(), "public", "images-temp");

if (!fs.existsSync(SRC_DIR)) throw new Error("Нет папки generated/");
if (!fs.existsSync(IMG_ROOT)) fs.mkdirSync(IMG_ROOT, { recursive: true });

const files = fs.readdirSync(SRC_DIR).filter(f => /\.(tsx|jsx)$/.test(f));

const slugify = s =>
  String(s).trim().toLowerCase()
    .replace(/['"’«»„”“]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "") || "img";

const sha8 = buf => crypto.createHash("sha1").update(buf).digest("hex").slice(0, 8);

// простенький разбор атрибутов в теге <img ...>
const parseImgAttrs = tag => {
  const attrs = {};
  const re = /(\w+)\s*=\s*"([^"]*)"|(\w+)\s*=\s*'([^']*)'/g;
  let m; while ((m = re.exec(tag))) { const k = m[1] || m[3]; const v = m[2] || m[4] || ""; attrs[k] = v; }
  return attrs;
};

let touched = 0, renamed = 0;

for (const fname of files) {
  const compName = path.basename(fname, path.extname(fname));               // Имя компонента = имя файла
  const IMG_DIR = path.join(IMG_ROOT, compName);                             // Папка компонента
  if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

  const fp = path.join(SRC_DIR, fname);
  let src = fs.readFileSync(fp, "utf-8");
  const imgTagRe = /<img\b[^>]*>/gi;
  const matches = src.match(imgTagRe) || [];
  let changed = false;

  for (const tag of matches) {
    const { src: imgSrc, alt } = parseImgAttrs(tag);
    if (!imgSrc || !imgSrc.startsWith("/images-temp/")) continue;

    const absOld = path.join(IMG_ROOT, path.basename(imgSrc));               // старый путь (корень images-temp/)
    if (!fs.existsSync(absOld)) continue;

    const buf = fs.readFileSync(absOld);
    const hash = sha8(buf);
    const ext = path.extname(absOld) || ".bin";
    const base = slugify(alt || path.basename(imgSrc, ext)) || "img";
    let newName = `${base}${ext}`;
    let absNew = path.join(IMG_DIR, newName);

    // если в папке компонента уже есть такой файл, но контент другой — добавим хэш
    if (fs.existsSync(absNew) && !fs.readFileSync(absNew).equals(buf)) {
      newName = `${base}-${hash}${ext}`;
      absNew = path.join(IMG_DIR, newName);
    }

    // перенос файла в подпапку компонента (и удаление старого при успехе)
    fs.renameSync(absOld, absNew);

    // обновляем путь в коде
    const newSrc = `/images-temp/${compName}/${newName}`;
    const updatedTag = tag.replace(imgSrc, newSrc);
    src = src.replace(tag, updatedTag);
    changed = true; renamed++;
    console.log(`📦 ${compName}: ${path.basename(imgSrc)} → ${compName}/${newName}`);
  }

  if (changed) { fs.writeFileSync(fp, src, "utf-8"); touched++; }
}

// подчистим «осиротевшие» файлы в корне images-temp (если остались)
for (const f of fs.readdirSync(IMG_ROOT)) {
  const p = path.join(IMG_ROOT, f);
  if (fs.statSync(p).isFile()) fs.unlinkSync(p);
}

console.log(`\n✅ Обновлено компонентов: ${touched}`);
console.log(`🖼️  Переименовано изображений: ${renamed}`);
console.log(`📂 База: public/images-temp/<Component>/...`);
