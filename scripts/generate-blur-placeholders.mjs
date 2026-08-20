import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const picsPath = path.join(repoRoot, "src/data/pics.ts");
const source = readFileSync(picsPath, "utf8");

const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const results = new Map();
for (const slug of slugs) {
  const gridPath = path.join(repoRoot, "public/images/pics/grid", `${slug}.webp`);
  const jpeg = execFileSync("magick", [
    gridPath,
    "-resize",
    "16x16",
    "-blur",
    "0x2",
    "-strip",
    "-quality",
    "40",
    "jpeg:-",
  ]);
  const dataUrl = `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  results.set(slug, dataUrl);
  console.log(`${slug}: ${dataUrl.length} bytes`);
}

let updated = source;
for (const [slug, dataUrl] of results) {
  const re = new RegExp(`(slug:\\s*"${slug}",[\\s\\S]*?date:\\s*"[^"]+",)`);
  if (!re.test(updated)) {
    throw new Error(`Could not find insertion point for slug ${slug}`);
  }
  updated = updated.replace(re, `$1\n    blurDataURL: "${dataUrl}",`);
}

writeFileSync(picsPath, updated);
console.log(`Updated ${results.size} entries in ${picsPath}`);
