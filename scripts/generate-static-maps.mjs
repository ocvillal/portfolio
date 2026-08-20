// One-off dev script: pre-renders every map location used on the site into a static
// WebP image (light + dark theme), so the site never has to hit tiles.openfreemap.org
// at runtime. Re-run this whenever a new location is added to src/data/pics.ts or
// src/data/site.ts.
//
// Usage: node scripts/generate-static-maps.mjs

import http from "node:http";
import { readFileSync, mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/maps");
const MAPLIBRE_DIST = path.join(ROOT, "node_modules/maplibre-gl/dist");

const MAP_STYLES = {
  dark: "https://tiles.openfreemap.org/styles/dark",
  light: "https://tiles.openfreemap.org/styles/positron",
};

const ZOOM = 11;
const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 500;

function slugFor(lat, lng) {
  return `${lat}_${lng}`;
}

function collectLocations() {
  const siteSrc = readFileSync(path.join(ROOT, "src/data/site.ts"), "utf8");
  const picsSrc = readFileSync(path.join(ROOT, "src/data/pics.ts"), "utf8");

  const locations = new Map();

  const siteMatch = siteSrc.match(/coordinates:\s*\{\s*lat:\s*([\-0-9.]+),\s*lng:\s*([\-0-9.]+)\s*\}/);
  if (siteMatch) {
    const [, lat, lng] = siteMatch;
    locations.set(slugFor(lat, lng), { lat: Number(lat), lng: Number(lng) });
  }

  const re = /location:\s*\{\s*label:\s*"[^"]*",\s*lat:\s*([\-0-9.]+),\s*lng:\s*([\-0-9.]+)\s*\}/g;
  let m;
  while ((m = re.exec(picsSrc))) {
    const [, lat, lng] = m;
    locations.set(slugFor(lat, lng), { lat: Number(lat), lng: Number(lng) });
  }

  return [...locations.values()];
}

function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");

    if (url.pathname === "/map.html") {
      res.setHeader("Content-Type", "text/html");
      res.end(renderHtml());
      return;
    }
    if (url.pathname.startsWith("/maplibre-dist/")) {
      const file = path.join(MAPLIBRE_DIST, url.pathname.replace("/maplibre-dist/", ""));
      try {
        const data = readFileSync(file);
        const ext = path.extname(file);
        const type = ext === ".css" ? "text/css" : ext === ".mjs" ? "text/javascript" : "application/octet-stream";
        res.setHeader("Content-Type", type);
        res.end(data);
      } catch {
        res.statusCode = 404;
        res.end();
      }
      return;
    }
    res.statusCode = 404;
    res.end();
  });

  return new Promise((resolve) => {
    server.listen(0, () => resolve(server));
  });
}

function renderHtml() {
  return `<!doctype html>
<html><head>
<meta charset="utf-8" />
<link rel="stylesheet" href="/maplibre-dist/maplibre-gl.css" />
<style>
  html, body, #map { margin: 0; padding: 0; width: ${IMAGE_WIDTH}px; height: ${IMAGE_HEIGHT}px; }
</style>
</head>
<body>
<div id="map"></div>
<script type="module">
  import { Map as MapLibreMap, setWorkerUrl } from "/maplibre-dist/maplibre-gl.mjs";
  setWorkerUrl("/maplibre-dist/maplibre-gl-worker.mjs");

  const params = new URLSearchParams(location.search);
  const lat = parseFloat(params.get("lat"));
  const lng = parseFloat(params.get("lng"));
  const zoom = parseFloat(params.get("zoom"));
  const style = params.get("style");

  const map = new MapLibreMap({
    container: "map",
    style,
    center: [lng, lat],
    zoom,
    interactive: false,
    attributionControl: false,
  });

  map.on("idle", () => {
    window.__mapReady = true;
  });
</script>
</body></html>`;
}

async function main() {
  const locations = collectLocations();
  console.log(`Found ${locations.length} unique location(s).`);

  mkdirSync(OUT_DIR, { recursive: true });

  const server = await startServer();
  const port = server.address().port;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: IMAGE_WIDTH, height: IMAGE_HEIGHT } });

  for (const { lat, lng } of locations) {
    const slug = slugFor(lat, lng);
    for (const [theme, style] of Object.entries(MAP_STYLES)) {
      const url = `http://localhost:${port}/map.html?lat=${lat}&lng=${lng}&zoom=${ZOOM}&style=${encodeURIComponent(style)}`;
      await page.goto(url);
      await page.waitForFunction("window.__mapReady === true", { timeout: 15000 });
      await page.waitForTimeout(300);

      const buffer = await page.screenshot();
      const tmpPngPath = path.join(OUT_DIR, `${slug}-${theme}.tmp.png`);
      const outPath = path.join(OUT_DIR, `${slug}-${theme}.webp`);
      writeFileSync(tmpPngPath, buffer);
      execFileSync("cwebp", ["-q", "82", tmpPngPath, "-o", outPath], { stdio: "ignore" });
      unlinkSync(tmpPngPath);
      console.log(`  wrote ${path.relative(ROOT, outPath)}`);
    }
  }

  await browser.close();
  server.close();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
